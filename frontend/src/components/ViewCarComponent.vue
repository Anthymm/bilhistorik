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
  <Sidebar :userId="userId" @showcar="(args) => { CarID = args }" />
  <CarComponent :carID="CarID" :userId="userId" />
</template>

<style scoped>
section {
  width: 85vw;
  height: 92vh;
}
</style>
