<template>
    <div class="card-group h-100">
        <div class="card col-sm-5 px-0 h-100">
            <div class="card-header">Меню</div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <label for="country">Страна</label>
                        <div class="input-group mb-3">
                            <select class="custom-select"
                                    id="country"
                                    v-model="selectedCountry">
                                <option v-for="country in countries" :value="country">{{ country.title }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <label for="city">Город</label>
                        <div class="input-group mb-3">
                            <select class="custom-select"
                                    id="city"
                                    v-model="selectedCity">
                                <option v-for="city in cities" :value="city">{{ city.title }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <label for="sort-type">Сортировка</label>
                        <div class="input-group mb-3">
                            <select class="custom-select"
                                    id="sort-type"
                                    v-model="selectedSortType">
                                <option v-for="sortType in sortTypes" :value="sortType">{{ sortType.title }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <label for="search">Содержание</label>
                        <div class="input-group mb-3">
                            <input id="search"
                                   type="text"
                                   class="form-control"
                                   aria-label="Поиск"
                                   aria-describedby="search-label" v-model="query">
                        </div>
                    </div>
                </div>
                <hr/>
                <div class="row mb-3">
                    <div class="col-sm-12">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input"
                                   v-model="percentageFilterEnabled"
                                   id="male-percentage-enabled-label">
                            <label class="custom-control-label"
                                   for="male-percentage-enabled-label">
                                Процент посетителей
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="custom-control custom-radio mb-3">
                            <input type="radio"
                                   id="percentageMaleSexType"
                                   name="customRadio"
                                   :disabled="!percentageFilterEnabled"
                                   v-model="sexType"
                                   value="m"
                                   class="custom-control-input">
                            <label class="custom-control-label"
                                   for="percentageMaleSexType">
                                Мужчины
                            </label>
                        </div>
                        <div class="input-group mb-3">
                            <select class="custom-select"
                                    id="male-percent"
                                    v-model="selectedMalePercentage"
                                    :disabled="sexType !== 'm' || !percentageFilterEnabled">
                                <option v-for="malePercentage in malePercentages" :value="malePercentage">
                                    {{ malePercentage === -1 ? 'Не учитывать' : malePercentage }}
                                </option>
                            </select>
                            <div class="input-group-append">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                        <div class="custom-control custom-radio mb-3">
                            <input type="radio"
                                   id="percentageFemaleSexType"
                                   name="customRadio"
                                   v-model="sexType"
                                   value="f"
                                   :disabled="!percentageFilterEnabled"
                                   class="custom-control-input">
                            <label class="custom-control-label" for="percentageFemaleSexType">Жуньщины</label>
                        </div>
                        <div class="input-group mb-3">
                            <select class="custom-select"
                                    id="female-percent"
                                    v-model="selectedFemalePercentage"
                                    :disabled="sexType !== 'f' || !percentageFilterEnabled">
                                <option v-for="femalePercentage in femalePercentages" :value="femalePercentage">
                                    {{ femalePercentage === -1 ? 'Не учитывать' : femalePercentage }}
                                </option>
                            </select>
                            <div class="input-group-append">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <button type="button"
                        class="btn btn-primary"
                        @click="find"
                        :disabled="isInProgress">
                    Найти
                </button>
                <button type="button"
                        class="btn btn-primary"
                        @click="findMore"
                        :disabled="isInProgress">
                    Найти еще
                </button>
                <button type="button"
                        class="btn btn-danger"
                        @click="isCancelled=true"
                        :disabled="isCancelled || !isInProgress">
                    Остановить
                </button>
            </div>
        </div>
        <div class="card col-sm-7 px-0 h-100">
            <div class="card-header">
                Группы&nbsp;
                <span v-if="isInProgress">
                    Идет поиск,
                    найдено:&nbsp;{{groups.length}}/{{offset}},
                    обрабатывается:&nbsp;{{progressMessage || '...'}}
                </span>
                <span v-if="isCancelled">Идет остановка поиска, подождите...</span>
            </div>
            <div class="card-body">
                <div class="card-deck mb-sm-3"
                     v-for="row in Array(Math.ceil(groups.length / 3)).fill(0).map(function(v, idx){return idx;})">
                    <div class="card cursor-pointer"
                         v-for="col in Array(3).fill(0).map(function(v, idx){return idx;})"
                         v-if="groups.length > col + row * 3">
                        <div class="card-header">{{ groups[col + row * 3].name }}</div>
                        <img class="card-img-top" :src="groups[col + row * 3].photo_200">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import _ from 'lodash'
  import $ from 'jquery'
  import Promise from 'bluebird'
  import VK from 'vk-io'
  import * as db from '../db'
  import 'daterangepicker'
  import 'daterangepicker/daterangepicker.css'

  import constants from '../constants'

  let vk = new VK()

  vk.setOptions({
    app: constants.clientID,
    key: constants.clientSecret,
  })

  export default {
    name: 'Home',
    data () {
      return {
        password: '',
        login: '',
        countries: [],
        selectedCountry: null,
        cities: [],
        selectedCity: null,
        query: '',
        sortTypes: [
          {'id': 0, 'title': 'сортировать по умолчанию (аналогично результатам поиска в полной версии сайта)'},
          {'id': 1, 'title': 'сортировать по скорости роста'},
          {'id': 2, 'title': 'сортировать по отношению дневной посещаемости к количеству пользователей'},
          {'id': 3, 'title': 'сортировать по отношению количества лайков к количеству пользователей'},
          {'id': 4, 'title': 'сортировать по отношению количества комментариев к количеству пользователей'},
          {'id': 5, 'title': 'сортировать по отношению количества записей в обсуждениях к количеству пользователей.'},
        ],
        selectedSortType: null,
        malePercentages: _.range(-1, 101),
        femalePercentages: _.range(-1, 101),
        selectedMalePercentage: -1,
        selectedFemalePercentage: -1,
        percentageFilterEnabled: false,
        sexType: 'm',
        groups: [],
        offset: 0,
        progressMessage: '',
        isCancelled: false,
        isInProgress: false,
        searchResultCount: 0,
        processedSearchResultCount: 0,
        isSearchCancelled: false,
      }
    },
    computed: {
      ...mapGetters(['token']),
    },
    methods: {
      ...mapActions(['setToken']),
      updateCities () {
        let self = this
        return vk.api.database.getCities({country_id: this.selectedCountry.id}).then(resp => {
          self.cities = resp.items
          self.selectedCity = resp.items[0]
        })
      },
      filterGroupsBySex (groups) {
        let self = this
        return Promise.each(groups, group => {
          let promise = new Promise((resolve, reject) => {
            let total = 0
            let maleCount = 0
            let femaleCount = 0

            let stream = vk.collect.groups.getMembers({
              group_id: group.id,
              fields: ['sex'],
            })

            stream.on('error', error => {
              reject(error)
            })

            stream.on('data', payload => {

              if(self.isCancelled){
                self.isInProgress = false
                self.isCancelled = false
                self.progressMessage = null
                self.offset = 0
                throw Error('cancelled')
              }

              if (!total) {
                total = payload.total
              }
              maleCount += payload.items.reduce((accumulator, item) => {
                return accumulator + (item.sex === 2 ? 1 : 0)
              }, 0)
              femaleCount += payload.items.reduce((accumulator, item) => {
                return accumulator + (item.sex === 1 ? 1 : 0)
              }, 0)
              self.progressMessage = `Id-${group.id}/М-${maleCount}/Ж-${femaleCount}/${total}`
            })

            stream.on('end', () => {
              let malePercentage = (maleCount * 100) / total
              let femalePercentage = (femaleCount * 100) / total
              console.log(group)
              console.log(malePercentage)
              console.log(femalePercentage)
              if (malePercentage <= self.selectedMalePercentage && self.sexType === 'm' ||
                femalePercentage <= self.selectedFemalePercentage && self.sexType === 'f')
                self.groups.push(group)
              resolve()
            })
          })
          return Promise.resolve(promise)
        })
      },
      find (offset) {
        let self = this

        self.offset = parseInt(offset) || 0

        if (self.offset === 0)
          self.groups = []

        self.isInProgress = true
        self.isCancelled = false

        vk.api.groups.search({
          q: this.query,
          city_id: this.selectedCity.id,
          sort: this.selectedSortType.id,
          count: 20,
          offset: self.offset,
        }).then(({count, items}) => {
          this.offset += items.length
          if (self.percentageFilterEnabled)
            return self.filterGroupsBySex(items)
          else
            return items
        }).then((groups) => {
          self.groups = self.groups.concat(groups)
          if (groups.length < 20 && !self.isCancelled) {
            self.find(self.offset)
          } else {
            self.isInProgress = false
            self.isCancelled = false
            self.progressMessage = null
          }
        }).catch(error=>{
          console.error(error)
          self.isInProgress = false
          self.isCancelled = false
          self.progressMessage = null
          self.offset = 0
        })
      },
      findMore () {
        this.find(this.offset)
      },
    },
    watch: {
      selectedCountry () {
        this.updateCities()
      },
    },
    mounted () {
      let self = this
      $(this.$refs['date-range']).daterangepicker({
        'drops': 'up',
        'locale': {
          'format': 'MM/DD/YYYY',
          'separator': ' - ',
          'applyLabel': 'Применить',
          'cancelLabel': 'Отменить',
          'fromLabel': 'C',
          'toLabel': 'По',
          'customRangeLabel': 'Произвольный',
          'daysOfWeek': [
            'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб',
          ],
          'monthNames': [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
          ],
          'firstDay': 1,
        },
      })
      Promise.try(() => {
        return self.token || db.getToken()
      }).then(token => {
        if (!_.isEmpty(token)) {
          return self.setToken(token)
        } else {
          Promise.reject('token is not valid: ', token)
        }
      }).then(() => {
        vk.setToken(self.token)
        return vk.api.account.setOffline().then(resp => {
          if (resp !== 1) {
            return Promise.reject('account.setOffline response is not equal to 1')
          }
        })
      }).catch(err => {
        console.error(err)
        self.$router.push('auth')
      }).then(() => {
        this.selectedSortType = this.sortTypes[0]
        return vk.api.database.getCountries().then(resp => {
          let countries = resp.items
          self.countries = countries
          let country = countries[0]
          self.selectedCountry = country
          return country.id
        })
      }).then(this.updateCities).catch(console.error)
    },
  }
</script>

<style lang="sass" scoped>
    .cursor-pointer
        cursor: pointer
</style>
