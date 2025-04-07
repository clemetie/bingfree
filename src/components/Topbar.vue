<script setup></script>
<template>
  <div class="topbar">
    <router-link to="/">빙프리 홈페이지 </router-link>
    <router-link to="/BingPrime">빙프라임</router-link>
    <router-link to="/FreeMall">프리몰</router-link>
  </div>
</template>
<style scoped>
.topbar {
  position: fixed; /* 또는 absolute / fixed */
  z-index: 100;
  width: 100%;
  height: 40px;
  top: 0;
  background-color: black;
  text-align: center;
}
.topbar a {
  width: 250px;
  margin: 0 5px;
  display: inline-block;
  background-color: #1456fd;
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
