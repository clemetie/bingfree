<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
</script>

<template>
  <section class="visual">
    <Swiper :modules="[Autoplay]" :loop="true" :autoplay="{ delay: 3000 }">
      <SwiperSlide>
        <div class="slide">
          <img src="/images/web_visual01.png" alt="비주얼1" />
          <div class="txtbox inner">
            <p class="main-h4" style="color: #e9ff54">제빙기 케어</p>
            <p class="main-h1" style="color: #fff">
              눈에 보이지 않아도, <br />
              우리는 알고 있어야 하니까
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="slide">
          <img
            style="filter: brightness(1.2)"
            src="/images/web_visual02.png"
            alt="비주얼2"
          />
          <div class="txtbox inner">
            <router-link to="/BingPrime" class="main-h3" style="color: #e9ff54"
              >빙프라임 가입하기 →</router-link
            >
            <p class="main-h1" style="color: #fff">
              인증 라벨 하나로 <br />
              더 강해지는 믿음
            </p>
            <p class="main-h4" style="color: #d9d9d9">
              깨끗한 얼음으로 더 많은 믿음을 얻으세요
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="slide">
          <img src="/images/web_visual03.png" alt="비주얼3" />
          <div class="txtbox inner">
            <p class="main-h1">
              제빙기를 호텔처럼, <br />
              마음을 담아 관리해드립니다
            </p>
            <p class="main-h4" style="margin: 40px 0; color: #5c5c5c">
              #빙프리 꿀팁 #보다 쉽게
            </p>
            <router-link
              to="/BingPrime"
              class="main-h2 app"
              style="color: #1465fd"
              >App 다운로드 →
            </router-link>
            <router-link
              to="/BingPrime"
              class="main-h4 phone"
              style="color: #e9ff54"
              >App 다운로드</router-link
            >
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
  <main>
    <div class="side">
      <div>
        <router-link to="/reservation" class="sideBtn reservBtn">
          <img src="/images/calendar_blue.png" alt="캘린더" />
          예약하기
        </router-link>
      </div>
      <div class="sideBtn">
        <img src="/images/chabot.png" alt="챗봇이미지" />챗봇&nbsp&nbsp
      </div>
      <div class="goTop">↑</div>
    </div>
    
  </main>
</template>

<style scoped>
.visual {
  width: 100%;
  position: absolute;
  top: 40px;
}
.slide {
  width: 100%;
  height: 1000px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.txtbox {
  position: absolute;
  top: 30%;
  left: 17.5%;
  z-index: 99;
}
.txtbox p {
  margin: 10px 0;
}
.app {
  position: relative;
}
.app::after {
  content: "";
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  background-color: #e9ff54;
  position: absolute;
  top: -70%;
  right: 0;
  z-index: -1;
}
.phone {
  position: absolute;
  top: 195px;
  left: 705px;
}
main {
  position: relative;
}
.side {
  position: fixed;
  bottom: 80px;
  right: 130px;
  z-index: 99999;
}
.side div {
  margin-bottom: 30px;
}
.side div img,
.sideBtn img {
  width: 30px;
  height: 30px;
}
.sideBtn {
  width: 180px;
  height: 80px;
  border: 2px solid #1465fd;
  border-radius: 50px;
  text-align: center;
  font-size: 22px;
  color: #1465fd;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.sideBtn a {
  color: #1465fd;
}

.goTop {
  width: 80px;
  line-height: 80px;
  background-color: #1465fd;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  float: right;
  font-size: 30px;
}
</style>
