<template>
  <div>
      <Splash v-if="loadSplash"/>
    <div class="container-fluid">
      <div class="position-asolute" v-if="errorResponse" @click="errorResponse = false">{{errorres}}</div>
      <div class="position-asolute" v-if="successResponse" @click="successResponse = false">{{successres}}</div>
      <div class="a d-flex justify-content-center h-100 align-items-center">
        <div class="box-login col-12 col-sm-4">
          <div class="mb-3 col-12 p-0 d-flex" style="font-size: 22px; color: #7e98df">
           <h3 class="text-center w-100"> Login </h3>
            </div>
          <form @submit.prevent="onLogin">
            <p>Hi, Welcome Back!</p>
            <p class="label">Email</p>
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="form.email"
              required
            />
            <p class="label">Password</p>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="form.password"
              required
            />
            <p class="mt-3" style="text-align: end">Forgot Password?</p>
            <button type="submit" class="btn btnp btn-primary w-100">
              Login
            </button>
          </form>
          <div class="col-12 d-flex p-0 mb-3 mt-3">
            <div class="col-4 p-0">
              <hr />
            </div>
            <div
              class="col-4 d-flex justify-content-center p-0 align-items-center"
              style="font-size: 10px"
            >
              Login With
            </div>
            <div class="col-4 p-0">
              <hr />
            </div>
          </div>
          <div class="col-12 d-flex p-0">
            <div class="col-12 p-0">
              <button type="Button" class="btn btno btn-outline-primary w-100">
                Google
              </button>
            </div>
          </div>
          <div class="col-12 p-0 m-0">
            <p class="m-0 mt-2 d-flex justify-content-center align-items-center">
              Don't Have Any Account?<a href="" @click.prevent="toRegist">   Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Splash from '../components/Splash copy'
import functions from '../mixins/index'
// import axios from 'axios'
export default {
  components: {
    Splash
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      errorResponse: false,
      successResponse: false,
      loadSplash: true
    }
  },
  methods: {
    toRegist () {
      this.$router.push('/register')
    },
    onLogin () {
      this.actionLogin(this.form)
        .then((response) => {
          if (response.code === 500) {
            this.errorres = response.message
            this.errorResponse = true
            this.hide()
          }
          if (response.code === 200) {
            const username = response.data.username
            this.successres = response.message
            this.successResponse = true
            this.$router.push({
              path: '/',
              query: {
                username: username
              }
            })
          }
        })
        .catch((err) => {
          alert(err)
        })
    },
    ...mapActions({
      actionLogin: 'auth/login'
    }),
    hide () {
      setTimeout(function () {
        this.errorResponse = false
      }, 3000)
    }
  },
  mixins: [functions],
  watch: {
    hide () {
      setTimeout(function () {
        this.errorResponse = false
      }, 3000)
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadSplash = false
    }, 2000)
  }
}
</script>

<style scoped>
.container-fluid {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  overflow: hidden;
}
.container-fluid div.a {
  background: #e5e5e5;
}
.box-login {
  height: 80%;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
  padding: 40px 60px;
  overflow: scroll;
}
.box-login::-webkit-scrollbar {
  height: 0;
  width: 2px;
  background: none;
}
/* Track */
.box-login::-webkit-scrollbar-track {
  background: none;
}
/* Handle */
.box-login::-webkit-scrollbar-thumb {
  background: none;
}
/* Handle on hover */
.box-login::-webkit-scrollbar-thumb:hover {
  background: #555;
}
p {
  text-align: start;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #232323;
}
p.label {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #848484;
  opacity: 0.75;
  margin: 0;
  margin-top: 20px;
}
input {
  border: none;
  border-bottom: 1px black solid;
  border-radius: 0px;
}
.btnp {
  background: #7e98df;
  border-radius: 70px;
}
.btno {
  border: 1px #7e98df solid;
  border-radius: 70px;
}
@media (max-width: 576px) {
    .box-login {
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 0px;
  padding: 40px 60px;
}
}
</style>
