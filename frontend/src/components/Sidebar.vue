<script setup>
import { ref, watch } from 'vue'
const dataArray = ref("")

defineEmits(["showcar"])

const data = defineProps({
  userId: Number
})

watch(data, (oldData, newData) => {
  reloadUsersCars()
})

const modalOpen = ref(false)
const Brand = ref("")
const Model = ref("")
const Year = ref(0)
const StartDate = ref("2024-01-01")
const EndDate = ref("2024-01-01")
const ServiceDate = ref("2024-01-01")
const ServiceType = ref("")
const ServiceComment = ref("")
const Workshop = ref("")
const ImageURL = ref("")
let currentCarId = 0

function submitCar() {
  fetch("/api/cars", {
    body: '{ "Brand": ' + JSON.stringify(Brand.value) + ', "Model": ' + JSON.stringify(Model.value) + ', "Year": ' + JSON.stringify(Year.value) + '}',
    headers: { "Content-type": "application/json" },
    method: "POST"
  })
    .then(res => res.json())
    .then((data) => {
      submitOwnership(data.insertId)
      currentCarId = data.insertId
    })
}

function submitOwnership(carId) {
  fetch("/api/ownership", {
    body: '{ "UserID": ' + JSON.stringify(data.userId) + ', "CarID": ' + JSON.stringify(carId) + ', "StartDate": ' + JSON.stringify(StartDate.value) + ', "EndDate": ' + JSON.stringify(EndDate.value) + '}',
    headers: { "Content-type": "application/json" },
    method: "POST"
  })
    .then(res => res.json())
    .then((data) => { submitServiceHistory(carId) })
}

function submitServiceHistory(carId) {
  fetch("/api/servicehistory", {
    body: '{ "CarID": ' + JSON.stringify(carId) + ', "ServiceDate": ' + JSON.stringify(ServiceDate.value) + ', "TypeOfService": ' + JSON.stringify(ServiceType.value) + ', "Comment": ' + JSON.stringify(ServiceComment.value) + ', "Workshop": ' + JSON.stringify(Workshop.value) + '}',
    headers: { "Content-type": "application/json" },
    method: "POST"
  })
    .then(res => res.json())
    .then((data) => { submitImages(carId) })
}

function submitImages(carId) {
  fetch("/api/images", {
    body: '{ "ImageURL": ' + JSON.stringify(ImageURL.value) + ', "CarID": ' + JSON.stringify(carId) + '}',
    headers: { "Content-type": "application/json" },
    method: "POST"
  })
    .then(res => res.json())
    .then((data) => { reloadUsersCars() })
}

function reloadUsersCars() {
  dataArray.value = []
  fetch("/api/ownership?UserID=" + data.userId)
    .then(res => res.json())
    .then((data) => {
      data.forEach(item => {
        fetch("/api/cars?CarID=" + item.CarID)
          .then(res => res.json())
          .then((data) => {
            dataArray.value.push(data)[item]
            console.log(dataArray.value)
          })
      });
    })
}

function submitAll() {
  modalOpen.value = !modalOpen.value
  submitCar()
}
</script>

<template>
  <section v-if="modalOpen" class="modalBackground">
    <div class="modalContainer">
      <div>Märke:<input type="text" v-model="Brand"></div>
      <div>Modell:<input type="text" v-model="Model"></div>
      <div>Årtal:<input type="text" v-model="Year"></div>
      <div>Började äga:<input type="date" v-model="StartDate"></div>
      <div>Slutade äga:<input type="date" v-model="EndDate"></div>
      <div>Service datum:<input type="date" v-model="ServiceDate"></div>
      <div>Service typ:<input type="text" v-model="ServiceType"></div>
      <div>Verkstad:<input type="text" v-model="Workshop"></div>
      <div>Länk till bild:<input type="text" v-model="ImageURL"></div>
      <div><button @click="submitAll">Lägg till</button></div>
      <div class="exit-button"><button @click="() => { modalOpen = !modalOpen }">X</button></div>
    </div>
  </section>
  <section class="sidebar">
    <button v-for="item in dataArray" @click="$emit('showcar', item[0].CarID)">{{ item[0].Brand }} {{ item[0].Model }}
      {{ item[0].Year }}</button>
    <button @click="() => { modalOpen = !modalOpen }">Lägg till en bil {{ userId }}</button>
  </section>
</template>

<style scoped>
.sidebar {
  height: 92vh;
  width: 15vw;
  background-color: whitesmoke;
  z-index: 1;
  border-right: 2px solid lightgray;
}

.sidebar>button {
  width: 100%;
  height: 8vh;
  border: none;
}

.sidebar>button:hover {
  background-color: lightgray;
}

.modalBackground {
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
  position: relative;
  width: 20vw;
  height: 40vh;
  border: 2px solid gray;
  border-radius: 16px;
  overflow: hidden;
}

.modalContainer>div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 10%;
}

input {
  height: 50%;
  width: 50%;
  border: 1px solid black;
  border-radius: 4px;
}

input:focus {
  border: 2px solid black;
}

button {
  width: 50%;
  height: 75%;
  border-radius: 4px;
  border: 1px solid black;
}

.exit-button {
  position: absolute;
  top: 0;
  right: 8px;
  width: 32px;
  height: 32px;
  border: none;
}

.exit-button>button {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 32px;
}
</style>

<!--
https://file.kelleybluebookimages.com/kbb/base/house/2006/2006-Audi-A6-FrontSide_AUA6SED061_505x375.jpg?downsize=750:*
-->
