const functions = {
  data () {
    return {
      errorres: '',
      successres: ''
    }
  },
  methods: {
    errAlert () {
      const err = this.$refs.err.classList
      err.contains('hide') ? err.remove('hide') : err.add('hide')
      setTimeout(function () {
        err.contains('hide') ? err.remove('hide') : err.add('hide')
      }, 3000)
    },
    sucAlert () {
      const suc = this.$refs.suc.classList
      suc.contains('hide') ? suc.remove('hide') : suc.add('hide')
      setTimeout(function () {
        suc.contains('hide') ? suc.remove('hide') : suc.add('hide')
      }, 2000)
    }
  }
}

export default functions
