<script setup>
import Topbar from "./components/Topbar.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div>
    <Topbar />
    <Header />

    <router-view></router-view>
  </div>
</template>

<style scoped></style>
