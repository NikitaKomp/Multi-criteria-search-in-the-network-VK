<template>
    <div class="container h-100">
        <div class="row justify-content-md-center align-items-center h-100">
            <form class="col-sm-12" @submit.prevent>
                <div class="form-group">
                    <label for="login">E-mail/Телефон</label>
                    <input v-model="login" type="email" class="form-control" id="login" placeholder="E-mail/Телефон">
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Пароль">
                </div>
                <button class="btn btn-primary" type="submit" @click="onAuthSubmit">Войти</button>
            </form>
        </div>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Promise from 'bluebird'
  import VK from 'vk-io'

  import constants from '../constants'
  import { getToken, saveTokenData } from '../db'

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
      }
    },
    methods: {
      ...mapActions(['setToken']),
      onAuthSubmit: function () {
        let self = this
        vk.setOptions({
          login: this.login,
          password: this.password,
        })
        vk.auth.iphoneApp().run().then(response => {
          return saveTokenData(response)
        }).then(tokenData => {
          return self.setToken(tokenData.token)
        }).then(() => {
          self.$router.push('home', Promise.resolve, Promise.reject)
          return null
        }).catch(console.error)
      },
    },
    computed: {
      ...mapGetters(['token']),
    },
    beforeMount () {
      let self = this
      getToken().then(token => {
        return self.setToken(token)
      }).then(() => {
        if (self.token)
          self.$router.push('home', Promise.resolve, Promise.reject)
        else
          console.warn('no user found in db')
        return null
      }).catch(console.error)
    },
  }
</script>

<style lang="sass" scoped>
</style>
