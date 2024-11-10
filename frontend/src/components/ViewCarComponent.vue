<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue';
import CarComponent from './CarComponent.vue';

const CarID = ref(0)

defineProps({
  userId: Number
})


</script>

<template>
  <Sidebar :userId="userId" @showcar="(carID) => { CarID = carID }" />
  <CarComponent :CarID="CarID" />
</template>

<style scoped>
section {
  width: 85vw;
  height: 92vh;
}
</style>
