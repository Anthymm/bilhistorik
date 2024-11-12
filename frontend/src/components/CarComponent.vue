<script setup>

import { watch, ref } from 'vue';
const data = defineProps({
  userId: Number,
  carID: Number
})

const CarArray = ref([])
const OwnershipArray = ref([])
const ServiceArray = ref([])
const ImageArray = ref([])

watch(data, (oldVal, newVal) => {
  fetchCar()
})

function fetchCar() {
  fetch("/api/cars?CarID=" + data.carID)
    .then(res => res.json())
    .then((data) => {
      CarArray.value = [...data]
      fetchOwnership()
    })
}

function fetchOwnership() {
  fetch("/api/ownership?UserID=" + data.userId)
    .then(res => res.json())
    .then((data) => {
      OwnershipArray.value = [...data]
      fetchService()
    })
}

function fetchService() {
  fetch("/api/servicehistory?CarID=" + data.carID)
    .then(res => res.json())
    .then((data) => {
      ServiceArray.value = [...data]
      console.log(data)
      fetchImages()
    })
}

function fetchImages() {
  fetch("/api/images?CarID=" + data.carID)
    .then(res => res.json())
    .then((data) => {
      ImageArray.value = [...data]
    })
}


</script>

<template>
  <section>
    <section class="carHeader">
      <div v-for="item in CarArray">
        <div>{{ item.Brand }}</div>
        <div>{{ item.Model }}</div>
        <div>{{ item.Year }}</div>
      </div>
    </section>
    <section class="Ownership">
      <div v-for="item in OwnershipArray" v-show="item.CarID == data.carID">
        <div>{{ item.StartDate.substr(0, 10) }}</div>
        <span>&#8594;</span>
        <div>{{ item.EndDate.substr(0, 10) }}</div>
      </div>
    </section>
    <section class="Service">
      <div v-for="item in ServiceArray">
        <div>Service Datum: {{ item.ServiceDate.substr(0, 10) }}</div>
        <div>Service Typ: {{ item.TypeOfService }}</div>
        <div>Service Verkstad: {{ item.Workshop }}</div>
      </div>
    </section>
    <section class="ImageSection">
      <div v-for="item in ImageArray">
        <img :src="item.ImageURL" alt="Bild på bil">
      </div>
    </section>
  </section>
</template>

<style scoped>
section {
  width: 85vw;
  height: 92vh;
}

.carHeader {
  width: 100%;
  height: 20vh;
  border-bottom: 2px solid lightgray
}

.carHeader>div {
  width: 100%;
  height: 100%;
  display: flex;
}

.carHeader>div>div {
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
}

.Ownership {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid lightgray;
}

.Service {
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid lightgray;
}

.ImageSection {
  width: 100%;
  height: 32vh;
  display: flex;
  justify-content: center;
}

.Ownership>div>span {
  font-size: 48px;
}

.Ownership>div {
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.Service>div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ImageSection>div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.Ownership>div>div {
  font-size: 48px;
}

.Service>div>div {
  font-size: 48px;
}

.ImageSection>div>img {
  border-radius: 4px;
}
</style>
