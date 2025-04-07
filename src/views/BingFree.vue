<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, onUnmounted } from "vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// 스크롤 탑 기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const inMove = ref(false);
const inMoveDelay = 400;
const activeSection = ref(0);
const offsets = ref([]);
let touchStartY = 0;

/**
 * 섹션 위치 계산
 */
const calculateSectionOffsets = () => {
  offsets.value = [];
  const sections = document.getElementsByTagName("section");
  for (let section of sections) {
    offsets.value.push(section.offsetTop);
  }
};

/**
 * 마우스 휠 이벤트 처리
 */
const handleMouseWheel = (e) => {
  if (inMove.value) return;

  if (e.wheelDelta < 30) {
    moveUp();
  } else if (e.wheelDelta > 30) {
    moveDown();
  }
  e.preventDefault();
};

/**
 * 파이어폭스 전용 휠 이벤트
 */
const handleMouseWheelDOM = (e) => {
  if (inMove.value) return;

  if (e.detail > 0) {
    moveUp();
  } else {
    moveDown();
  }
};

// 이전 섹션 이동
const moveDown = () => {
  if (activeSection.value === 0) {
    window.scrollBy({ top: -120, behavior: "smooth" }); // 추가 이동
    return; // 종료
  }
  inMove.value = true;
  activeSection.value--;
  scrollToSection(activeSection.value);
};

/**
 * 다음 섹션으로 이동
 */
const moveUp = () => {
  if (activeSection.value === offsets.value.length - 1) return; // 마지막 섹션이면 종료
  inMove.value = true;
  activeSection.value++;
  scrollToSection(activeSection.value);
};

/**
 * 특정 섹션으로 이동
 */
const scrollToSection = (id) => {
  activeSection.value = id;
  inMove.value = true;

  const section = document.getElementsByTagName("section")[id];
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    inMove.value = false;
  }, inMoveDelay);
};

/**
 * 모바일 터치 이벤트 처리
 */
const touchStart = (e) => {
  touchStartY = e.touches[0].clientY;
};

const touchMove = (e) => {
  if (inMove.value) return;

  e.preventDefault();
  const currentY = e.touches[0].clientY;

  if (touchStartY < currentY) {
    moveDown();
  } else {
    moveUp();
  }

  touchStartY = 0;
};

// 이벤트 리스너 등록 & 해제
onMounted(() => {
  calculateSectionOffsets();
  window.addEventListener("DOMMouseScroll", handleMouseWheelDOM);
  window.addEventListener("mousewheel", handleMouseWheel, { passive: false });
  window.addEventListener("touchstart", touchStart, { passive: false });
  window.addEventListener("touchmove", touchMove, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener("DOMMouseScroll", handleMouseWheelDOM);
  window.removeEventListener("mousewheel", handleMouseWheel);
  window.removeEventListener("touchstart", touchStart);
  window.removeEventListener("touchmove", touchMove);
});
</script>

<template>
  <div id="app">
    <div class="visual">
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
            <img style="filter: brightness(1.2)" src="/images/web_visual02.png" alt="비주얼2" />
            <div class="txtbox inner">
              <router-link to="/BingPrime" class="main-h3" style="color: #e9ff54">빙프라임 가입하기 →</router-link>
              <p class="main-h1" style="color: #fff">
                인증 라벨 하나로 <br />
                더 강해지는 믿음
              </p>
              <p class="main-h4" style="color: #d9d9d9">깨끗한 얼음으로 더 많은 믿음을 얻으세요</p>
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
              <p class="main-h4" style="margin: 40px 0; color: #5c5c5c">#빙프리 꿀팁 #보다 쉽게</p>
              <router-link to="/BingPrime" class="main-h2 app" style="color: #1465fd">App 다운로드 → </router-link>
              <router-link to="/BingPrime" class="main-h4 phone" style="color: #e9ff54">App 다운로드</router-link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <main>
      <div class="side">
        <div>
          <router-link to="/reservation" class="sideBtn reservBtn">
            <img src="/images/calendar_blue.png" alt="캘린더" />
            예약하기
          </router-link>
        </div>
        <div class="sideBtn"><img src="/images/chabot.png" alt="챗봇이미지" />챗봇&nbsp&nbsp</div>
        <div class="goTop" @click="scrollToTop">↑</div>
      </div>
      <div class="sections-menu">
        <span
          class="menu-point"
          v-bind:class="{ active: activeSection == index }"
          v-on:click="scrollToSection(index)"
          v-for="(offset, index) in offsets"
          v-bind:key="index"
          v-title="'Go to section ' + (index + 1)">
        </span>
      </div>
      <!-- 메인 섹션 빙프리란(수현) -->
      <section class="fullpage introBing">
        <div class="introBing-wrap">
          <div class="introBing-txt1">
            <h2>제빙기 청소,왜 전문가가 필요할까요 ?</h2>
          </div>
          <div class="introBing-txt2">
            <p>제빙기의 내부는 항상 습한 환경에 있기 때문에 최소 일주일에 한번, 정기적인 관리가 필요합니다.</p>
            <p>냉각기 성분인 니켈은 관리를 하지않으면 발암 물질로 변질 될 수 있습니다.</p>
            <p>보이는게 다가 아닙니다. 제빙기 내부 수많은 물 곰팡이들, 분해 전까지는 모릅니다.</p>
            <p>더러운 얼음으로 노로 바이러스, 식중독 질병에 감염 됩니다.</p>
          </div>
        </div>
      </section>
      <!-- 메인 섹션 요금안내(채연) -->
      <section class="fullpage check"></section>
      <!-- 메인 섹션 고객리뷰(지수) -->
      <section class="fullpage review"></section>
      <!-- 메인 섹션 예약하기(효빈) -->
      <section class="fullpage reservation"></section>
      <!-- 메인 섹션 하단입니다 -->
      <section class="fullpage footer"></section>
    </main>
  </div>
</template>

<style scss scoped></style>
