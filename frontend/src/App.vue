<script setup>
import { ref } from 'vue'
import ViewCarComponent from './components/ViewCarComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import ProfileComponent from './components/ProfileComponent.vue';
const username = ref("")
const loggedIn = ref(false)
const userId = ref(0)



function getUserIdMySQL(args) {
  fetch("/api/users?username=" + args)
    .then(res => res.json())
    .then((data) => {
      userId.value = data[0].UserID
      username.value = data[0].Username
    })
}

function addUserMySQL(args) {
  fetch("/api/users", {
    body: '{ "username": ' + JSON.stringify(args) + '}',
    headers: { "Content-type": "application/json" },
    method: "POST"
  })
    .then(res => res.json())
    .then((data) => { userId.value = data.insertId })
}

function registerUser(args) {
  username.value = args
  loggedIn.value = true
  addUserMySQL(args)
}

function login(args) {
  username.value = args
  loggedIn.value = true
  getUserIdMySQL(args)
}

function logout() {
  username.value = ""
  loggedIn.value = false
  userId.value = 0
}

</script>

<template>
  <LoginComponent v-if="!loggedIn" @login="(args) => { login(args) }" @register="(args) => { registerUser(args) }" />
  <nav>
    <div>Bilhistorik.se</div>
    <ProfileComponent :username="username" @logout="logout" :userId="userId" @updateuser="(e) => { getUserIdMySQL(e) }"
      @userremoved="logout" />
  </nav>
  <main>
    <ViewCarComponent :userId="userId" />
  </main>
</template>

<style scoped>
nav {
  height: 8vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 64px;
  border-bottom: 2px solid black;
}

nav>div {
  display: flex;
  justify-content: flex-end;
  width: 58%;
}

main {
  display: flex;
  width: 100vw;
  height: 92vh;
  overflow: hidden;
}
</style>
