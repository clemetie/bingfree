<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import "swiper/css/free-mode";
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

import { useRouter } from "vue-router";
// introbingfree영역
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/autoplay";

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
  reserv: "/reservation",
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

//  메인 섹션 빙프리란(수현)
const modules = [Pagination, Navigation, Autoplay];

// 채연 icon 이벤트
// ✅ 아이콘 표시 제어 함수
const toggleIconVisibility = () => {
  const iconContent = document.querySelector(".icon_content");
  const card2 = document.querySelector(".card2");

  if (!iconContent || !card2) return;

  const cardRect = card2.getBoundingClientRect();
  const isFlipped = card2.classList.contains("flip");
  const isInView = cardRect.top < window.innerHeight * 0.6;

  if (isFlipped && isInView) {
    iconContent.classList.add("show");
  } else {
    iconContent.classList.remove("show");
  }
};

// ✅ currentSection이 'check'일 때만 watch 작동
watch(currentSection, async (val) => {
  if (val === "check") {
    await nextTick(); // DOM 업데이트 이후 실행
    toggleIconVisibility();
  }
});

// ✅ scroll 이벤트 등록
let scrollTimeout;

const onScroll = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (currentSection.value === "check") {
      toggleIconVisibility();
    }
  }, 50);
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
// main-review 브랜드 로고 배열
const brandLogos1 = [
  "/review/mondrian_logo.png",
  "/review/kimteacher_logo.png",
  "/review/nh_logo.png",
  "/review/paradise_logo.png",
  "/review/1000cc coffee_logo.png",
  "/review/jinair_logo.png",
  "/review/fastfive_logo.png",
  "/review/naver_logo.png",
  "/review/sono_logo.png",
  "/review/coupang_logo.png",
];
const brandLogos2 = [
  "/review/megabox_logo.png",
  "/review/cj_logo.png",
  "/review/baemin_logo.png",
  "/review/hyundai_logo.png",
  "/review/mega coffee_logo.png",
  "/review/palgakdo_logo.png",
  "/review/nexen tire_logo.png",
  "/review/cgv_logo.png",
  "/review/seoul dragon city_logo.png",
  "/review/nexon_logo.png",
];

// 채연 icon 이벤트
// ✅ 아이콘 표시 제어 함수
const toggleIconVisibility = () => {
  const iconContent = document.querySelector(".icon_content");
  const card2 = document.querySelector(".card2");

  if (!iconContent || !card2) return;

  const cardRect = card2.getBoundingClientRect();
  const isFlipped = card2.classList.contains("flip");
  const isInView = cardRect.top < window.innerHeight * 0.6;

  if (isFlipped && isInView) {
    iconContent.classList.add("show");
  } else {
    iconContent.classList.remove("show");
  }
};

// ✅ currentSection이 'check'일 때만 watch 작동
watch(currentSection, async (val) => {
  if (val === "check") {
    await nextTick(); // DOM 업데이트 이후 실행
    toggleIconVisibility();
  }
});

</script>

<template>
  <!-- 오른쪽 사이드 (예약, 챗봇 등) -->
  <div class="side">
    <div>
      <router-link
        to="/reservation"
        class="sideBtn reservBtn main-icon-drop"
        :class="{ compact: currentSection !== 'visual' }">
        <img src="/images/calendar_blue.png" alt="캘린더" />
        <span class="text">예약하기</span>
      </router-link>
    </div>
    <div class="sideBtn main-icon-drop" :class="{ compact: currentSection !== 'visual' }">
      <img src="/images/chabot.png" alt="챗봇이미지" :class="{ compact: currentSection !== 'visual' }" />
      <span class="text">챗봇&nbsp;&nbsp;</span>
    </div>

    <div class="goTop main-icon-drop" @click="scrollToTop">↑</div>
  </div>
  <!-- 왼쪽 사이드 (섹션이동, 더보기) -->
  <ul class="sidesection">
    <li @click="scrollToSection('intro')" :style="{ color: currentSection === 'intro' ? '#1456fd' : '#9E9E9E' }">
      {{ currentSection === "intro" ? "●" : "○" }} 빙프리란?
    </li>
    <li @click="scrollToSection('check')" :style="{ color: currentSection === 'check' ? '#1456fd' : '#9E9E9E' }">
      {{ currentSection === "check" ? "●" : "○" }} 요금 안내
    </li>
    <li @click="scrollToSection('review')" :style="{ color: currentSection === 'review' ? '#1456fd' : '#9E9E9E' }">
      {{ currentSection === "review" ? "●" : "○" }} 고객 리뷰
    </li>
    <li @click="scrollToSection('reserv')" :style="{ color: currentSection === 'reserv' ? '#1456fd' : '#9E9E9E' }">
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
  <section class="introBing" id="intro">
    <div class="inner">
      <div class="main-introBing-txt">
        <h1 class="main-h1"><span style="color: #1456fd">제빙기 청소</span>, 왜 전문가가 필요할까요?</h1>
        <div id="main-introBing-txt-sub" class="main-h4">
          <p>
            제빙기의 내부는 항상 습한 환경에 있기 때문에
            <span style="color: #1456fd">최소 일주일에 한번, 정기적인 관리</span>가 필요합니다.
          </p>
          <p>
            냉각기 성분인 니켈은 관리를 하지 않으면 <span style="color: #1456fd">발암 물질로 변질</span>될 수 있습니다.
          </p>
          <p>
            보이는게 다가 아닙니다. 제빙기 내부 <span style="color: #1456fd">수많은 물 곰팡이들</span>, 본체 전까지는
            모릅니다.
          </p>
          <p>더러운 얼음으로 <span style="color: #1456fd">노로 바이러스, 식중독 질병</span>에 감염 됩니다.</p>
        </div>
      </div>

      <!-- before,after swiper 영역 -->
      <swiper
        :navigation="true"
        :loop="true"
        :autoplay="{
          delay: 3000,
        }"
        :modules="modules"
        class="mySwiper">
        <swiper-slide>
          <div class="image-wrapper">
            <div class="image-section">
              <img src="/introbing/intromain/1.png" alt="Before Image" />
              <div class="caption">Before</div>
            </div>
            <div class="image-section">
              <img src="/introbing/intromain/1-1.png" alt="After Image" />
              <div class="caption">After</div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="image-wrapper">
            <div class="image-section">
              <img style="width=100%" src="/introbing/intromain/2-2.png" alt="Before Image" />
              <div class="caption">Before</div>
            </div>
            <div class="image-section">
              <img src="/introbing/intromain/2-1.png" alt="After Image" />
              <div class="caption">After</div>
            </div>
          </div></swiper-slide
        ><swiper-slide>
          <div class="image-wrapper">
            <div class="image-section">
              <img src="/introbing/intromain/3.png" alt="Before Image" />
              <div class="caption">Before</div>
            </div>
            <div class="image-section">
              <img src="/introbing/intromain/3-1.png" alt="After Image" />
              <div class="caption">After</div>
            </div>
          </div></swiper-slide
        >
        <swiper-slide>
          <div class="image-wrapper">
            <div class="image-section">
              <img src="/introbing/intromain/4.png" alt="Before Image" />
              <div class="caption">Before</div>
            </div>
            <div class="image-section">
              <img src="/introbing/intromain/4-1.png" alt="After Image" />
              <div class="caption">After</div>
            </div>
          </div></swiper-slide
        ><swiper-slide>
          <div class="image-wrapper">
            <div class="image-section">
              <img src="/introbing/intromain/5.png" alt="Before Image" />
              <div class="caption">Before</div>
            </div>
            <div class="image-section">
              <img src="/introbing/intromain/5-1.png" alt="After Image" />
              <div class="caption">After</div>
            </div>
          </div></swiper-slide
        >
      </swiper>
      <div id="introBing-footer-text" class="main-h1">
        <span style="color: #1456fd">“</span>빙프리가 해결해드립니다!<span style="color: #1456fd">”</span>
      </div>
    </div>
  </section>
  <!-- 메인 섹션 요금안내(채연) -->
  <section class="check" id="check">
    <!-- 전체 요금안내 메인 랩 -->
    <div ref="wrapper" class="price_wrap inner">
      <div class="text_content ordinary">
        <h3 class="description">비용은 줄이고,관리 품격은 높이고</h3>
        <h1 class="heading">똑똑한 구독 서비스</h1>
      </div>

      <div ref="sticky" class="sticky">
        <div class="receipt_section">
          <!-- 첫 번째 카드 -->
          <div class="receipt_content receipt_content card1">
            <div class="front" style="background: url(/public/check/ordinary.png) no-repeat center/contain"></div>
            <div class="back" style="background: url(/public/check/prime\ receipt.png) no-repeat center/contain"></div>
          </div>

          <!-- 두 번째 카드 -->
          <div class="receipt_content receipt_content card2" :class="{ flip: currentSection === 'check' }">
            <div class="front" style="background: url(/public/check/prime\ receipt.png) no-repeat center/contain"></div>
            <div class="back" style="background: url(/public/check/prime\ receipt.png) no-repeat center/contain"></div>
          </div>
          <!-- 카드위 3D 아이콘 -->
          <div class="icon_content">
            <span class="icon1"><img src="/public/check/goodemoji.png" alt="" /></span>
            <span class="icon2"><img src="/public/check/mirror.png" alt="" /></span>
            <span class="icon3"><img src="/public/check/moneyemoji.png" alt="" /></span>
            <span class="icon4"><img src="/public/check/presentemoji.png" alt="" /></span>
            <span class="icon5"><img src="/public/check/dartemoji.png" alt="" /></span>
            <span class="icon6"><img src="/public/check/arrow_left.png" alt="" /></span>
            <span class="icon7"><img src="/public/check/arrow_right.png" alt="" /></span>
            <span class="icon8"><img src="/public/check/pointcircle.png" alt="" /></span>
            <span class="icon9"><img src="/public/check/pointcircle.png" alt="" /></span>
          </div>
        </div>
      </div>
      <!-- 가격 강조 contents -->
      <div class="price_content">
        <span>+￦83,640 </span>
        <span>SAVE</span>
      </div>
    </div>
  </section>
  <!-- 메인 섹션 고객리뷰(지수) -->
  <section class="review" id="review">
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
            :freeModeMomentum="false"
            :freeModeStick="false"
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
            :freeModeMomentum="false"
            :freeModeStick="false"
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
            “눈에 보이지 않아 더러운지 몰랐는데, 지속적인 관리가 필요함을 느꼈습니다. 빙프라임 구독 서비스로 비용도
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
            “쉽고 간편하게 예약할 수 있어 편리했어요! 24시간 서비스로 시간에 구애 받지 않고 원하는 시간에 방문 해주셔서
            자주 이용할 것 같아요. 주변에도 추천해야겠어요 :)”
          </p>
          <div class="review-customer">
            <img src="/public/review/customer_icon.png" alt="고객 아이콘" />
            <p style="font-size: 15px; font-weight: 700; color: #424242">김*수 님</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 메인 섹션 예약하기(효빈) -->
  <section class="reservation" id="reserv" :class="{ visible: currentSection === 'reserv' }">
    <div class="inner">
      <div class="reserv_chat">
        <img class="reserv_phone" src="/reservation/reservmain/reservation_phone.png" alt="휴대폰 화면" />
        <div class="chat_bing">
          <div class="chat">
            <img class="reserv_pp" src="/reservation/reservmain/reserv_pp1.png" alt="사람1" />
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
            <img class="reserv_pp" src="/reservation/reservmain/reserv_pp2.png" alt="사람2" />
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
            <img class="reserv_pp" src="/reservation/reservmain/reserv_pp3.png" alt="사람3" />
            <div class="bubble left">
              혼자 사는 집이라 남성 기사님은 좀 불안한데 .. <br />
              <b>여성 기사님으로 요청</b> 할 수 있으려나?
            </div>
          </div>
          <div class="bing">
            <div class="bubble right">네! 빙프리에서는 <br />기사님 <b>성별을 선택할</b>수 있어요!</div>
            <img src="/reservation/reservmain/bing.png" alt="빙프리" />
          </div>
        </div>

        <router-link to="/reservation" class="fast_reserv"> 빠른 예약하기 </router-link>
        <img class="fast_hand" src="/reservation/reservmain/resrvation_hand.png" alt="손" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
