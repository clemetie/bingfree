<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
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
</script>

<template>

  </div>
  <!-- 메인 섹션 빙프리란(수현) -->
  <section class="introBing" id="intro">빙프리란</section>
  <!-- 메인 섹션 요금안내(채연) -->
  <section class="check" id="check">요금안내</section>
  <!-- 메인 섹션 고객리뷰(지수) -->
  <section class="review" id="review">리뷰</section>
  <!-- 메인 섹션 예약하기(효빈) -->
  <section class="reservation" id="reserv">예약하기</section>
  <!-- 메인 섹션 하단입니다 -->
  <section class="footer" style="background-color: pink"></section>
</template>

<style lang="scss" scoped></style>
