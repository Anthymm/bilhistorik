<script setup>
defineProps({
  data: Array
})
const tempArray = ["1", "2", "3"]
</script>

<template>
  <section class="sidebar">
    <button v-for="num in tempArray">{{ num }}</button>
    <button>Lägg till en bil</button>
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
</style>
