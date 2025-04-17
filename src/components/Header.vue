<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
<template>
  <header>
    <div class="inner">
      <router-link to="/"><img src="/images/main-logo.png" alt="" /></router-link>
      <nav :class="{ open: isMenuOpen }">
        <router-link to="/IntroBing">빙프리란? </router-link>
        <router-link to="/Check">요금안내</router-link>
        <router-link to="/Review">고객리뷰</router-link>
        <router-link to="/Reservation">예약하기</router-link>
      </nav>
      <!-- 햄버거 아이콘 -->
      <button class="hamburger" @click="toggleMenu"></button>
    </div>
  </header>
  <!-- 햄버거 모달창 -->
  <nav class="" style="display: none">
    <ul class="mo-sns">
      <li>
        <a href="#"><i class="ico ico-youtube"></i></a>
      </li>
      <li>
        <a href="#"><i class="ico ico-facebook"></i></a>
      </li>
      <li>
        <a href="#"><i class="ico ico-insta"></i></a>
      </li>
    </ul>
    <div class="mo-logo">
      <p>반려동물을 위한<br />지식, 경험, 기술<br />네트워크</p>
      <img src="" alt="" />
    </div>
    <ul class="menu-list">
      <li class="first"><a href="#">MAIN</a></li>
      <li class="active"><a href="#about">About</a></li>
      <li class=""><a href="#member">MEMBERS</a></li>
      <li class=""><a href="#message">CEO message</a></li>
      <li class=""><a href="#contact">CONTACT US</a></li>
    </ul>
    <a href="mailto:﻿covet.korea@gmail.com" class="mo-mail">
      <i class="ico ico-mail"></i>
    </a>
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
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 100px;
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
      background: none;
      border: none;
      width: 20px !important;
      height: 20px;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
}
// @media (max-width: 800px) {
//   header {
//     margin-bottom: -80px;
//     position: fixed;
//     background-color: #fff;
//     top: 0;
//     .inner {
//       margin: auto;
//       max-width: 700px;
//       // background-color: rgba($color: #ff0000, $alpha: 0.5);
//       img {
//         width: 120px;
//         left: 8%;
//       }
//       nav {
//         display: flex;
//         margin-right: 5%;
//         a {
//           color: #111;
//           font-weight: 600;
//           margin-left: 40px;
//           position: relative;
//           img {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             width: 40px;
//           }
//         }
//       }
//     }
//   }
// }
@mixin mobile {
  @media (min-width: 390px) and (max-width: 767px) {
    @content;
  }
}
@include mobile {
  header {
    .inner {
      img {
        width: 170px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 100px;
      }
      nav {
        display: none;
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
        display: block;
      }
    }
  }
}
@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
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
    transition: background 0.4s ease;

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
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
          }
        }
      }
    }
  }
}
</style>
