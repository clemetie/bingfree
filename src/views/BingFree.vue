<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentSection = ref(""); // 예: 'intro', 'check' 등

// 왼쪽 사이드
// 스크롤
const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

//viewmore
const sectionMap = {
  intro: "/intro",
  check: "/check",
  review: "/review",
  reserv: "/reserv",
};

let observer;

const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      currentSection.value = entry.target.id; // id가 'intro', 'check' 등일 것
    }
  });
};

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    threshold: 0.6,
  });

  Object.keys(sectionMap).forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

const goToDetail = () => {
  const path = sectionMap[currentSection.value];
  if (path) {
    router.push(path); // 👉 상세 페이지 이동
  }
};

// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// main-review 브랜드 로고 배열
const brandLogos1 = [
  "/review/mondrian_logo.png",
  "/review/kimteacher_logo.png",
  "/review/coopang_logo.png",
  "/review/kyobo_logo.png",
  "/review/1000cc-coffee_logo.png",
  "/review/jinair_logo.png",
  "/review/fastfive_logo.png",
  "/review/naver_logo.png",
  "/review/sono_logo.png",
  "/review/nh_logo.png",
];
const brandLogos2 = [
  "/review/megabox_logo.png",
  "/review/cj_logo.png",
  "/review/delivery_logo.png",
  "/review/megacoffee_logo.png",
  "/review/hyundai_logo.png",
  "/review/palgakdo_logo.png",
  "/review/nexen tire_logo.png",
  "/review/hdc_logo.png",
  "/review/seoul dragon city_logo.png",
  "/review/nexon_logo.png",
];
</script>

<template>
  <!-- 오른쪽 사이드 (예약, 챗봇 등) -->
  <div class="side">
    <div>
      <router-link to="/reservation" class="sideBtn reservBtn main-icon-drop">
        <img src="/images/calendar_blue.png" alt="캘린더" />
        예약하기
      </router-link>
    </div>
    <div class="sideBtn main-icon-drop"><img src="/images/chabot.png" alt="챗봇이미지" />챗봇&nbsp&nbsp</div>
    <div class="goTop main-icon-drop" @click="scrollToTop">↑</div>
  </div>
  <!-- 왼쪽 사이드 (섹션이동, 더보기) -->
  <ul class="sidesection">
    <li @click="scrollToSection('intro')" :style="{ color: currentSection === 'intro' ? '#1456fd' : '#e9ff54' }">
      {{ currentSection === "intro" ? "●" : "○" }} 빙프리란?
    </li>
    <li @click="scrollToSection('check')" :style="{ color: currentSection === 'check' ? '#1456fd' : '#e9ff54' }">
      {{ currentSection === "check" ? "●" : "○" }} 요금 안내
    </li>
    <li @click="scrollToSection('review')" :style="{ color: currentSection === 'review' ? '#1456fd' : '#e9ff54' }">
      {{ currentSection === "review" ? "●" : "○" }} 고객 리뷰
    </li>
    <li @click="scrollToSection('reserv')" :style="{ color: currentSection === 'reserv' ? '#1456fd' : '#e9ff54' }">
      {{ currentSection === "reserv" ? "●" : "○" }} 예약하기
    </li>
    <li>
      <button class="viewmore" @click="goToDetail">ViewMore →</button>
    </li>
  </ul>
  <!-- 비주얼 스와이프 -->
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
            <router-link to="/BingPrime" class="main-h2 app" style="color: #1456fd">App 다운로드 → </router-link>
            <router-link to="/BingPrime" class="main-h4 phone" style="color: #e9ff54">App 다운로드</router-link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <!-- 메인 섹션 빙프리란(수현) -->
  <section class="introBing" id="intro">빙프리란</section>
  <!-- 메인 섹션 요금안내(채연) -->
  <section class="check" id="check">요금안내</section>
  <!-- 메인 섹션 고객리뷰(지수) -->
  <section class="review" id="review">
    <section class="fullpage review">
      <div class="review-container inner">
        <div class="review-title-box">
          <p class="main-h1" style="color: #212121; margin-bottom: 40px">깨끗한 얼음, 신뢰받는 선택</p>
          <p style="font-size: 24px; font-weight: 500; line-height: 1.4; color: #212121; margin-bottom: 80px">
            고객이 안심하고 찾는 매장, 가맹점이 믿고 맡기는 위생 관리! <br />
            직접 경험한 고객님들의 리얼 후기를 확인하세요.
          </p>
        </div>
        <div class="review-logo-box">
          <div class="review-logo-top">
            <swiper
              :modules="[Autoplay, FreeMode]"
              :loop="true"
              :slides-per-view="'auto'"
              :space-between="30"
              :autoplay="{ delay: 0, disableOnInteraction: false }"
              :speed="7000"
              :free-mode="true"
              :free-mode-momentum="false"
              class="w-full h-40">
              <SwiperSlide v-for="(logo, index) in brandLogos1" :key="index" :style="{ width: '200px' }">
                <img :src="logo" alt="브랜드 로고" class="h-8 !w-16 object-contain" />
              </SwiperSlide>
            </swiper>
          </div>
          <div class="review-logo-bottom">
            <swiper
              :modules="[Autoplay, FreeMode]"
              :loop="true"
              :slides-per-view="'auto'"
              :space-between="30"
              :autoplay="{ delay: 0, reverseDirection: true, disableOnInteraction: false }"
              :speed="7000"
              :free-mode="true"
              :free-mode-momentum="false"
              class="w-full h-40">
              <SwiperSlide v-for="(logo, index) in brandLogos2" :key="index" :style="{ width: '200px' }">
                <img :src="logo" alt="브랜드 로고" class="h-12 !w-14 object-contain" />
              </SwiperSlide>
            </swiper>
          </div>
        </div>
        <div class="review-box-total">
          <div class="review-box">
            <p class="review-box-txt">
              “바쁜 일정으로 직접 청소할 시간이 부족했는데 청소 후 리포트 서비스로 청결도 신뢰가 가네요. 정기 관리까지
              해주셔서 정말 편하고 만족스럽습니다!”
            </p>
            <div class="review-customer">
              <img src="/public/review/starbucks_icon.png" alt="스타벅스 아이콘" />
              <p style="font-size: 15px; font-weight: 700; color: #424242">스타벅스 중앙로점</p>
            </div>
          </div>
          <div class="review-box">
            <p class="review-box-txt">
              “눈에 보이지 않아 더러운지 몰랐는데, 지속적인 관리가 필요함을 느꼈습니다. 빙프라임 구독 서비 스로 비용도
              절감하고 친환경 세제까지 증정 받아 좋았습니다.”
            </p>
            <div class="review-customer">
              <img src="/public/review/customer_icon.png" alt="고객 아이콘" />
              <p style="font-size: 15px; font-weight: 700; color: #424242">이*현 님</p>
            </div>
          </div>
          <div class="review-box">
            <p class="review-box-txt">
              "제빙기 청소 서비스 정말 만족스럽습니다! 얼음 맛과 기계 상태가 확연히 개선되어 다시 깨끗하고 신선한 얼음을
              사용할 수 있게 됐어요. 정기구독 서비스 가입했답니다."
            </p>
            <div class="review-customer">
              <img src="/public/review/megabox_icon.png" alt="메가박스 아이콘" />
              <p style="font-size: 15px; font-weight: 700; color: #424242">메가박스 대구점</p>
            </div>
          </div>
          <div class="review-box">
            <p class="review-box-txt">
              “쉽고 간편하게 예약할 수 있어 편리했어요! 24시간 서비스로 시간에 구애 받지 않고 원하는 시간에 방문
              해주셔서 자주 이용할 것 같아요. 주변에도 추천해야겠어요 :)”
            </p>
            <div class="review-customer">
              <img src="/public/review/customer_icon.png" alt="고객 아이콘" />
              <p style="font-size: 15px; font-weight: 700; color: #424242">김*수 님</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
  <!-- 메인 섹션 예약하기(효빈) -->
  <section class="reservation" id="reserv">예약하기</section>
  <!-- 메인 섹션 하단입니다 -->
  <section class="footer" style="background-color: pink"></section>
</template>

<style lang="scss" scoped></style>
