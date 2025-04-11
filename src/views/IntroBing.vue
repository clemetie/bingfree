<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const introbingTab = ref("care");

function selectTab(tab) {
  introbingTab.value = tab;
}

// vue router 연결 : 예약 페이지 이동
const router = useRouter();

function goToReservation() {
  router.push("/reservation");
}
// 제빙기 케어 필요한 이유 이미지
const careList = [
  { image: "/introbing/introsub/introcare/2-1.jpg", text: "얼음 안에 이물질이 들어가 있을 때" },
  { image: "/introbing/introsub/introcare/2-2.jpg", text: "얼음에서 이상한 냄새가 날 때" },
  { image: "/introbing/introsub/introcare/2-3.jpg", text: "완전분해 케어를 받아보지 않았거나 케어 시점이 도래했을 때" },
];
const careList2 = [
  { image: "/introbing/introsub/introcare/cleaning/1.jpg", text: "제품안전 분해" },
  {
    image: "/introbing/introsub/introcare/cleaning/2.jpg",
    text: "전용 친환경 약품 세척제를 통한<br>부품 세척 & 본체 세척",
  },
  { image: "/introbing/introsub/introcare/cleaning/3.jpg", text: "고압스팀 살균세척" },
  { image: "/introbing/introsub/introcare/cleaning/4.jpg", text: "친환경 UV 살균소독<br>(살균 99.99% 인증 제품)" },
  { image: "/introbing/introsub/introcare/cleaning/5.jpg", text: "제품 조립" },
  { image: "/introbing/introsub/introcare/cleaning/6.jpg", text: "얼음 도출 여부 확인 및<br>테스트 작동 후 케어 종료" },
];
</script>
<template>
  <div class="intro-wrap">
    <div class="intro-banner" style="margin-top: 80px">
      <img src="/public/introbing/introsub/introbanner/1.jpg" alt="banner-img" />
      <div class="intro-banner-txtbox">
        <p class="intro-banner-txt1" style="font-size: 38px; color: #fff; font-weight: 600">
          청소와 신뢰가 최우선<br />제빙기 청소는 빙프리에서.
        </p>
        <p class="intro-banner-txt2" style="font-size: 23px; color: #fff; font-weight: 400">
          Trust Bingfree, which prioritizes cleanliness.
        </p>
      </div>
    </div>
    <div class="intro-top2">
      <p class="intro-top2-txt" style="font-size: 30px; color: #fff; font-weight: 600">
        손쉽게 관리하는 제빙기 청소, 지금 바로 상담 받아보세요!
      </p>
      <div class="intro-top2-bt">
        <button class="intro-top2-txt2" @click="goToReservation">간편 예약 신청</button>
      </div>
    </div>
    <!-- 탭 -->
    <nav>
      <ul class="introbing_tab">
        <li @click="selectTab('care')" :class="{ active: introbingTab === 'care' }">제빙기 케어</li>
        <li class="divider">|</li>
        <li @click="selectTab('bingfree')" :class="{ active: introbingTab === 'bingfree' }">빙프리란?</li>
      </ul>
    </nav>
    <main>
      <div class="intromain inner">
        <!-- 빙프리-제빙기 케어 서비스 영역 -->
        <div class="care-service-container">
          <!-- txt,이미지 영역 -->
          <div class="care-service-box">
            <h2 style="color: #212121; font-weight: 800; font-size: 36px; line-height: 1.2">
              빙프리만의 <br />
              제빙기 케어 서비스
            </h2>
            <p style="color: #1456fd; font-size: 18px; font-weight: bold">빙프리의 제빙기 케어 서비스는</p>
            <p style="color: #212121; font-size: 16px; font-weight: 500">
              제빙기 내부의 오염물과 세균을 깨끗이 제거하고, 최적의 성능을 유지하여 위생적인 얼음 생산 환경을
              제공합니다.<br />
              잔여물과 불순물로 인한 위생 문제와 성능 저하를 예방해 언제나 신선한 얼음을 만드실 수 있도록 돕습니다.<br />
              정기적인 관리로 얼음의 위생 수준을 높이는 것은 물론, 부품 마모와 고장을 방지해 제빙기의 수명을
              연장합니다.<br />
            </p>
          </div>
        </div>
        <!-- 1.제빙기 케어는 왜 필요할까요? -->
        <div class="intro-section1">
          <div class="intro-section1-title">
            <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">1.</p>
            <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
              제빙기 케어는 왜 필요할까요?
            </p>
            <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p3">
              빙프리는 오염된 내부를 세부분해하여 완벽하게 청소해 드리겠습니다.
            </p>
          </div>
          <div class="intro-section1-desc">
            <div class="intro-section1-desc1">
              <div class="desc1-img">
                <img src="/public/introbing/introsub/introcare/1-1.jpg" alt="img1-1" />
              </div>
              <div class="desc1-txt">
                <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                  제빙기의 내부는 항상 습한 환경에 있기 때문에<br />
                  반드시 주기적인 관리가 필요합니다.
                </p>
                <p style="color: #495861; font-size: 15px; font-weight: 750">
                  제빙기 내부는 항상 물기를 머금고 있기 때문에 자주 닦고 말려주지 않으면 습한 환경 때문에<br />
                  곰팡이가 서식하게 됩니다. 처음에는 분홍색 곰팡이, 더 심해지면 검은색 곰팡이가 생기게<br />
                  되는데, 이러한 곰팡이는 면역력이 약한 사람에게 폐혈증, 폐렴, 수막염 등을 유발할 수 있습니다.
                </p>
              </div>
            </div>
            <div class="intro-section1-desc2">
              <div class="desc2-img">
                <img src="/public/introbing/introsub/introcare/1-2.jpg" alt="img1-2" />
              </div>
              <div class="desc1-txt">
                <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
                  얼음을 얼리는 냉각기 성분인 니켈은<br />
                  관리를 하지 않으면 발암물질로 변질될 수 있습니다.
                </p>
                <p style="color: #495861; font-size: 15px; font-weight: 750">
                  제빙기의 냉각기는 니켈로 도금되어 있는데 주기적인 청소를 하지 않으면 니켈 도금이 조금씩<br />
                  벗겨지면서 그 가루가 수조에 담기게 됩니다. 니켈은 발암물질로 분류되고 있으며, 폐암 및<br />
                  신장암을 유발하는 물질로 잘 알려져 있기 때문에 각별한 관리가 필요합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="intro-section1-desc3">
          <div class="desc3-img">
            <img src="/public/introbing/introsub/introcare/1-3.png" alt="img1-3" />
          </div>
          <div class="desc1-txt">
            <p style="color: #212121; font-size: 19px; font-weight: 800; line-height: 1.3">
              2024년 작년 검사 건수 878건으로 증가…<br />
              6월 추가 검사 예고, 식용 얼음 위생관리 강화
            </p>
            <p style="color: #495861; font-size: 15px; font-weight: 750; margin-top: 5%">
              식품의약품안전처가 식용얼음의 위생 관리를 강화하기 위해 지난해부터 검사 건수를 2배 이상<br />
              확대해 운영하고 있다고 19일 밝혔다. 식약처에 따르면, 2023년 483건이던 검사 건수는<br />
              2024년 878건으로 증가했으며, 올해 2월에만 389건의 검사를 진행했다.<br />
              추가적인 점검은 오는 6월에도 실시될 예정이다. 이번 검사에서는 커피 전문점, 음식점 등<br />
              식품 접객업소에서 사용하는 제빙기 얼음을 대상으로 식중독균(살모넬라), 대장균, 세균수 기준을<br />
              점검했으며, 2건이 부적합 판정을 받았다.<br />
              식약처는 “식품 소비 트렌드 변화에 맞춰 선제적으로 안전 관리를 강화해 국민이 안심하고 먹을<br />
              수 있는 환경을 조성해 나가겠다” 고 밝혔다.<br />
            </p>
          </div>
        </div>
        <!-- 2.제빙기 케어가 필요한 시점은? -->
        <div class="intro-section1">
          <div class="intro-section1-title">
            <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">2.</p>
            <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
              제빙기 케어가 필요한 시점은?
            </p>
            <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p3">
              평상시에는 3개월에 한번 여름철에는 최소 1~2개월에 한번 완전분해 케어가 필요합니다.
            </p>
          </div>
          <div class="care-section">
            <div class="care-item" v-for="(item, index) in careList" :key="index">
              <img :src="item.image" :alt="item.text" />
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
        <!-- 3.제빙기 케어 진행 과정 -->
        <div class="intro-section1">
          <div class="intro-section1-title">
            <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">3.</p>
            <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">제빙기 케어 과정</p>
          </div>
          <div class="care-section2">
            <div class="care-item2" v-for="(item, index) in careList2" :key="index">
              <img :src="item.image" :alt="item.text" />
              <p v-html="item.text"></p>
            </div>
          </div>
        </div>
        <!-- 4.제빙기 청소시 어떤 세제를 사용하시나요? -->
        <div class="intro-section1">
          <div class="intro-section1-title">
            <p style="color: #1456fd; font-size: 45px; font-weight: 800" class="intro-section1-p1">4.</p>
            <p style="color: #212121; font-size: 36px; font-weight: 750" class="intro-section1-p2">
              제빙기 청소시 어떤 세제를 사용하시나요?
            </p>
          </div>
          <p style="color: #757575; font-size: 18px; font-weight: bold" class="intro-section1-p3">
            제빙기 내부의 오염물과 세균을 깨끗이 제거하고, 최적의 성능을 유지하여 위생적인 얼음 생산 환경을
            제공합니다.<br />
            잔여물과 불순물로 인한 위생 문제와 성능 저하를 예방해 언제나 신선한 얼음을 만드실 수 있도록 돕습니다.<br />
            정기적인 관리로 얼음의 위생 수준을 높이는 것은 물론, 부품 마모와 고장을 방지해 제빙기의 수명을
            연장합니다.<br />
          </p>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped></style>
