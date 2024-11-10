<script setup>
import { ref } from 'vue'

defineProps({
  data: Array
})
const tempArray = ["1", "2", "3"]
const modalOpen = ref(false)
</script>

<template>
  <section class="modalBackground">
    <div class="modalContainer">
      <div>Märke:<input type="text"></div>
      <div>Modell:<input type="text"></div>
      <div>Årtal:<input type="text"></div>
      <div>Började äga:<input type="date"></div>
      <div>Slutade äga:<input type="date"></div>
      <div>Service typ:<input type="date"></div>
      <div>Service datum:<input type="date"></div>
      <div>Verkstad:<input type="date"></div>
      <div>Länk till bild:<input type="text"></div>
    </div>
  </section>
  <section class="sidebar">
    <button v-for="item in data">{{ item }}</button>
    <button @click="openModal">Lägg till en bil</button>
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
  width: 20vw;
  height: 40vh;
}
</style>

<!--
https://file.kelleybluebookimages.com/kbb/base/house/2006/2006-Audi-A6-FrontSide_AUA6SED061_505x375.jpg?downsize=750:*
-->
