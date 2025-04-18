<script setup>
import { ref, onMounted, computed } from "vue";
import Topbar from "@/components/Topbar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// 상단 탭
// 현재 선택된 탭 상태를 저장
const intropiceTab = ref("ordinary"); // 초기값은 'ordinary' (일반요금제)

// 탭 선택 함수
function selectTopTab(tab) {
  intropiceTab.value = tab;
}
// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  console.log("✅ 현재 섹션:", currentSection.value);
};
// ㅅ와이퍼 버튼
const currentSection = ref("visual");
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

const tabs = ["스탠다드", "스탠다드+", "디럭스", "프리미엄", "호시자키", "호시자키+"];
const selectedTab = ref("스탠다드");
const showBenefits = ref(false);
//TOP3 요금제 더미
const pricePlans = {
  스탠다드: [
    { times: 6, pricePerUse: 89100, total: 534600 },
    { times: 8, pricePerUse: 84150, total: 673200 },
    { times: 12, pricePerUse: 158400, total: 950400 },
  ],
  "스탠다드+": [
    { times: 6, pricePerUse: 108000, total: 648000 },
    { times: 8, pricePerUse: 102000, total: 816000 },
    { times: 12, pricePerUse: 192000, total: 1152000 },
  ],
  디럭스: [
    { times: 6, pricePerUse: 135000, total: 810000 },
    { times: 8, pricePerUse: 127500, total: 1020000 },
    { times: 12, pricePerUse: 240000, total: 1440000 },
  ],
  프리미엄: [
    { times: 6, pricePerUse: 153000, total: 918000 },
    { times: 8, pricePerUse: 144500, total: 1156000 },
    { times: 12, pricePerUse: 272000, total: 1632000 },
  ],
  호시자키: [
    { times: 6, pricePerUse: 153000, total: 918000 },
    { times: 8, pricePerUse: 144500, total: 1156000 },
    { times: 12, pricePerUse: 272000, total: 1632000 },
  ],
  "호시자키+": [
    { times: 6, pricePerUse: 189000, total: 1134000 },
    { times: 8, pricePerUse: 178500, total: 1428000 },
    { times: 12, pricePerUse: 336000, total: 2016000 },
  ],
};
//일반 요금제 더미
const ordinarys = ref([
  // 스탠다드
  {
    title: "스탠다드",
    subtitle: "스탠다드",
    weight: "50kg 미만",
    totalprice: "99,000",
  },
  {
    title: "스탠다드",
    subtitle: "스탠다드+",
    weight: "50~100kg",
    totalprice: "120,000",
  },
  // 디럭스
  {
    title: "디럭스",
    subtitle: "",
    weight: "100~200kg",
    totalprice: "150,000",
  },
  // 프리미엄
  {
    title: "프리미엄",
    subtitle: "",
    weight: "200kg 이상",
    totalprice: "170,000",
  },
  // 호시자키
  {
    title: "호시자키",
    subtitle: "호시자키",
    weight: "250kg 미만",
    totalprice: "170,000",
  },
  {
    title: "호시자키",
    subtitle: "호시자키+",
    weight: "250kg 이상",
    totalprice: "210,000",
  },
]);
//구독 요금제 탭
const selectTab = (tab) => {
  selectedTab.value = tab;
  showBenefits.value = false; // 탭 바꿀 때 혜택 UI 초기화
};

const toggleBenefits = () => {
  showBenefits.value = !showBenefits.value;
};
//애니메이션
const endValues = [6, 8, 12];
const benefitEndValues = [10, 15, 20];
const numberPairs = endValues.map((n, i) => [n, benefitEndValues[i]]);
const pair = computed(() => numberPairs[currentIndex.value]);

const currentIndex = ref(0);
const animate = ref(false);

onMounted(() => {
  currentIndex.value = 0; // ✅ 인덱스 초기화

  const interval = setInterval(() => {
    animate.value = false;
    setTimeout(() => {
      animate.value = true;
    }, 50); // 애니메이션 리셋

    currentIndex.value++;

    if (currentIndex.value >= numberPairs.length) {
      currentIndex.value = 0; // 마지막 인덱스 넘으면 처음부터 다시
    }
  }, 3000); // 3초마다 전환
});
</script>
<template>
  <div class="wrap">
    <!-- header -->
    <Topbar />
    <header />
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

    <!-- 요금제 상세 배너 -->
    <div class="banner_section">
      <img src="/public/check/check_banner_top.png" alt="" />
      <!-- 배너안 텍스트 -->
      <div class="intro-banner-txtbox">
        <p class="intro-banner-txt1" style="font-size: 38px; color: #fff; font-weight: 600">
          성수기 일정은 빙프리에게,<br />소통은 실시간으로.
        </p>
        <p class="intro-banner-txt2" style="font-size: 23px; color: #fff; font-weight: 400">
          Trust Bingfree, for timely plans and instant chat.
        </p>
      </div>
    </div>
    <!-- 배너아래 바로가기 -->
    <div class="check-top2">
      <p class="check-top2-txt" style="font-size: 30px; color: #fff; font-weight: 600">
        청소 요금 한눈에! 빙프리와 함께 바로 예약해보세요!
      </p>
      <div class="check-top2-bt">
        <button class="check-top2-txt2">간편 예약 신청</button>
      </div>
    </div>

    <!-- 구독 탭 나누기 -->
    <nav>
      <ul class="introbing_tab">
        <li @click="selectTopTab('ordinary')" :class="{ active: intropiceTab === 'ordinary' }">일반요금제</li>
        <li class="divider">|</li>
        <li @click="selectTopTab('bingprime')" :class="{ active: intropiceTab === 'bingprime' }">구독요금제</li>
      </ul>
    </nav>
    <div class="Tap1_ordinary" v-if="intropiceTab === 'ordinary'">
      <!-- 일반 요금제 설명 -->
      <div class="ordinary_text_content">
        <p>요금안내</p>
        <p>운영환경에 딱 맞게! 빙프리 일반요금제로 시작하세요</p>
        <p>매장규모와 제빙기 용량에 따라, 최적의 요금제를 직접 선택할 수 있습니다</p>
        <p>
          자사몰 인기상품 추가 구매가능 + 제빙기 점검서비스까지 선택 가능!
          <span>요금안내참조</span>
        </p>
      </div>
      <!-- 일반 요금제 카드 섹션 -->

      <!-- 스와이퍼 -->
      <div class="inner">
        <h1 class="ordinary_h1">KG따라 선택하는 <span>빙프리&nbsp;</span>최적의 기본요금제</h1>

        <Swiper
          :slides-per-view="2"
          :space-between="24"
          :modules="[Navigation, Pagination]"
          navigation
          class="ordinary_swiper">
          <SwiperSlide v-for="(ordinary, index) in ordinarys" :key="index" class="ordinary_content">
            <div class="ordinary_list">
              <p class="or_price_title">{{ ordinary.title }}</p>
              <p class="or_price_weight">
                <span>{{ ordinary.subtitle || ordinary.title }}</span>
                <span>({{ ordinary.weight }})</span>
              </p>
              <div class="ordinary">
                <p>
                  <span><img src="/public/check/price_description_tag.png" alt="" /></span>
                  <span>추가금 없이, 청소 서비스가 모두 포함된 요금입니다.</span>
                </p>
                <p>
                  <span><img src="/public/check/price_description_tag.png" alt="" /></span>
                  <span>요청 시 제빙기 관련 제품/서비스 추가 제공이 가능합니다.</span>
                </p>
              </div>
              <p class="ordinary_entire_price">
                <span class="total-price">{{ ordinary.totalprice }}원</span>
              </p>
              <div class="buttons">
                <button>상세보기</button>
                <router-link to="/reservation">
                  <button>가입하기</button>
                </router-link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <!-- 구독 탭 나누기 bingFrime -->
    <div class="Tap2_bingprime" v-if="intropiceTab === 'bingprime'">
      <!-- 숫자 표현 섹션 -->

      <div class="Top_number_section">
        <!-- 이벤트 안 텍스트  -->
        <div class="Top_number_text_content">
          <p class="num_first">2025 빙프라임 플러스</p>
          <p class="num_second">많이 쓸수록, 더 커지는 혜택!</p>
          <p class="num_third">BingPrime Plus</p>
        </div>
        <!-- 숫자 박스 -->
        <div class="numbering_box">
          <ul class="number_ul">
            <li v-for="(pair, index) in numberPairs" :key="index" v-show="currentIndex === index">
              <div class="lt">
                <em>구독권</em>
                <div class="lt_second_Sec">
                  <div class="numbering">
                    <div class="n_wrap">
                      <transition-group name="numbering" tag="div">
                        <span class="n_list_sub" :key="pair[0]" :class="{ animate: animate }">{{
                          pair[0] + "회"
                        }}</span>
                      </transition-group>
                    </div>
                  </div>
                  <div class="ar_wrap">
                    <img
                      src="https://mall.cowaystatic.com/static/front/resources/web/images/event/package/2503/numbering_arrow.png"
                      class="load_img" />
                  </div>
                </div>

                <p class="fixp">구독시</p>
              </div>
            </li>
            <li v-for="(pair, index) in numberPairs" :key="index" v-show="currentIndex === index">
              <div class="rt">
                <em>혜택</em>
                <div class="b_txt"><b>최대20</b>%</div>
                <div class="numbering">
                  <div class="n_wrap">
                    <transition-group name="numbering" tag="div">
                      <span class="n_list_sub" :class="{ animate: animate }">{{ pair[1] + `%` }}</span>
                    </transition-group>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
        </div>
      </div>
      <!--top3 요금제 카드  -->

      <div class="inner">
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
      <!-- 빙프리 프라임 구독 요금제 -->
      <div class="bingfrime_wrap_section">
        <div class="inner">
          <p>필요한 만큼 선택하는<span>&nbsp#빙프라임+ 맞춤케어</span><span>&nbsp;구독</span>&nbsp;요금제</p>
          <div class="pricelist_tap">
            <ul class="tab_list">
              <li v-for="tab in tabs" :key="index" class="tab_item" :class="{ on: selectedTab === tab }">
                <a href="#" class="btn_tab" @click.prevent="selectTab(tab)">
                  {{ tab }}
                </a>
              </li>
            </ul>
          </div>
          <!-- 요금제 카드 목록 -->
          <div class="price_list">
            <!-- 대표 제목 버튼 (탭 선택에 따라 바뀜) -->
            <!-- price리스트 왼쪽 부분 -->
            <div class="price_list_left">
              <button class="selected_plan_title">
                <span class="selctedTab_bt">{{ selectedTab }}</span>
                빙프라임+구독회원 요금
              </button>
              <div class="individual_list">
                <div
                  class="individual_card"
                  v-for="(plan, idx) in pricePlans[selectedTab]"
                  :key="idx"
                  :class="{
                    'last-card': idx === pricePlans[selectedTab].length - 1,
                  }">
                  <div class="card_in_times">
                    회차: <span>{{ plan.times }}회</span>
                  </div>
                  <button class="perprice_bt">1회당</button>
                  <div class="card_in_price">
                    <div class="card_in_perprice">
                      <span>{{ plan.pricePerUse.toLocaleString() }}원</span>
                    </div>
                    <div class="card_in_total">
                      합계: <span>{{ plan.total.toLocaleString() }}원</span>
                    </div>
                  </div>

                  <div class="buttons">
                    <button>구독하기</button>
                    <button @click="toggleBenefits">혜택보기</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 혜택 정보 섹션 그대로 유지 -->
            <div class="plus_sale_list">
              <h1>2년 연장회원 특별할인 혜택 계산하기</h1>

              <!-- 혜택 전 -->
              <div class="first_box_section" v-if="!showBenefits">
                <div class="first_box_before">
                  <p>
                    <span>혜택하기를 누르고<br />자세한 정보를 확인해보세요.</span>
                  </p>
                </div>
                <div class="second_box">
                  <p>
                    <span>기본회원권:</span>
                    <span>가격확인하기</span>
                  </p>
                  <p>
                    <span>2년 연장 혜택:</span>
                    <span>가격확인하기</span>
                  </p>
                </div>
              </div>

              <!-- 혜택 후 -->
              <div v-else>
                <div class="first_box_after">
                  <p>
                    <span><img class="check_icon" src="/public/check/price_check_icon.png" alt="checkicon" /></span>
                    <span>3년 구독 혜택으로<strong>&nbsp;5% 추가</strong>할인까지!</span>
                  </p>
                  <p>
                    <span><img class="check_icon" src="/public/check/price_check_icon.png" alt="checkicon" /></span>
                    <span>1년 4회의 청소, <strong>3년까지</strong>사용할 수 있는<br />특별 구독 혜택 </span>
                  </p>
                  <p>
                    <span><img class="check_icon" src="/public/check/price_check_icon.png" alt="checkicon" /></span>
                    <span>동절기엔 청소를 미뤄도 괜찮아요,<br /><strong>AI 알림</strong>&nbsp;으로 언제든 체크!</span>
                  </p>
                </div>

                <div class="second_box" v-if="pricePlans[selectedTab].length">
                  <p>
                    <span>기본 {{ pricePlans[selectedTab][0].times }}회권</span>
                    <span>회당 {{ pricePlans[selectedTab][0].pricePerUse.toLocaleString() }}원</span>
                  </p>
                  <p>
                    <span>2년 연장 혜택 {{ pricePlans[selectedTab][1].times }}회권</span>
                    <span>회당 {{ pricePlans[selectedTab][1].pricePerUse.toLocaleString() }}원</span>
                  </p>
                </div>
              </div>

              <p class="years2_banner">2년 연장 구독하고 최대 25% 혜택을 누려보세요.</p>
              <button class="years2_bt">
                {{ showBenefits ? "구독하기" : "혜택보기" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 계산하기배너 -->
    <div class="calculation_banner">
      <img src="" alt="" />
    </div>
  </div>
</template>
<style scoped></style>
