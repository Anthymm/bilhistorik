<script setup>
import { ref } from 'vue'

const emits = defineEmits(["logout", "updateuser", "userremoved"])

const data = defineProps({
  username: String,
  userId: Number,
})

const showProfileSettings = ref(false)
const selectedSetting = ref("")
const usernameInput = ref("")
const passwordInput = ref("")

function close() {
  selectedSetting.value = ""
}

function deleteMySQLUser() {
  fetch("/api/users?userID=" + data.userId, {
    headers: {
      "Content-type": "application/json"
    },
    method: "DELETE"
  })
}

function updateMySQLUsername() {
  fetch("/api/users?oldName=" + data.username + "&newName=" + usernameInput.value, {
    headers: { "Content-type": "application/json" },
    method: "PATCH"
  })
    .then(res => res.json())
    .then((data) => emits('updateuser', usernameInput.value))
}

function changeUsername() {
  fetch("/api/changeUserUsername?data=" + data.username + " " + usernameInput.value)
    .then(res => res.json())
    .then((data) => { updateMySQLUsername() })
  close()
}

function changePassword() {
  fetch("/api/changeUserPassword?data=" + data.username + " " + passwordInput.value)
  close()
}

function deleteAccount() {
  fetch("/api/removeUser?data=" + data.username)
    .then(res => res.json())
    .then((data) => {
      deleteMySQLUser()
      emits("userremoved")
      close()
    })
}


</script>

<template>
  <button class="profileButton" @click="showProfileSettings = !showProfileSettings">{{ username }}
    <div class="profileContainer" v-if="showProfileSettings">
      <button @click="$emit('logout')">Logga Ut</button>
      <button @click="selectedSetting = 'username'">Byt Användarnamn</button>
      <button @click="selectedSetting = 'password'">Byt Lösenord</button>
      <button @click="selectedSetting = 'account'">Ta bort konto</button>
    </div>
  </button>

  <section class="modalBackground" v-if="selectedSetting != ''">
    <div class="modalContainer" v-if="selectedSetting == 'username'">
      <div>Välj ett nytt användarnamn:</div>
      <div><input type="text" v-model="usernameInput"></div>
      <div><button @click="changeUsername">Bekräfta</button><button @click="close">Ångra</button></div>
    </div>
    <div class="modalContainer" v-else-if="selectedSetting == 'password'">
      <div>Välj ett nytt lösenord:</div>
      <div><input type="text" v-model="passwordInput"></div>
      <div><button @click="changePassword">Bekräfta</button><button @click="close">Ångra</button></div>

    </div>
    <div class="modalContainer" v-else-if="selectedSetting == 'account'">
      <div>Är du säker att du vill ta bort ditt konto? detta kan ej återgärdas</div>
      <div><button @click="deleteAccount">Ja</button><button @click="close">Nej</button></div>

    </div>

  </section>

</template>

<style scoped>
.modalBackground {
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(166, 166, 166, 0.75);
}

.modalContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 20vw;
  height: 20vh;
  border: 2px solid gray;
  border-radius: 16px;
  overflow: hidden;
}

.modalContainer>div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33%;
  font-size: 32px;
  gap: 16px;
}

.modalContainer>div>input {
  width: 50%;
  height: 25%;
  border: 2px solid gray;
  border-radius: 4px;
}

.modalContainer>div>button {
  width: 25%;
  height: 50%;
  border: 2px solid gray;
  border-radius: 4px;
}

.profileButton {
  position: relative;
  margin-right: 64px;
  padding: 8px;
  border-radius: 4px;
}

.profileContainer {
  position: absolute;
  top: 32px;
  right: 0;
  width: 10vw;
  height: 15vh;
  border: 2px solid black;
  border-radius: 4px;
}

.profileContainer>button {
  width: 100%;
  height: 25%;
  border: none
}

.profileContainer>button:hover {
  background-color: lightgray;
}
</style>
