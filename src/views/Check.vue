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
// 요금제 섹션

const tabs = [
  "스탠다드",
  "스탠다드+",
  "디럭스",
  "프리미엄",
  "호시자키",
  "호시자키+",
];
const selectedTab = ref("스탠다드");
const showBenefits = ref(false);

const pricePlans = {
  스탠다드: [
    { times: 6, pricePerUse: 89100, total: 534600 },
    { times: 8, pricePerUse: 84150, total: 673200 },
    { times: 6, pricePerUse: 158400, total: 950400 },
  ],
  "스탠다드+": [
    { times: 6, pricePerUse: 108000, total: 648000 },
    { times: 8, pricePerUse: 102000, total: 816000 },
    { times: 6, pricePerUse: 192000, total: 1152000 },
  ],
  디럭스: [
    { times: 6, pricePerUse: 135000, total: 810000 },
    { times: 8, pricePerUse: 127500, total: 1020000 },
    { times: 6, pricePerUse: 240000, total: 1440000 },
  ],
  프리미엄: [
    { times: 6, pricePerUse: 153000, total: 918000 },
    { times: 8, pricePerUse: 144500, total: 1156000 },
    { times: 6, pricePerUse: 272000, total: 1632000 },
  ],
  호시자키: [
    { times: 6, pricePerUse: 153000, total: 918000 },
    { times: 8, pricePerUse: 144500, total: 1156000 },
    { times: 6, pricePerUse: 272000, total: 1632000 },
  ],
  "호시자키+": [
    { times: 6, pricePerUse: 189000, total: 1134000 },
    { times: 8, pricePerUse: 178500, total: 1428000 },
    { times: 6, pricePerUse: 336000, total: 2016000 },
  ],
};

const selectTab = (tab) => {
  selectedTab.value = tab;
  showBenefits.value = false; // 탭 바꿀 때 혜택 UI 초기화
};

const toggleBenefits = () => {
  showBenefits.value = !showBenefits.value;
};
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
    <!-- 일반 요금제 섹션 -->
    <div class="price_section">
      <!-- 이너 -->

      <div class="inner">
        <!-- 일반요금제 큰 섹션 -->
        <div class="ordinary_price_content">
          <!-- 일반 요금제 제목 -->
          <h1><strong>KG</strong>수에 맞게 맞춤 선택하는<strong> 빙프리</strong> 일반구독제</h1>
          <!-- 일반 요금제 리스트 -->
          <div class="ordinary_price_list">
            <img src="/public/check/ordinary_pricelist.png" alt="일반요금제" />
          </div>
        </div>
      </div>
    </div>
    <!-- 빙프리 프라임 구독 요금제 -->
    <div class="bingfrime_wrap_section">
      <div class="inner">
        <h1>필요한 만큼 선택하는 #빙프라임+ 맞춤 케어 구독요금제</h1>
        <!-- 요금제 선택 탭 -->
        <div class="pricelist_tap">
          <button v-for="tab in tabs" :key="tab" :class="{ active: selectedTab === tab }" @click="selectTab(tab)">
            {{ tab }}
          </button>
        </div>
        <!-- 요금제 카드 목록 -->
        <div class="price_list">
          <!-- 대표 제목 버튼 (탭 선택에 따라 바뀜) -->
          <button class="selected_plan_title">{{ selectedTab }} 빙프라임+ 구독회원 요금</button>

          <div class="individual_list">
            <div class="individual_card" v-for="(plan, idx) in pricePlans[selectedTab]" :key="idx">
              <div>
                회차: <span>{{ plan.times }}회</span>
              </div>
              <div>
                1회당: <span>{{ plan.pricePerUse.toLocaleString() }}원</span>
              </div>
              <div>
                전체 요금: <span>{{ plan.total.toLocaleString() }}원</span>
              </div>
              <div class="buttons">
                <button>구독하기</button>
                <button @click="toggleBenefits">혜택보기</button>
              </div>
            </div>
          </div>

          <!-- 혜택 정보 섹션 그대로 유지 -->
          <div class="plus_sale_list">
            <h1>2년 연장회원 특별 할인 혜택 계산하기</h1>

            <div v-if="!showBenefits" class="first_box_before">
              <p>혜택하기를 누르고 자세한 정보를 확인해보세요.</p>
            </div>

            <div v-else>
              <div class="first_box_after">
                <p>
                  <span></span><span>3년 구독 혜택으로 <strong>5% 추가</strong> 할인까지!</span>
                </p>
                <p>
                  <span></span><span>1년 4회의 청소, <strong>3년까지</strong> 사용할 수 있는 특별 구독 혜택</span>
                </p>
                <p>
                  <span></span><span>동절기엔 청소를 미뤄도 괜찮아요, <strong>AI 알림</strong>으로 언제든 체크!</span>
                </p>
              </div>

              <div class="second_box" v-if="pricePlans[selectedTab].length">
                <p>
                  <span>기본 {{ pricePlans[selectedTab][0].times }}회권</span>
                  <span>회당 {{ pricePlans[selectedTab][0].pricePerUse.toLocaleString() }}원</span>
                </p>
                <p>
                  <span>-2년 연장 혜택 {{ pricePlans[selectedTab][1].times }}회권</span>
                  <span>회당 {{ pricePlans[selectedTab][1].pricePerUse.toLocaleString() }}원</span>
                </p>
              </div>

              <p>2년 연장 구독하고 최대 25% 혜택을 누려보세요.</p>
              <button>구독하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
