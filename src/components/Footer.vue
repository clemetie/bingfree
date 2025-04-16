<script setup></script>
<template>
  <footer class="footer-container">
    <div class="footer-site-name">
      <img src="/public/images/footer1.png" alt="footer1" />
    </div>
    <div id="appr">
      <div class="footer-content">
        <!-- 좌측 영역: 로고 & "Contact us"-->
        <div class="footer-left">
          <!-- 로고 -->
          <div class="footer-logo">
            <router-link to="/"><img src="/public/images/footer_logo.png" alt="footer_logo" /></router-link>
          </div>
          <div class="footer-txt2">
            <!-- 연락처 -->
            <div class="footer-contact">
              <h3 class="footer-contact-title" style="color: #e9ff54">Contact us</h3>
              <p class="footer-contact-phone">064-739-6155</p>
              <p class="footer-contact-email">bingfree.korea@gmail.com</p>
            </div>
            <!-- 우측 영역: 주소 & 영업시간 -->
            <div class="footer-right">
              <div class="footer-address">
                <h3 style="color: #e9ff54">address</h3>
                <p class="footer-txt3">대구시 중구 중앙대로 394<br />제일빌딩 4F</p>
              </div>
              <div class="footer-hours">
                <h3 style="color: #e9ff54">cs opening hours</h3>
                <p class="footer-txt4">Monday - Friday <br />09:00 AM - 18:00 PM</p>
              </div>
            </div>
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
  height: 100%;
  margin: 0;
  font-family: "Pretendard", sans-serif;
}
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
/* 푸터 전체 컨테이너 */
.footer-container {
  caret-color: transparent;
  background-color: #1456fd;
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
.footer-left {
  display: flex;
  position: absolute;
  top: 20%;
  left: 10%;
  width: 100%;
  gap: 15%;
}
/* 로고 */
.footer-logo {
  width: 250px;
  display: block;
}
.footer-logo img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain; /* 또는 cover */
}
.footer-right {
  width: 1000px;
  padding-top: 10%;
  display: flex;
  gap: 18%;
  /* background-color: pink; */
}
/* 폰트 컬러, 사이즈 */
.footer-contact-title {
  font-weight: 500;
  font-size: 24px;
  padding-bottom: 3%;
}
.footer-address h3,
.footer-hours h3 {
  font-weight: 500;
  font-size: 24px;
}

.footer-contact-phone,
.footer-contact-email {
  color: rgba(255, 255, 255, 0.7);
  font-size: 50px;
  font-weight: 500;
}
.footer-txt3 {
  padding-top: 7%;
  color: #fff;
  font-size: 34px;
  font-weight: 500;
}
.footer-txt4 {
  padding-top: 15%;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

/* 모바일 */
@media (max-width: 767px) {
}
/* 태블릿 */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 푸터 전체 컨테이너 */
  .footer-container {
    caret-color: transparent;
    background-color: #1456fd;
    width: 100%;
    height: 700px;
    position: relative;
    overflow: hidden;
  }
  /* bingfree 투명 이미지 */
  .footer-site-name {
    width: 600px;
    padding-left: 30px;
    /* background-color: pink; */
    position: absolute;
    left: 5%;
    top: -1%;
  }
  .footer-site-name img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: contain; /* 또는 cover */
  }
  .footer-left {
    display: block;
    position: absolute;
    top: 15%;
    left: 10%;
    width: 100%;
    gap: 15%;
  }
  .footer-right {
    display: block;
    gap: 18%;
    padding-top: 03%
  }
  .footer-logo {
    width: 200px;
    padding-bottom: 3%;
    display: block;
  }
  /* font style */
  .footer-contact-title {
    font-size: 18px;
  }
  .footer-address h3,
  .footer-hours h3 {
    font-weight: 500;
    font-size: 18px;
  }

  .footer-contact-phone,
  .footer-contact-email {
    color: rgba(255, 255, 255, 0.7);
    font-size: 34px;
    font-weight: 500;
  }
  .footer-txt3 {
    padding-top: 3%;
    padding-bottom: 3%;
    color: #fff;
    font-size: 34px;
    font-weight: 500;
  }
  .footer-txt4 {
    padding-top: 2%;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.7;
  }
}
</style>
