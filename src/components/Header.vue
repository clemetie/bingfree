<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 부모로부터 currentSection 값을 받음
const props = defineProps({
  currentSection: String,
});

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 스크롤 시 부드럽게 이동
const scrollToSection = (id, event) => {
  event.preventDefault(); // 기본 동작인 페이지 이동을 막음
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  currentSection.value = id; // nav a 색상 변경
  isMenuOpen.value = false; // 메뉴 닫기
};

const scrollToTop = (event) => {
  event.preventDefault(); // 라우팅 막고
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 테블릿 픽스바 백색상 변경
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30; // 스크롤 30px 이상일 때 배경 변경
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 테블릿에서 해당 섹션 click 이벤트시 nav a 카테고리 색상 변경
const currentSection = ref("intro");
</script>

<template>
  <header :class="{ scrolled: isScrolled || isMenuOpen }">
    <div class="inner">
      <a href="/" @click="scrollToTop">
        <img src="/images/main-logo.png" alt="" />
      </a>
      <nav :class="{ open: isMenuOpen }">
        <a href="#intro" @click="scrollToSection('intro', $event)" :class="{ active: props.currentSection === 'intro' }"
          >빙프리란?</a
        >
        <a href="#check" @click="scrollToSection('check', $event)" :class="{ active: props.currentSection === 'check' }"
          >요금안내</a
        >
        <a
          href="#review"
          @click="scrollToSection('review', $event)"
          :class="{ active: props.currentSection === 'review' }"
          >고객리뷰</a
        >
        <a
          href="#reserv"
          @click="scrollToSection('reserv', $event)"
          :class="{ active: props.currentSection === 'reserv' }"
          >예약하기</a
        >
      </nav>

      <!-- 햄버거 아이콘 -->

      <div class="hamburger" @click="toggleMenu">
        <img
          :src="isMenuOpen ? '/public/images/closing_icon.png' : '/public/images/hambergar_menu_icon.png'"
          alt="menu toggle" />
      </div>
    </div>
  </header>
  <!-- 햄버거 모달창 -->
  <nav class="mo-menu" v-show="isMenuOpen">
    <ul class="mo-sns">
      <li>
        <a href="#"><img src="/public/images/youtube.png" alt="" /></a>
      </li>
      <li>
        <a href="#"><img src="/public/images/facebook.png" alt="" /></a>
      </li>
      <li>
        <a href="#"><img src="/public/images/linkedin.png" alt="" /></a>
      </li>
    </ul>
    <div class="mo-logo">
      <p>청소가 필요한 순간<br />검증된 기술과 경험<br />제빙기 케어, 여기가 정답</p>
      <img src="/images/main-logo.png" alt="" />
    </div>
    <ul class="menu-list">
      <li class="first">
        <a
          href="#intro"
          @click="scrollToSection('intro', $event)"
          style="opacity: 1; font-weight: 700"
          :class="{ active: currentSection === 'intro' || (isMenuOpen && currentSection === 'intro') }"
          >ABOUT</a
        >
      </li>
      <li>
        <a
          href="#check"
          @click="scrollToSection('check', $event)"
          :class="{ inactive: isMenuOpen && currentSection !== 'check' }"
          >PRICING</a
        >
      </li>
      <li>
        <a
          href="#review"
          @click="scrollToSection('review', $event)"
          :class="{ inactive: isMenuOpen && currentSection !== 'review' }"
          >REVIEWS</a
        >
      </li>
      <li>
        <a
          href="#reserv"
          @click="scrollToSection('reserv', $event)"
          :class="{ inactive: isMenuOpen && currentSection !== 'reserv' }"
          >RESERVATION</a
        >
      </li>
      <li>
        <a
          href="#footer"
          @click="scrollToSection('contact', $event)"
          :class="{ inactive: isMenuOpen && currentSection !== 'contact' }"
          >CONTACT US</a
        >
      </li>
    </ul>
  </nav>
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
      width: 170px;
    }
    nav {
      display: flex;
      a {
        color: #111;
        font-weight: 600;
        margin-left: 70px;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
        }
      }
    }
    .hamburger {
      display: none;
    }
  }
}

@mixin mobile {
  @media (min-width: 390px) and (max-width: 767px) {
    @content;
  }
}
// 모바일
@include mobile {
  ul,
  li {
    list-style: none;
  }
  header {
    z-index: 999;
    background-color: #fff;
    &.scrolled {
      background-color: #1651da; // ✅ 메뉴가 열렸을 때 바뀔 배경색
      transition: background-color 0.3s ease;
    }
    &.scrolled {
      .inner {
        img {
          display: none; // ✅ 메뉴가 열렸을 때 로고 숨김
        }
      }
    }
    .inner {
      display: flex;
      a {
        width: 100%;
        img {
          width: 140px;
        }
      }

      nav {
        display: none;
      }
      .hamburger {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        width: 37px;
        height: 80px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
      }
    }
  }
  // 모달 창
  .mo-menu {
    margin-top: 120px;
    width: 100%;
    height: 100vh;
    position: absolute;
    position: relative;
    top: -40px;
    left: 0;

    background-color: #1651da;
    z-index: 99;
    .mo-sns {
      position: absolute;
      right: 20px;
      top: calc(12% + 15px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 18px;
    }
    .mo-logo {
      display: block;
      position: absolute;
      left: 30px;
      top: calc(12% + -53px);

      p {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 20px;
        img {
          max-width: 100%;
        }
      }
    }
    .menu-list {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(50% + -22px);
      left: 27px;
      gap: 15px;
      transform: translateY(-50%);
      li {
        font-weight: 500;
        a {
          font-size: 34px;
          color: #fff;
          padding-left: 20px;
          display: inline;
          opacity: 0.5; // 기본적으로 흐리게

          &:active {
            opacity: 1;
            font-weight: 700;
            transition: opacity 0.3s ease;
          }
          &:inactive {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
// 테블릿
@include tablet {
  header {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 25px 10%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    transition: background-color 0.3s ease;

    &.scrolled {
      background-color: #fff; // 변경될 배경색
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); // 선택 사항: 그림자 추가
    }

    .inner {
      width: 100%;

      justify-content: space-between;
      img {
        flex: 20%;
        width: 170px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 55px;
      }
      nav {
        flex: 80%;
        display: flex;
        justify-content: flex-end;
        a {
          color: #111;
          font-weight: 500;
          margin-left: 40px;
          position: relative;
          &:active {
            color: #1651da; // 원하는 활성 색상
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
