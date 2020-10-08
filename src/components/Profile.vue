<template>
  <div>
    <div class="profile-box col-12 position-absolute p-0">
      <div class="col-12 name mb-1 p-0 d-flex justify-content-start align-items-center">
          <img class="ml-3" src="../assets/icons/back (1).svg" @click="close">
          <p class="m-0 p-name text-center w-100">{{ userProfile.email }}</p>
      </div>
      <div
        class="col-12 d-flexflex-column justify-content-center align-items-center w-100 p-0"
        style="width: 80px"
      >
        <img
          style="width: 80px"
          src="../assets/gambar/Rectangle 3.png"
          alt=""
          srcset=""
        />
      </div>
      <div class="col-12 name mb-3 p-0">
        <h6 class="m-0">
          {{ userProfile.username }}
        </h6>
        <p style="font-size: 14px">{{ userProfile.email }}</p>
      </div>
      <div class="col-12 name p-0">
          <h6 class="ml-3 text-left">Account</h6>
      </div>
      <div class="col-12 p-0">
          <input type="text" name="" v-model="userProfile.no_telp" @keyup.enter="send" v-if="editno">
          <h6 class="ml-3 text-left" style="font-weight: 400;" v-else>+62-xyz-abc</h6>
      </div>
      <div class="col-12 p-0">
          <h6 class="ml-3 text-left" style="font-weight: 300;" @click="editno=true">click to change number</h6>
      </div>
      <div class="col-12 p-0">
          <hr>
      </div>
      <div class="col-12 p-0">
          <h6 class="ml-3 text-left">{{ userProfile.email }}</h6>
      </div>
      <div class="col-12 p-0">
          <h6 class="ml-3 text-left"  style="font-weight: 400;">{{ userProfile.username }}</h6>
      </div>
      <div class="col-12 p-0">
          <hr>
      </div>
      <div class="col-12 p-0">
          <h6 class="ml-3 text-left">Im a Junior Front end Developer</h6>
      </div>
      <div class="col-12 p-0">
          <h6 class="ml-3 text-left" style="font-weight: 300;">Bio</h6>
      </div>
      <div class="col-12 p-0">
          <hr>
      </div>
      <div class="col-12 p-0">
          <h6 class="ml-3 text-left" @click="toLocation" style="cursor: pointer;">My Location</h6>
      </div>
      <div class="col-12 p-0">
          <hr>
      </div>
      <div class="col-12 mb-3 p-0">
          <h6 class="ml-3 text-left">Settings</h6>
      </div>
      <div class="col-12  mb-3 p-0">
          <div class="col-12 d-flex align-items-center mb-3">
              <img src="../assets/icons/Union.svg" class="icon-settings mr-2">
              <h6 class=" text-left m-0">Notification and sounds</h6>
          </div>
          <div class="col-12 d-flex align-items-center mb-3">
              <img src="../assets/icons/Group 5.svg" class="icon-settings mr-2">
              <h6 class=" text-left m-0">Privacy and Security</h6>
          </div>
          <div class="col-12 d-flex align-items-center mb-3">
              <img src="../assets/icons/Group 6.svg" class="icon-settings mr-2">
              <h6 class=" text-left m-0">Data and Storage</h6>
          </div>
          <div class="col-12 d-flex align-items-center mb-3">
              <img src="../assets/icons/Chat.svg" class="icon-settings mr-2">
              <h6 class=" text-left m-0">Chats setting</h6>
          </div>
          <div class="col-12 d-flex align-items-center mb-3">
              <img src="../assets/icons/Device.svg" class="icon-settings mr-2">
              <h6 class=" text-left m-0">Device</h6>
          </div>
          <div class="col-12 d-flex align-items-center mb-3" @click="logOut">
              <img src="../assets/icons/Device copy.svg" class="mr-2">
              <h6 class=" text-left m-0" style="color: red; cursor: pointer;">Exit</h6>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userProfile'],
  data () {
    return {
      editno: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      this.$router.push({
        path: '/login'
      })
    },
    send () {
      console.log('ok')
    },
    toLocation () {
      this.$router.push({
        path: '/location',
        query: {
          username: this.$route.query.username
        }
      })
    }
  }
}
</script>

<style scoped>
.profile-box {
  position: absolute;
  height: 100vh;
  background: white;
  z-index: 3;
  overflow: scroll;
}
.profile-box::-webkit-scrollbar {
  width: 3px;
  background: none;
}
/* Handle on hover */
.profile-box::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.name {
  height: 50px;
}
.icon-settings {
    width: 22px;
}
.p-name {
  color: #7E98DF;
}
</style>
