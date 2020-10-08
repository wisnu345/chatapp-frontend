<template>
    <div>
        <div class="container">
            <h3 class="w-100 d-flex text-center">This is my Location <span class="ml-auto" @click="toHome">x</span></h3>
            <google-maps class="map"
            :center="{
                lat:-6.155463,
                lng: 106.571857
            }"
            :zoom="12"
            > </google-maps>
        </div>
    </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
export default {
  components: {
    'google-maps': VueGoogleMaps.Map
  },
  methods: {
    toHome () {
      this.$router.push({
        path: '/',
        query: {
          username: this.$route.query.username
        }
      })
    }
  }
}
</script>

<style scoped>
.map {
    width: 100%;
    height: 500px;
}
h3 span {
    cursor: pointer;
}
</style>
