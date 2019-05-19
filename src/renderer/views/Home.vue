<template>
  <div class="card-group h-100">
    <div class="card col-sm-3 px-0 h-100">
      <div class="card-header">Меню</div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-12">
            <label for="country">Страна</label>
            <div class="input-group mb-3">
              <select class="custom-select" id="country" v-model="selectedCountry">
                <option v-for="country in countries" :value="country">{{ country.title }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <label for="city">Город</label>
            <div class="input-group mb-3">
              <select class="custom-select" id="city" v-model="selectedCity">
                <option v-for="city in cities" :value="city">{{ city.title }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <span>Сортировка</span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <template v-for="sortType in sortTypes">
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  :value="sortType"
                  v-model="selectedSortType"
                  class="custom-control-input"
                  :id="'sortType' + sortType.id"
                >
                <label
                  class="custom-control-label"
                  :for="'sortType' + sortType.id"
                >{{ sortType.title }}</label>
              </div>
            </template>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-12">
            <label for="search">Содержание</label>
            <div class="input-group mb-3">
              <input
                id="search"
                type="text"
                class="form-control"
                aria-label="Поиск"
                aria-describedby="search-label"
                v-model="query"
              >
            </div>
          </div>
        </div>
        <hr>
        <div class="row mb-3">
          <div class="col-sm-12">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                v-model="excludeClosedGroups"
                id="exclude-closed-groups"
              >
              <label
                class="custom-control-label"
                for="exclude-closed-groups"
              >Исключить закрытые сообщества</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                v-model="removeRaiting"
                id="remove-rating"
              >
              <label class="custom-control-label" for="remove-rating">Убрать рейтинг</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <div class="custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                v-model="removeAge"
                id="remove-age"
              >
              <label class="custom-control-label" for="remove-age">Убрать рост</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <a
              class="pt-1 pb-1 border-bottom d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              data-target="#activity-container"
            >
              Активность
              <i class="fa fa-plus-circle"></i>
            </a>
          </div>
        </div>
        <div id="activity-container" class="row collapse mb-3">
          <div class="col-sm-12">Кол - во просмотров</div>
          <div class="col-sm-12">
            <div class="input-group mb-3 d-flex align-items-center">
              <input id="comments-amount-min" type="text" class="form-control">
              &nbsp;
              <i class="fa fa-minus" aria-hidden="true"></i>&nbsp;
              <input id="comments-amount-max" type="text" class="form-control">
            </div>
            <div
              id="comments-amount-slider"
              class="slider-range"
              data-max="10000"
              data-min-target="#comments-amount-min"
              data-max-target="#comments-amount-max"
            ></div>
          </div>
          <div class="col-sm-12">Количество лайков</div>
          <div class="col-sm-12">
            <div class="input-group mb-3 d-flex align-items-center">
              <input id="likes-amount-min" type="text" class="form-control">
              &nbsp;
              <i class="fa fa-minus"></i>&nbsp;
              <input id="likes-amount-max" type="text" class="form-control">
            </div>
            <div
              id="likes-amount-slider"
              class="slider-range"
              data-max="10000"
              data-min-target="#likes-amount-min"
              data-max-target="#likes-amount-max"
            ></div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <a
              class="pt-1 pb-1 border-bottom d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              data-target="#raiting-container"
            >
              Рейтинг
              <i class="fa fa-plus-circle"></i>
            </a>
          </div>
        </div>
        <div id="raiting-container" class="row collapse mb-3">
          <div class="col-sm-12">
            <div class="input-group mb-3 d-flex align-items-center">
              <input id="raiting-min" type="text" class="form-control">
              &nbsp;
              <i class="fa fa-minus"></i>&nbsp;
              <input id="raiting-max" type="text" class="form-control">
            </div>
            <div
              id="raiting-slider"
              class="slider-range"
              data-max="1000"
              data-factor="1000"
              data-min-target="#raiting-min"
              data-max-target="#raiting-max"
            ></div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-sm-12">
            <a
              class="pt-1 pb-1 border-bottom d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              data-target="#age-container"
            >
              Рост
              <i class="fa fa-plus-circle"></i>
            </a>
          </div>
        </div>
        <div id="age-container" class="row collapse mb-3">
          <div class="col-sm-12">
            <div class="input-group mb-3 d-flex align-items-center">
              <input id="age-min" type="text" class="form-control">
              &nbsp;
              <i class="fa fa-minus"></i>&nbsp;
              <input id="age-max" type="text" class="form-control">
            </div>
            <div
              id="age-slider"
              class="slider-range"
              data-max="1000"
              data-min="-1000"
              data-min-target="#age-min"
              data-max-target="#age-max"
            ></div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-12">
            <a
              class="pt-1 pb-1 border-bottom d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              data-target="#subs-container"
            >
              Подписчики
              <i class="fa fa-plus-circle"></i>
            </a>
          </div>
        </div>
        <div id="subs-container" class="row collapse">
          <div class="col-sm-12">
            <div class="custom-control custom-radio mb-3">
              <input
                type="radio"
                id="subs100KType"
                name="customRadioSubs"
                value="100000"
                class="custom-control-input"
              >
              <label class="custom-control-label" for="subs100KType">От 100 тыс</label>
            </div>
            <div class="custom-control custom-radio mb-3">
              <input
                type="radio"
                id="subs500KType"
                name="customRadioSubs"
                value="500000"
                class="custom-control-input"
              >
              <label class="custom-control-label" for="subs500KType">От 500 тыс</label>
            </div>
            <div class="custom-control custom-radio mb-3">
              <input
                type="radio"
                id="subs1000KType"
                name="customRadioSubs"
                value="1000000"
                class="custom-control-input"
              >
              <label class="custom-control-label" for="subs1000KType">От 1 млн</label>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-12">
            <a
              class="pt-1 pb-1 border-bottom d-flex justify-content-between align-items-center"
              data-toggle="collapse"
              data-target="#sex-container"
            >
              Процент посетителей
              <i class="fa fa-plus-circle"></i>
            </a>
          </div>
        </div>
        <div id="sex-container" class="row collapse">
          <div class="col-sm-12">
            <div class="custom-control custom-radio mb-3">
              <input
                type="radio"
                id="percentageMaleSexType"
                name="customRadio"
                :disabled="!percentageFilterEnabled"
                v-model="sexType"
                value="m"
                class="custom-control-input"
              >
              <label class="custom-control-label" for="percentageMaleSexType">Мужчины</label>
            </div>
            <div class="input-group mb-3">
              <select
                class="custom-select"
                id="male-percent"
                v-model="selectedMalePercentage"
                @change="updateFemalePercentage"
                :disabled="sexType !== 'm' || !percentageFilterEnabled"
              >
                <option
                  v-for="malePercentage in malePercentages"
                >{{ malePercentage === -1 ? 'Не учитывать' : malePercentage }}</option>
              </select>
              <div class="input-group-append">
                <span class="input-group-text">%</span>
              </div>
            </div>
            <div class="custom-control custom-radio mb-3">
              <input
                type="radio"
                id="percentageFemaleSexType"
                name="customRadio"
                v-model="sexType"
                value="f"
                :disabled="!percentageFilterEnabled"
                class="custom-control-input"
              >
              <label class="custom-control-label" for="percentageFemaleSexType">Женщины</label>
            </div>
            <div class="input-group mb-3">
              <select
                class="custom-select"
                id="female-percent"
                v-model="selectedFemalePercentage"
                @change="updateMalePercentage"
                :disabled="sexType !== 'f' || !percentageFilterEnabled"
              >
                <option
                  v-for="femalePercentage in femalePercentages"
                >{{ femalePercentage === -1 ? 'Не учитывать' : femalePercentage }}</option>
              </select>
              <div class="input-group-append">
                <span class="input-group-text">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted text-nowrap">
        <button type="button" class="btn btn-primary" @click="find" :disabled="isInProgress">Найти</button>
        <button
          type="button"
          class="btn btn-primary"
          @click="findMore"
          :disabled="isInProgress"
        >Найти еще</button>
        <button
          type="button"
          class="btn btn-danger"
          @click="isCancelled=true"
          :disabled="isCancelled || !isInProgress"
        >
          <span>
            <i class="fa fa-hand-paper-o"></i>
          </span>
        </button>
      </div>
    </div>
    <div class="card col-sm-9 px-0 h-100">
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
        <div
          class="card-columns mb-sm-3"
          v-for="row in Array(Math.ceil(groups.length / 3)).fill(0).map(function(v, idx){return idx;})"
        >
          <card-group
            v-for="col in Array(3).fill(0).map(function(v, idx){return idx;})"
            v-if="groups.length > col + row * 3"
            :group="groups[col + row * 3]"
            @selectGroup="selectGroup"
            @removeGroup="removeGroup"
            @onGroupNameCheckboxChanged="onGroupNameCheckboxChanged"
          ></card-group>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="modal">
      <div class="modal-dialog" :class="{'modal-lg': groupSelection}" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="groupSelection">Сравнение группп</h5>
            <h5 class="modal-title" v-else>Карточка группы</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" v-if="selectedGroup || selectedGroupsToCompare">
              <div
                :class="{'col-12': !groupSelection,  'col-6' : groupSelection}"
                v-for="selectedGroup in (selectedGroup ? [selectedGroup] : (selectedGroupsToCompare ? selectedGroupsToCompare : []))"
              >
                <div
                  class="card-img-top"
                  style="-webkit-border-radius: 50%; height: 200px; width: 200px;"
                  :style="{ backgroundImage: 'url(' + selectedGroup.photo_200 + ')' }"
                ></div>
                <div>Название: {{ selectedGroup.name }}</div>
                <div>
                  Адрес:
                  <a
                    :href="`https://vk.com/${selectedGroup.screen_name}`"
                  >{{ `https://vk.com/${selectedGroup.screen_name}` }}</a>
                </div>
                <div>Описание: {{ selectedGroup.description || "отсутствует" }}</div>
                <div>Тип группы: {{ selectedGroup.is_closed > 0 ? 'Закрытая' : 'Открытая' }}</div>
                <div v-if="selectedMalePercentage !== 'Не учитывать'">
                  Процент мужчин
                  <span
                    v-if="selectedGroup.malePercentage"
                  >{{ parseFloat(selectedGroup.malePercentage).toFixed(2) }}%</span>
                  <pulse-loader
                    class="d-inline-block"
                    :size="'10px'"
                    :margin="'0'"
                    v-else
                  />
                </div>
                <div v-if="selectedFemalePercentage !== 'Не учитывать'">
                  Процент женщин
                  <span
                    v-if="selectedGroup.femalePercentage"
                  >{{ parseFloat(selectedGroup.femalePercentage ).toFixed(2) }}%</span>
                  <pulse-loader
                    class="d-inline-block"
                    :size="'10px'"
                    :margin="'0'"
                    v-else
                  />
                </div>
                <div>Кол-во участников: {{ selectedGroup.members_count }}</div>
                <div>Рост за последние 24 часа: {{ selectedGroup.diffAbs || "Не известно" }}</div>
                <div v-if="!removeRaiting">Рейтинг: {{ selectedGroup.raiting }}</div>
                <hr>
                <div class="font-weight-bold">Статистика по 20 последним записям в группе</div>
                <div>Кол-во лайков: {{ selectedGroup.likes || "Не известно" }}</div>
                <div>Поделились: {{ selectedGroup.shares || "Не известно" }}</div>
                <div>Кол-во просмотров: {{ selectedGroup.views || "Не известно" }}</div>
              </div>
            </div>
            <pulse-loader v-else></pulse-loader>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary"
              v-if="selectedGroup && !selectedGroup.is_member"
              @click="joinGroup(selectedGroup)"
            >Подписаться</button>
            <button
              class="btn btn-error"
              v-if="selectedGroup && selectedGroup.is_member"
              @click="leaveGroup(selectedGroup)"
            >Отписвться</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { parse } from "node-html-parser";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import $ from "jquery";
import Promise from "bluebird";
import VK from "vk-io";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import CardGroup from "./CardGroup.vue";
import * as db from "../db";
import "daterangepicker";
import "daterangepicker/daterangepicker.css";

import constants from "../constants";
import Vue from "vue";

let vk = new VK();

vk.setOptions({
  app: constants.clientID,
  key: constants.clientSecret
});

export default {
  components: {
    PulseLoader,
    CardGroup
  },
  name: "Home",
  data() {
    return {
      password: "",
      login: "",
      countries: [],
      selectedCountry: null,
      cities: [],
      selectedCity: null,
      query: "",
      sortTypes: [
        {
          id: 0,
          title: "По умолчанию"
        },
        { id: 1, title: "По скорости роста" },
        { id: 2, title: "По посещаемости" },
        { id: 3, title: "По количеству лайков" },
        { id: 4, title: "По количеству комментариев" },
        {
          id: 5,
          title: "По обсуждению"
        }
      ],
      selectedSortType: null,
      malePercentages: _.range(-1, 101),
      femalePercentages: _.range(-1, 101),
      selectedMalePercentage: "Не учитывать",
      selectedFemalePercentage: "Не учитывать",
      percentageFilterEnabled: true,
      excludeClosedGroups: false,
      sexType: "m",
      groups: [],
      offset: 0,
      progressMessage: "",
      isCancelled: false,
      isInProgress: false,
      searchResultCount: 0,
      processedSearchResultCount: 0,
      isSearchCancelled: false,
      selectedGroup: null,
      removeRaiting: false,
      removeAge: false,
      groupsToCompare: [],
      selectedGroupsToCompare: null,
      groupSelection: false
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    ...mapActions(["setToken"]),
    updateCities() {
      let self = this;
      return vk.api.database
        .getCities({ country_id: this.selectedCountry.id })
        .then(resp => {
          self.cities = resp.items;
          self.selectedCity = resp.items[0];
        });
    },
    getGroupWithPercentages(group, always) {
      let self = this;
      return new Promise((resolve, reject) => {
        let total = 0;
        let maleCount = 0;
        let femaleCount = 0;

        let stream = vk.collect.groups.getMembers({
          group_id: group.id,
          fields: ["sex"]
        });

        stream.on("error", error => {
          reject(error);
        });

        stream.on("data", payload => {
          if (self.isCancelled) {
            self.isInProgress = false;
            self.isCancelled = false;
            self.progressMessage = null;
            self.offset = 0;
            throw Error("cancelled");
          }

          if (!total) {
            total = payload.total;
          }
          maleCount += payload.items.reduce((accumulator, item) => {
            return accumulator + (item.sex === 2 ? 1 : 0);
          }, 0);
          femaleCount += payload.items.reduce((accumulator, item) => {
            return accumulator + (item.sex === 1 ? 1 : 0);
          }, 0);
          self.progressMessage = `Id-${
            group.id
          }/М-${maleCount}/Ж-${femaleCount}/${total}`;

          console.log("payload");
        });

        stream.on("end", () => {
          let malePercentage = (maleCount * 100) / total;
          let femalePercentage = (femaleCount * 100) / total;
          console.log("end");
          if (
            (malePercentage >= self.selectedMalePercentage &&
              self.sexType === "m") ||
            (femalePercentage >= self.selectedFemalePercentage &&
              self.sexType === "f") ||
            always
          ) {
            group.malePercentage = malePercentage;
            group.femalePercentage = femalePercentage;
          }

          resolve(group);
        });
      });
    },
    filterGroupsBySex(groups) {
      let self = this;
      return Promise.each(groups, group => {
        return self.getGroupWithPercentages(group);
      });
    },
    find(offset) {
      let self = this;
      let lastRaiting = parseFloat($("#raiting-max").val());
      let max = parseFloat($("#age-max").val());

      self.offset = parseInt(offset) || 0;

      if (self.offset === 0) {
        self.groups.splice(0);
      } else {
        lastRaiting =
          self.groups[self.groups.length - 1].raiting -
          (Math.round(Math.random()) ? 0.001 : 0.002);
      }

      self.isInProgress = true;
      self.isCancelled = false;

      vk.api.groups
        .search({
          q: this.query,
          city_id: this.selectedCity.id,
          sort: this.selectedSortType.id,
          count: 20,
          offset: self.offset
        })
        .then(({ count, items }) => {
          this.offset += items.length;

          if (
            self.percentageFilterEnabled &&
            (self.selectedMalePercentage !== "Не учитывать" ||
              self.selectedFemalePercentage !== "Не учитывать")
          )
            return self.filterGroupsBySex(items);

          return items;
        })
        .then(groups => {
          if (self.removeAge) return groups;
          return Promise.each(groups, group => {
            return self.scrapeActivity(group).then(diffAbs => {
              console.log(diffAbs);
              group.diffAbs = diffAbs;
              return group;
            });
          });
        })
        .then(groups => {
          groups.forEach(group => {
            group.selected = false;
            group.raiting = lastRaiting > 0.5 ? lastRaiting : 0.5;
            lastRaiting -= Math.round(Math.random()) ? 0.001 : 0.002;
          });
          console.log(groups);
          self.groups = self.groups.concat(
            groups.filter(group => {
              if (group === null) return false;

              if (this.excludeClosedGroups) return group.is_closed === 0;

              if (group.diffAbs && group.diffAbs > max) {
                return false;
              }

              return true;
            })
          );
          if (groups.length > 0 && groups.length < 20 && !self.isCancelled) {
            self.find(self.offset);
          } else {
            self.isInProgress = false;
            self.isCancelled = false;
            self.progressMessage = null;
          }
        })
        .catch(error => {
          console.error(error);
          self.isInProgress = false;
          self.isCancelled = false;
          self.progressMessage = null;
          self.offset = 0;
        });
    },
    findMore() {
      this.find(this.offset);
    },
    updateFemalePercentage({ target }) {
      if (target.value !== "Не учитывать")
        this.selectedFemalePercentage = 100 - target.value;
      else this.selectedFemalePercentage = "Не учитывать";
    },
    updateMalePercentage({ target }) {
      if (target.value !== "Не учитывать")
        this.selectedMalePercentage = 100 - target.value;
      else this.selectedMalePercentage = "Не учитывать";
    },
    _selectGroup(originalGroup) {
      var self = this;
      return vk.api.groups
        .getById({
          group_id: originalGroup.id,
          fields: ["members_count", "description", "screen_name"]
        })
        .then(groups => {
          var group = _.merge(originalGroup, groups[0]);
          console.log(group);
          return Promise.all([
            group,
            vk.api.stats
              .get({
                group_id: group.id
              })
              .catch(err => {
                return null;
              }),
            this.scrapeGroupWall(group.id)
          ]);
        })
        .then(([oldGroup, stats, scrapeStats]) => {
          if (
            self.percentageFilterEnabled &&
            (self.selectedMalePercentage !== "Не учитывать" ||
              self.selectedFemalePercentage !== "Не учитывать") &&
            (!self.malePercentage || !self.femalePercentage)
          ) {
            return self.getGroupWithPercentages(oldGroup, true).then(group => {
              if (self.selectedGroup && self.selectedGroup.id === group.id)
                return group;

              return oldGroup;
            });
          }
          if (scrapeStats) {
            oldGroup.likes = scrapeStats.likes;
            oldGroup.shares = scrapeStats.shares;
            oldGroup.views = scrapeStats.views;
          }
          return oldGroup;
        });
    },
    selectGroup(group) {
      this.groupSelection = false;
      this._selectGroup(group).then(group => {
        this.selectedGroup = group;
      });
    },
    removeGroup(group) {
      this.groups.splice(this.groups.indexOf(group), 1);
    },
    scrapeActivity(group) {
      const link = `https://allsocial.ru/entity?direction=1&is_closed=-1&is_verified=-1&list_type=1&order_by=diff_abs&period=day&platform=1&range=0:12000000&str=${
        group.screen_name
      }&type_id=-1`;
      return axios.get(link).then(({ data }) => {
        if (
          data.response &&
          data.response.entity &&
          data.response.entity.length > 0
        ) {
          return data.response.entity[0].diff_abs;
        }
        return null;
      });
    },
    scrapeGroupWall(
      groupId,
      offset = 0,
      date = moment(),
      query = null,
      maxOffset = 20,
      prevStat = null
    ) {
      if (offset >= maxOffset) return prevStat;
      let link = `https://vk.com/wall-${groupId}?own=1`;
      if (offset) link += `&offset=${offset}`;
      if (date) link += `&day=${moment(date).format("DDMMYYYY")}`;
      if (query) link += `&q=${query}`;
      return axios
        .get(link)
        .then(({ data }) => {
          const root = parse(data);
          const pagingButtons = root.querySelectorAll("#fw_pages a");
          const stat = prevStat || {
            likes: 0,
            shares: 0,
            views: 0
          };

          if (!pagingButtons.length) {
            return [stat, 0];
          }

          const lastPageOffset =
            pagingButtons[pagingButtons.length - 1].attributes.href.match(
              /offset=(\d+)/
            )[1] || maxOffset;
          const posts = Array.prototype.slice.call(
            root.querySelectorAll(".post")
          );
          posts.forEach(post => {
            const likes = parseInt(
              post
                .querySelector(".like .like_button_count")
                .text.replace(/\s+/, "")
            );
            stat.likes += likes;
            const shares = parseInt(
              post
                .querySelector(".share .like_button_count")
                .text.replace(/\s+/, "")
            );
            stat.shares += shares;
            const views = post.querySelector(".like_views").text;
            if (views.endsWith("K")) views.replace("K", "1000");
            stat.views += parseInt(views);
          });
          return [stat, lastPageOffset];
        })
        .then(([stat, lastPageOffset]) => {
          const newOffset = offset + 20;
          if (newOffset > lastPageOffset) return stat;

          return new Promise(resolve => {
            setTimeout(() => {
              const newStat = this.scrapeGroupWall(
                groupId,
                newOffset,
                date,
                query,
                maxOffset,
                stat
              );
              resolve(newStat);
            }, 1500);
          });
        });
    },
    clearSelectedGroups() {
      this.groupsToCompare.forEach(group => {
        group.selected = false;
      });
      this.groupsToCompare.splice(0);
      this.selectedGroupsToCompare.splice(0);
      this.groupSelection = false
    },
    onGroupNameCheckboxChanged(group) {
      if (group.selected && this.groupsToCompare.indexOf(group) < 0)
        this.groupsToCompare.push(group);
      else if (!group.selected && this.groupsToCompare.indexOf(group) >= 0) {
        this.groupsToCompare.splice(this.groupsToCompare.indexOf(group), 1);
      }

      if (group.selected && this.groupsToCompare.length > 2) {
        this.groupsToCompare[0].selected = false;
        this.groupsToCompare.splice(0, 1);
      }

      if (this.groupsToCompare.length == 2) {
        $("#modal").modal("show");
        this.compareGroups();
      }
    },
    compareGroups() {
      this.groupSelection = true;
      console.log(this.groupsToCompare);
      Promise.each(this.groupsToCompare, group => {
        console.log(group);
        return this._selectGroup(group);
      }).then(groups => {
        this.selectedGroupsToCompare = groups;
      });
    }
  },
  watch: {
    selectedCountry() {
      this.updateCities();
    }
  },
  mounted() {
    let self = this;

    $("#modal").on("hidden.bs.modal", event => {
      self.selectedGroup = null;
      this.groupSelection = false;
      this.clearSelectedGroups();
    });

    $('[data-toggle="collapse"]').each(function(el) {
      const toggler = $(this);
      $(toggler.data("target")).on("shown.bs.collapse", function() {
        toggler.find("i").removeClass("fa-plus-circle");
        toggler.find("i").addClass("fa-minus-circle");
      });
      $(toggler.data("target")).on("hidden.bs.collapse", function() {
        toggler.find("i").addClass("fa-plus-circle");
        toggler.find("i").removeClass("fa-minus-circle");
      });
    });

    $(".slider-range").each(function() {
      var slider = $(this);
      var min = slider.data("min") || 0;
      var max = slider.data("max") || 1000000;
      var factor = slider.data("factor") || 1;
      var minTarget = $(slider.data("minTarget"));
      var maxTarget = $(slider.data("maxTarget"));
      minTarget.val(min / factor);
      maxTarget.val(max / factor);
      slider.slider({
        range: true,
        min: min,
        max: max,
        values: [min, max],
        slide: function(event, ui) {
          var target = $(event.target);
          var minTarget = $(target.data("minTarget"));
          var maxTarget = $(target.data("maxTarget"));
          minTarget.val(ui.values[0] / factor);
          maxTarget.val(ui.values[1] / factor);
        }
      });
    });

    $(this.$refs["date-range"]).daterangepicker({
      drops: "up",
      locale: {
        format: "MM/DD/YYYY",
        separator: " - ",
        applyLabel: "Применить",
        cancelLabel: "Отменить",
        fromLabel: "C",
        toLabel: "По",
        customRangeLabel: "Произвольный",
        daysOfWeek: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        monthNames: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
          "Октябрь",
          "Ноябрь",
          "Декабрь"
        ],
        firstDay: 1
      }
    });
    Promise.try(() => {
      return self.token || db.getToken();
    })
      .then(token => {
        if (!_.isEmpty(token)) {
          return self.setToken(token);
        } else {
          Promise.reject("token is not valid: ", token);
        }
      })
      .then(() => {
        vk.token = self.token;
        return vk.api.account.setOffline().then(resp => {
          if (resp !== 1) {
            return Promise.reject(
              "account.setOffline response is not equal to 1"
            );
          }
        });
      })
      .catch(err => {
        console.error(err);
        self.$router.push("auth");
      })
      .then(() => {
        this.selectedSortType = this.sortTypes[0];
        return vk.api.database.getCountries().then(resp => {
          let countries = resp.items;
          self.countries = countries;
          let country = countries[0];
          self.selectedCountry = country;
          return country.id;
        });
      })
      .then(this.updateCities)
      .catch(console.error);
  }
};
</script>

<style lang="sass" scoped>
    .group-header
        white-space: nowrap
        text-overflow: ellipsis

    .cursor-pointer
        cursor: pointer

    .card-img-top
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center
        -webkit-border-radius: 50%
        border-radius: 50%
        overflow: hidden;
        border-collapse: collapse;
        & .list-group
            text-align: center
            opacity: 0
        &.active .list-group
                opacity: 0.8

    #modal .modal-body > *
        @extend .mb-1
</style>
