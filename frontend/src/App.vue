<script setup>
import { ref } from 'vue'
import ViewCarComponent from './components/ViewCarComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
const username = ref("")
const loggedIn = ref(false)
const userId = ref(0)

function getUserIdMySQL(args) {
  fetch("/api/users?username=" + args)
    .then(res => res.json())
    .then((data) => { userId.value = data[0].UserID })
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

</script>

<template>
  <LoginComponent v-if="!loggedIn" @login="(args) => { login(args) }" @register="(args) => { registerUser(args) }" />
  <nav>
    <div>Bilhistorik.se</div>
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
  justify-content: center;
  align-items: center;
  font-size: 64px;
  border-bottom: 2px solid black;
}

main {
  display: flex;
  width: 100vw;
  height: 92vh;
  overflow: hidden;
}
</style>
