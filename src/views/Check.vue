<script setup>
import { ref } from "vue";
import Topbar from "@/components/Topbar.vue";
const descriptions = ref([
  {
    title: "케어 에센셜",
    name: "스탠다드+",
    weight: "(50~100kg)",
    detail: {
      times: "6회",
      label: "소형 카페,식당 운영자라면?",
      beforeprice: "120,000",
      totalprice: "108,000",
    },
  },
  {
    title: "스마트 클린",
    name: "디럭스+",
    weight: "(100~200kg)",
    detail: {
      times: "8회",
      label: "보다 청결에 민감하다면?",
      beforeprice: "150,000",
      totalprice: "127,500",
    },
  },
  {
    title: "프리미엄 시그니처",
    name: "호시자키+",
    weight: "(250kg이상)",
    detail: {
      times: "12회",
      label: "프렌차이즈 브랜드 매장 운영자라면?",
      beforeprice: "210,000",
      totalprice: "168,000",
    },
  },
]);
</script>
<template>
  <div class="wrap">
    <!-- header -->
    <Topbar />
    <header />

    <!-- 요금제 상세 배너 -->
    <div class="banner_section">
      <img src="/public/check/check_banner.png" alt="" />
      <!-- 예약하기 바로가기 버튼 -->
      <router-link to="/Reservation"><button>빠른 예약하기</button></router-link>

      <!-- 손 아이콘 -->
      <span><img src="/public/check/goto_reservation_icon.png" alt="" /></span>
    </div>
    <!-- top event 요금제 섹션 -->
    <div class="top3_price_section">
      <div class="inner">
        <!-- 텍스트 부분 -->
        <div class="top3_text_content">
          <p>요금안내</p>
          <p>깨끗한 얼음, 완벽한 시작! 빙프리와 함께하세요!</p>
          <p>첫 얼음처럼 맑고 신선한 순간을 위해, 당신의 제빙기 정기 관리가 필요합니다</p>
          <p>
            구독 시 최대 20% 할인 + 2년 연장 시 추가 5%! 일반 결제보다 최대 210,000원 절약! <span>요금안내참조</span>
          </p>
        </div>
        <!--top3 요금제 카드  -->
        <h1>빙프라임+ 구독요금제&nbsp; <span>TOP3</span></h1>
        <div class="top3_card_content">
          <div class="top3_card_list" v-for="(description, index) in descriptions" :key="index">
            <!-- 요금제 제목 -->
            <p class="price_title">{{ description.title }}</p>

            <!-- 요금제 상세 -->
            <p class="price_weight">
              <span>{{ description.name }}</span>
              <span>{{ description.weight }}</span>
            </p>

            <!-- 상세 안내 텍스트 -->
            <div class="description">
              <!-- 구독 횟수 -->
              <p>
                <span><img src="/public/check/price_tag.png" alt="" /></span>
                <span>
                  <strong>{{ description.detail.times }}</strong
                  >&nbsp구독
                </span>
              </p>
              <!-- 서비스 내용 -->
              <p>
                <span><img src="/public/check/price_description_tag.png" alt="" /></span
                ><span>무료진단 서비스 1회 , 자사몰 클리너 증정</span>
              </p>
              <!-- 맞춤 질문 -->
              <p>
                <span><img src="/public/check/price_description_tag.png" alt="" /></span
                ><span>{{ description.detail.label }}</span>
              </p>
            </div>

            <!-- 가격 내용 -->
            <p class="entire_price">
              <span class="before-price">회당&nbsp;{{ description.detail.beforeprice }}원</span>
              <span class="total-price">{{ description.detail.totalprice }}원</span>
            </p>

            <!-- 버튼 -->
            <div class="buttons">
              <button>상세보기</button>
              <router-link to="/reservation"><button>가입하기</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
