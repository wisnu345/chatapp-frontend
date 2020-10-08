<template>
  <div>
    <div class="profile-box col-12 position-absolute p-0">
      <div class="col-12 name mb-1 p-0 d-flex justify-content-start align-items-center">
          <img class="ml-3" src="../assets/icons/back (1).svg" @click="close">
          <p class="m-0 p-name text-center w-100">{{ userProfile.email }}</p>
      </div>
      <div class="col-12 name mb-1 p-0 d-flex justify-content-start flex-column align-items-center">
          <div class="col-12 name d-flex w-100 justify-content-between align-items-center" v-for="(item, index) in listUser" :key="index">
              <div class="pp">
                <img src="../assets/gambar/Rectangle 3.png" alt="" srcset="">
              </div>
              {{item.username}}
              <div class="rounded-circle btn-add" @click="addFriend(item.username)"><img src="../assets/icons/addFriends.svg"></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userProfile', 'listUser'],
  methods: {
    close () {
      this.$emit('close')
    },
    addFriend (x) {
      this.$emit('add', x)
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
.btn-add {
    border: 2px solid black;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-add img {
    height: 20px;
    width: 20px;
}
.pp {
    height: 40px;
    width: 40px;
}

.pp img{
    height: 100%;
    width: 100%;
}
</style>
