<template>
  <div>
      <Splash v-if="loadSplash"/>
    <div class="container-fluid d-flex">
      <div class="listchat-box col-12 col-sm-3 p-0 ">
        <Profile v-if="profile" :userProfile="userProfile" @close="profile=false"/>
        <AddFriends v-if="addfren" :userProfile="userProfile" :listUser="listUser" @add="addFriends($event)" @close="addfren=false"/>
        <div class="top-title d-flex align-items-center">
          <div class="col-9 ">
            Telegram
          </div>
          <div class="col-3">
            <img @click="showMenu" src="../assets/icons/Menu.svg" alt="">
          </div>
        </div>
        <div :class="menuHead">
            <div class="menu-row p-3">
              <button class="btn d-flex text-white w-100 " @click="showsetting">
                <img class="mr-2 icons" src="../assets/icons/Settings.svg" />
                <p>Settings</p>
              </button>
              <button class="btn d-flex text-white w-100 ">
                <img class="mr-2 icons" src="../assets/icons/Contacts.svg" />
                <p>Contact</p>
              </button>
              <button class="btn d-flex text-white w-100 ">
                <img class="mr-2 icons" src="../assets/icons/calls.svg" />
                <p>Calls</p>
              </button>
              <button class="btn d-flex text-white w-100 ">
                <img class="mr-2 icons" src="../assets/icons/save message.svg" />
                <p>Save messages</p>
              </button>
              <button class="btn d-flex text-white w-100" @click="showaddfren">
                <img class="mr-2 icons" src="../assets/icons/Invite friends.svg" />
                <p>Add friends</p>
              </button>
              <button class="btn d-flex text-white w-100 ">
                <img class="mr-2 icons" src="../assets/icons/FAQ.svg" />
                <p>FAQ</p>
              </button>
            </div>
        </div>
        <div class="top-search d-flex align-items-center">
          <b-nav-form class="divsearch d-flex flex-row col-9 p-0 ml-3">
            <b-icon icon="search" class="ml-2 d-none d-md-flex"></b-icon>
            <b-form-input
              size="sm"
              class="w-70"
              placeholder="Search"
            ></b-form-input>
          </b-nav-form>
          <div class="col p-0">
            <img src="../assets/icons/Plus.svg" alt="">
          </div>
        </div>
        <div class="btn-control d-flex align-items-center">
          <div class="col-12 p-0 btn-area d-flex flex-row">
            <div class="col" ref="btn1" @click="btnActive(1)">All</div>
            <div class="col btn-active" ref="btn2" @click="btnActive(2)">Important</div>
            <div class="col" ref="btn3" @click="btnActive(3)">Unread</div>
            <div class="col" ref="btn4" @click="btnActive(4)">Calls</div>
          </div>
        </div>
        <div class="btn-control d-flex align-items-center">
          <div class="col-12 p-0 chatlist-area d-flex flex-column">
            <div class="chat" v-for="(item, index) in listFriend" :key="index"  @click="openChat(item.username)">
              <div class="pp col " style="width: 60px;">
                <img src="../assets/gambar/Rectangle 3.png" alt="" srcset="">
              </div>
              <div class="col-8 d-flex flex-column " style="text-align: start">
                <p style="font-weight: bold;">
              {{item.username}}
                </p>
                <p>
                  {{item.last_chat}}
                </p>
              </div>
              <div class="col-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="chatOpen"
        class="chat-box d-sm-flex col-12 col-sm-9 d-flex justify-content-center flex-column align-items-center p-0"
      ref="hide">
        <div class="chat-head d-flex flex-row justify-content-start align-items-center p-0">
          <b-icon icon="arrow-left" class="d-block d-sm-none m-2" @click="closechat"></b-icon>
          <div class="pp " style="width: 60px;">
            <img src="../assets/gambar/Rectangle 3.png" alt="" srcset="">
          </div>
          <div class="col p-0 d-flex flex-column">
            <h6 class="m-0" style="text-align: start">{{receiver}}</h6>
            <p style="text-align: start"> online</p>
          </div>
          <div class="pp " style="width: 60px;">
            <img style="width: 20px;" src="../assets/icons/Profile menu.svg" alt="" srcset="">
          </div>
        </div>
        <div class="chat-body p-0">
          <div v-for="(item, index) in listMessage" :key="index">
            <div class="chatA mb-2" v-if="item.receiver === username">
              <p class="text-right  ml-auto mr-3"> {{item.chat}}<img class="ml-3" style="width: 40px; height: 40px;" src="../assets/gambar/Rectangle 3.png" alt="" srcset=""></p>
            </div>
            <div class="chatB mb-2" v-else>
              <p class="text-left  ml-3"><img class="mr-3" style="width: 40px; height: 40px;" src="../assets/gambar/Rectangle 3.png" alt="" srcset="">{{item.chat}}</p>
            </div>
          </div>
        </div>
        <div class="chat-input p-4">
          <b-nav-form @submit.prevent="sendMessage" class="divsearch d-sm-flex flex-row col p-0" style="height: 60px;">
            <input class="col-12"
              placeholder="input your message"
              v-model="message">
          </b-nav-form>
        </div>
      </div>
      <div v-else
        class="chat-box no-chat d-none d-sm-flex col-sm-9 d-flex justify-content-center align-items-center"
      >
        Please Select a chat to start messaging
      </div>
    </div>
  </div>
</template>

<script>
import chat from '../mixins/index'
import Profile from '../components/Profile'
import io from 'socket.io-client'
import AddFriends from '../components/AddFriends'
import Splash from '../components/Splash'

export default {
  mixins: [chat],
  data () {
    return {
      socket: io('http://localhost:3003'),
      chatOpen: false,
      receiver: '',
      profile: false,
      listUser: [],
      userProfile: [],
      menuHead: 'hide',
      message: '',
      username: this.$route.query.username,
      listMessage: [],
      lastChat: '',
      addfren: false,
      listFriend: [],
      loadSplash: true
    }
  },
  components: {
    Profile,
    AddFriends,
    Splash
  },
  methods: {
    btnActive (btnx) {
      const btn1 = this.$refs.btn1.classList
      const btn2 = this.$refs.btn2.classList
      const btn3 = this.$refs.btn3.classList
      const btn4 = this.$refs.btn4.classList
      if (btnx === 1) {
        btn1.add('btn-active')
        btn2.remove('btn-active')
        btn3.remove('btn-active')
        btn4.remove('btn-active')
      } else if (btnx === 2) {
        btn2.add('btn-active')
        btn1.remove('btn-active')
        btn3.remove('btn-active')
        btn4.remove('btn-active')
      } else if (btnx === 3) {
        btn3.add('btn-active')
        btn1.remove('btn-active')
        btn2.remove('btn-active')
        btn4.remove('btn-active')
      } else if (btnx === 4) {
        btn4.add('btn-active')
        btn1.remove('btn-active')
        btn2.remove('btn-active')
        btn3.remove('btn-active')
      }
    },
    openChat (x) {
      this.chatOpen = true
      this.receiver = x
      console.log(x)
      this.listMessage = []
      this.socket.emit('open-chat', {
        sender: this.username,
        receiver: this.receiver
      })
    },
    closechat () {
      this.chatOpen = false
    },
    showMenu () {
      if (this.menuHead === 'block') {
        this.menuHead = 'hide'
      } else {
        this.menuHead = 'block'
      }
    },
    showsetting () {
      this.profile = true
      this.menuHead = 'hide'
    },
    showaddfren () {
      this.addfren = true
      this.menuHead = 'hide'
    },
    sendMessage () {
      this.socket.emit('send-message', {
        sender: this.username,
        receiver: this.receiver,
        message: this.message
      })
      this.message = ''
    },
    addFriends (a) {
      this.socket.emit('add-friend', {
        profile: this.username,
        friend: a
      })
    }
  },
  mounted () {
    this.socket.emit('get-user')
    this.socket.on('list-user', (data) => {
      const username = this.$route.query.username
      this.listUser = []
      data.forEach(e => {
        if (e.username === username) {
          this.userProfile = e
        } else {
          this.listUser.push(e)
        }
      })
    })
    this.socket.emit('join-room', {
      user: this.username
    })
    this.socket.on('list-message', (data) => {
      if (data.length < 1) {
        this.listMessage = []
      } else {
        this.listMessage = []
        this.listMessage = data
        const lastIndex = this.listMessage.length - 1
        // this.lastChat = this.listMessage[lastIndex].chat
        this.listUser.map((e) => {
          e.newChat = this.listMessage[lastIndex].chat
        })
      }
    })
    this.socket.emit('get-friend', {
      profile: this.username
    })
    this.socket.on('list-friend', (data) => {
      this.listFriend = data
    })
    setTimeout(() => {
      this.loadSplash = false
    }, 2000)
  }
}
</script>

<style scoped>
* {
  padding: 0px;
}
.hide{
  display: none;
}
.block{
  display: block;
  position: absolute;
  background: #7E98DF;
  z-index: 8;
  border-radius: 30px 5px 30px 30px;
  right: 30px;
  top: 60px;
}
.menu-row {
  top: -10px;
}
.container-fluid {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  overflow: hidden;
}
.hide {
  left: -100%;
}
.listchat-box, .chat-box {
  width: 100vh;
}
.listchat-box {
  background: #FFF;
}
.top-title {
  height: 80px;
font-size: 29px;

color: #7E98DF;
}
.top-search {
  height: 50px;
}
.chat-box {
  background: #FAFAFA;
}
.divsearch {
  background: #FAFAFA;
  border-radius: 15px;
}
.divsearch input {
  width: 80%;
  background: none;
  border: none;
}
.btn-area {
  overflow-x: scroll;
  overflow-y: hidden;
}
.btn-area::-webkit-scrollbar {
  height: 3px;
  width: 0px;
  background: none;
}
.btn-area::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.btn-area div.col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  height: 50px;
}
.btn-active {
  background: #7E98DF;
  border-radius: 20px;
  color: white;
}
.chat {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 10px 0px;
  cursor: pointer;
}
.chatlist-area {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 180px);
}
.chatlist-area::-webkit-scrollbar {
  width: 3px;
  background: none;
}
/* Handle on hover */
.chatlist-area::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.pp img {
  height: 40px;
}
p{
  padding: 0;
  margin: 0;
}
.chat-head {
  width: 100%;
  height: 120px;
  background:white;
  z-index: 2;
}
.chat-body {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #FAFAFA;
}
.chat-body::-webkit-scrollbar {
  width: 3px;
  background: none;
}
/* Handle on hover */
.chat-body::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.chat-input {
  width: 100%;
  height: 120px;
  background: white;
  padding: 20px;
}
.icons{
  width: 20px;
  height: auto;
}
.chatA {
  height: 100%;
  width: 100%;
}
.chatA p {
  width: max-content;
  padding: 10px;
  border-radius: 10px 10px 0px 10px;
  background: white;
  max-width: 600px;
  overflow: hidden;
}
.chatB p {
  color: white;
  background:  #7E98DF;
  width: max-content;
  padding: 10px;
  border-radius: 10px 10px 10px 0px;
  max-width: 600px;
  overflow: hidden;

}
.chatB {
  height: 100%;
  width: 100%;
}
@media (max-width: 576px) {
  .chat-box {
    position: absolute;
    height: 100vh;
}
.chat-body {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #FAFAFA;
}
.no-chat {
  display: none !important;
}
}
</style>
