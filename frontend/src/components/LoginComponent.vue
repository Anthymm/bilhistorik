<script setup>
import { ref } from 'vue'

const emit = defineEmits(["login", "register"])

const usernameInput = ref("")
const passwordInput = ref("")
const loginSelected = ref(true)

function register() {
  fetch("/api/registerUser?data=" + usernameInput.value + " " + passwordInput.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.data == "success") {
        emit("register", usernameInput.value)
      }
    })
}

function login() {
  fetch("/api/loginUser?data=" + usernameInput.value + " " + passwordInput.value)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.data == "success") {
        emit("login", usernameInput.value)
      }
    })
}
</script>

<template>
  <section class="login-wrapper">
    <div class="login-container" v-if="loginSelected">
      <div>Väkommen till bilhistorik, var vänlig och logga in!</div>
      <div class="login-input">
        <div>Användarnamn: <input type="text" v-model="usernameInput"></div>
        <div>Lösenord: <input type="text" v-model="passwordInput"></div>
      </div>
      <div><a @click="() => { loginSelected = !loginSelected }">Inget konto? Registrera dig istället</a>
      </div>
      <div><button @click="() => { login() }">Logga in</button></div>
    </div>
    <div class="login-container" v-else="">
      <div>Väkommen till bilhistorik, var vänlig och logga in!</div>
      <div class="login-input">
        <div>Användarnamn: <input type="text" v-model="usernameInput"></div>
        <div>Lösenord: <input type="text" v-model="passwordInput"></div>
      </div>
      <div><a @click="() => { loginSelected = !loginSelected }">Logga in istället</a></div>
      <div><button @click="() => { register() }">Registrera</button></div>
    </div>
  </section>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(166, 166, 166, 0.75);
  z-index: 11;
}

.login-container {
  border: 2px solid gray;
  border-radius: 16px;
  width: 15vw;
  height: 25vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}


.login-container>div {
  height: 25%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-input {
  display: flex;
  flex-wrap: wrap;
}

a {
  color: darkblue;
}

a:hover {
  cursor: pointer;
}

button {
  width: 50%;
  height: 40%;
  border: 2px solid gray;
  border-radius: 8px;
}
</style>
