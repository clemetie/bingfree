<script setup></script>
<template>
  <footer class="footer-container">
    <div class="footer-site-name">
      <img src="/public/images/footer1.png" alt="footer1" />
    </div>
    <div class="inner">
      <div class="footer-content">
        <!-- 좌측 영역: 로고 & "Contact us"-->
        <div class="footer-left">
          <!-- 로고 -->
          <div class="footer-logo">
            <router-link to="/"><img src="/public/images/footer_logo.png" alt="footer_logo" /></router-link>
          </div>
          <!-- 연락처 -->
          <div class="footer-contact">
            <h2 class="footer-contact-title" color="#e9ff54">Contact us</h2>
            <p class="footer-contact-phone">064-739-6155</p>
            <p class="footer-contact-email">bingfree.korea@gmail.com</p>
          </div>
        </div>

        <!-- 우측 영역: 주소 & 영업시간 -->
        <div class="footer-right">
          <div class="footer-address">
            <h3>address</h3>
            <p>대구시 중구 중앙대로 394<br />제일빌딩 4F</p>
          </div>
          <div class="footer-hours">
            <h3>cs opening hours</h3>
            <p>Monday - Friday <br />09:00 AM - 18:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
/* 공통 css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html {
  height: auto;
  font-family: "Pretendard", sans-serif;
}
.inner {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
}

/* 푸터 전체 컨테이너 */
.footer-container {
  background-color: #1456fd; /* 원하는 블루 톤으로 변경 */
  width: 100%;
  height: 700px;
  position: relative;
  overflow: hidden;
}
/* bingfree 투명 이미지 */
.footer-site-name {
  width: 798px;
  padding-left: 30px;
  /* background-color: pink; */
  position: absolute;
  right: 5%;
  top: -1%;
}
.footer-site-name img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain; /* 또는 cover */
}
/* 로고 */
.footer-logo{
    background-color: pink;
    width: 200px;
    height: 65px;
}
</style>
