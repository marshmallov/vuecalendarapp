<script setup>
import Navbar from './components/Navbar.vue';
import MainContent from './pages/MainContent.vue';
import TimePicker from './components/TimePicker.vue';
// import { RouterView } from 'vue-router';
</script>

<template>

  <!-- <Navbar/> -->
  <!-- <MainContent/> -->
   <div>
    <RouterView/>
   </div>
<!-- <TimePicker/> -->
  
</template>

<style >
html,
body {
  height: 100%;
  margin: 0;
  font-family: 'Bold',
}
</style>
