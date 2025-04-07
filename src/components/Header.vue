<script setup></script>
<template>
  <header>
    <div class="inner">
      <router-link to="/"
        ><img src="/images/main-logo.png" alt=""
      /></router-link>
      <nav>
        <router-link to="/IntroBing">빙프리란? </router-link>
        <router-link to="/Check">요금안내</router-link>
        <router-link to="/Review">고객리뷰</router-link>
        <router-link to="/Reservation">예약하기</router-link>
      </nav>
    </div>
  </header>
</template>
<style lang="scss" scoped>
header {
  margin-top: 40px;
  margin-bottom: -80px;
  width: 100%;
  height: 80px;
  position: relative;
  z-index: 99;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 180px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 100px;
    }
    nav a {
      color: #111;
      font-weight: bold;
      margin-left: 70px;
    }
  }
}
</style>
