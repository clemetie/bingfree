<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentSection = ref("visual"); // 예: 'intro', 'check' 등

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

// 추가: 스크롤로 visual 영역 감지
const handleScroll = () => {
  if (window.scrollY < 200) {
    currentSection.value = "visual";
  }
};

window.addEventListener("scroll", handleScroll);

onMounted(() => {
  observer = new IntersectionObserver(handleIntersect, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -20% 0px", // 아래쪽에서 조금 일찍 감지
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
  console.log("✅ 현재 섹션:", currentSection.value);
};
</script>

<template>
  <!-- 오른쪽 사이드 (예약, 챗봇 등) -->
  <div class="side">
    <div>
      <router-link
        to="/reservation"
        class="sideBtn reservBtn main-icon-drop"
        :class="{ compact: currentSection !== 'visual' }"
      >
        <img src="/images/calendar_blue.png" alt="캘린더" />
        <span class="text">예약하기</span>
      </router-link>
    </div>
    <div
      class="sideBtn main-icon-drop"
      :class="{ compact: currentSection !== 'visual' }"
    >
      <img
        src="/images/chabot.png"
        alt="챗봇이미지"
        :class="{ compact: currentSection !== 'visual' }"
      />
      <span class="text">챗봇&nbsp;&nbsp;</span>
    </div>
    <div class="goTop main-icon-drop" @click="scrollToTop">↑</div>
  </div>
  <!-- 왼쪽 사이드 (섹션이동, 더보기) -->
  <ul class="sidesection">
    <li
      @click="scrollToSection('intro')"
      :style="{ color: currentSection === 'intro' ? '#1456fd' : '#e9ff54' }"
    >
      {{ currentSection === "intro" ? "●" : "○" }} 빙프리란?
    </li>
    <li
      @click="scrollToSection('check')"
      :style="{ color: currentSection === 'check' ? '#1456fd' : '#e9ff54' }"
    >
      {{ currentSection === "check" ? "●" : "○" }} 요금 안내
    </li>
    <li
      @click="scrollToSection('review')"
      :style="{ color: currentSection === 'review' ? '#1456fd' : '#e9ff54' }"
    >
      {{ currentSection === "review" ? "●" : "○" }} 고객 리뷰
    </li>
    <li
      @click="scrollToSection('reserv')"
      :style="{ color: currentSection === 'reserv' ? '#1456fd' : '#e9ff54' }"
    >
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
              style="color: #1456fd"
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
  </div>
  <!-- 메인 섹션 빙프리란(수현) -->
  <section class="introBing" id="intro">빙프리란</section>
  <!-- 메인 섹션 요금안내(채연) -->
  <section class="check" id="check">요금안내</section>
  <!-- 메인 섹션 고객리뷰(지수) -->
  <section class="review" id="review">리뷰</section>
  <!-- 메인 섹션 예약하기(효빈) -->
  <section
    class="reservation"
    id="reserv"
    :class="{ visible: currentSection === 'reserv' }"
  >
    <div class="inner">
      <div class="reserv_chat">
        <img
          class="reserv_phone"
          src="/reservation/reservmain/reservation_phone.png"
          alt="휴대폰 화면"
        />
        <div class="chat_bing">
          <div class="chat">
            <img
              class="reserv_pp"
              src="/reservation/reservmain/reserv_pp1.png"
              alt="사람1"
            />
            <div class="bubble left">
              한 번에 <b> 여러 가맹점 예약</b>도 할 수 있으려나? <br />
              청소해야할 제빙기가 많은데..
            </div>
          </div>
          <div class="bing">
            <div class="bubble right">
              그럼요! 빙프리에서는 <br />
              <b>최대 10대</b>까지 한 번에
            </div>
            <img src="/reservation/reservmain/bing.png" alt="빙프리" />
          </div>
          <div class="chat">
            <img
              class="reserv_pp"
              src="/reservation/reservmain/reserv_pp2.png"
              alt="사람2"
            />
            <div class="bubble left">
              <b>새벽에도 청소</b> 가능한가? <br />
              24시간 영업이라 낮에는 시간이 없는데…
            </div>
          </div>
          <div class="bing">
            <div class="bubble right">
              그럼요! 빙프리에서는 <br />
              <b>24시간</b> 언제나 가능해요!
            </div>
            <img src="/reservation/reservmain/bing.png" alt="빙프리" />
          </div>
          <div class="chat">
            <img
              class="reserv_pp"
              src="/reservation/reservmain/reserv_pp3.png"
              alt="사람3"
            />
            <div class="bubble left">
              혼자 사는 집이라 남성 기사님은 좀 불안한데 .. <br />
              <b>여성 기사님으로 요청</b> 할 수 있으려나?
            </div>
          </div>
          <div class="bing">
            <div class="bubble right">
              네! 빙프리에서는 <br />기사님 <b>성별을 선택할</b>수 있어요!
            </div>
            <img src="/reservation/reservmain/bing.png" alt="빙프리" />
          </div>
        </div>

        <router-link to="/reservation" class="fast_reserv">
          빠른 예약하기
        </router-link>
        <img
          class="fast_hand"
          src="/reservation/reservmain/resrvation_hand.png"
          alt="손"
        />
      </div>
    </div>
  </section>
  <!-- 메인 섹션 하단입니다 -->
  <section class="footer" style="background-color: pink"></section>
</template>

<style lang="scss" scoped></style>
