<script setup>
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // 💙 이게 저 UI 스타일!
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

const router = useRouter();
const reservTab = ref("reserv"); // 탭
const calendar = ref(null); //캘린더

const config = {
  enableTime: false,
  dateFormat: "Y-m-d",
};

// 1. 기본정보 : 주소 검색
function loadDaumPostcodeScript() {
  return new Promise((resolve, reject) => {
    if (window.daum && window.daum.Postcode) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => resolve();
    script.onerror = () => reject("Daum 우편번호 스크립트 로드 실패");
    document.head.appendChild(script);
  });
}

async function openPostcode() {
  await loadDaumPostcodeScript();

  new window.daum.Postcode({
    oncomplete: (data) => {
      formData.value.roadAddress = data.roadAddress; // 이 한 줄로 주소 자동입력!
      setTimeout(() => {
        step.value = 2; // 다음 단계로 넘어가기
      }, 300);
    },
  }).open();
}

//2. 제빙기 정보: 각 카드마다 count 관리
const cardTypes = ref([
  {
    id: "standard",
    name: "스탠다드",
    options: [
      { label: "50Kg미만", price: 99900, count: 0 },
      { label: "50Kg~100Kg", price: 120000, count: 0 },
    ],
  },
  {
    id: "deluxe",
    name: "디럭스",
    options: [
      { label: "100~200Kg", price: 150000, count: 0 }, // 한 개만 있는 경우
    ],
  },
  {
    id: "premium",
    name: "프리미엄",
    options: [{ label: "200Kg이상", price: 170000, count: 0 }],
  },
  {
    id: "hoshizaki",
    name: "호시자키",
    options: [
      { label: "250Kg 미만", price: 170000, count: 0 },
      { label: "250Kg 이상", price: 210000, count: 0 },
    ],
  },
]);

// 총 금액 계산
const totalPrice = computed(() =>
  cardTypes.value.reduce((sum, card) => {
    return (
      sum +
      card.options.reduce(
        (optionSum, option) => optionSum + option.count * option.price,
        0
      )
    );
  }, 0)
);

const serviceOptions = ref([
  { label: "제빙기 점검 서비스(1회)", price: 49900, selected: false },
  { label: "응급 출장(예약 당일 청소)", price: 20000, selected: false },
  { label: "프라임몰 세제", price: 9900, selected: false },
  { label: "자가 점검 키트(세균 검사)", price: 4900, selected: false },
]);

// 서비스 금액 계산
const servicePrice = computed(() =>
  serviceOptions.value.reduce(
    (sum, service) => sum + (service.selected ? service.price : 0),
    0
  )
);
const finalPrice = computed(() => totalPrice.value + servicePrice.value);

// 3. 예약정보 (달력)
onMounted(() => {
  flatpickr(calendar.value, {
    locale: "ko",
    dateFormat: "Y-m-d",
    minDate: minDate.value,
    onChange: function (selectedDates) {
      formData.value.selectedDate = selectedDates[0]; // 또는 포맷팅된 문자열
    },
  });
});

const minDate = computed(() => {
  const today = new Date();
  console.log(today.toISOString());

  return today.toISOString().split("T")[0];
});

// 폼 데이터 받아오기
const formData = ref({
  name: "",
  phone: "",
  type: "business",
  roadAddress: "",
  detailAddress: "",
  selectedDate: null,
  dateRestricted: null,
  desiredTime: "",
  gender: "anything",
  notes: "",
});

// 예약 취소 처리
// 사용자 확인후 홈페이지로 이동
const handleCancel = () => {
  if (confirm("예약을 취소하시겠습니까?")) {
    router.push("/");
  }
};
// 모든 필드가 입력되었는지 확인
const isFormVaild = computed(() => {
  return (
    formData.value.name &&
    formData.value.phone &&
    formData.value.type &&
    formData.value.roadAddress &&
    formData.value.detailAddress &&
    formData.value.calendar &&
    formData.value.selectedDate &&
    formData.value.dateRestricted &&
    formData.value.desiredTime &&
    formData.value.gender &&
    formData.value.notes
  );
});
</script>

<template>
  <div class="reserv-wrap">
    <div class="reserv_top" style="margin-top: 80px">
      <div class="banner">
        <img
          class="reserv_visual"
          src="/reservation/reservsub/reservation_banner.png"
          alt="예약하기배너"
        />
        <div class="reserv_txtbox">
          <p class="detail-info">
            필요할 때마다 시원하게! 얼음처럼 투명한 케어
          </p>

          <p
            class="bannerTitle"
            style="font-size: 58px; font-weight: bold; line-height: 1.15"
          >
            <b style="color: #1456fd">빙프라임</b>
            <br />
            구독 요금제
          </p>

          <router-link
            to="/BingPrime"
            class="detail-nav"
            style="color: #1456fd; font-weight: bold"
          >
            구독하러가기 →</router-link
          >
        </div>
      </div>
      <!-- 탭 -->
      <nav>
        <ul class="reserv_tab">
          <li
            v-on:click="reservTab = 'reserv'"
            :style="{
              color: reservTab === 'reserv' ? '#212121' : '#9e9e9e',
            }"
          >
            예약하기
          </li>
          <p>|</p>
          <li
            v-on:click="reservTab = 'reservConfirm'"
            :style="{
              color: reservTab === 'reservConfirm' ? '#212121' : '#9e9e9e',
            }"
          >
            예약조회
          </li>
        </ul>
      </nav>
    </div>

    <main>
      <div class="reserv inner" v-if="reservTab === 'reserv'">
        <div class="progress_bar"></div>
        <form @submit.prevent="handleSubmit">
          <!-- 1. 기본정보 -->
          <fieldset class="basic_information">
            <input
              type="text"
              v-model="formData.name"
              name="name"
              class="name"
              placeholder="이름"
              required
            />
            <input
              type="tel"
              v-model="formData.phone"
              name="phone"
              class="phone"
              placeholder="연락처"
              required
            />
            <div class="radio-group">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="business"
                  v-model="formData.type"
                />
                <span style="font-weight: bold">사업장</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="home"
                  v-model="formData.type"
                />
                <span style="font-weight: bold">가정</span>
              </label>
            </div>
            <input
              type="text"
              class="address"
              v-model="formData.roadAddress"
              placeholder="주소"
              readonly
            />
            <button type="button" @click="openPostcode">
              <img src="/reservation/reservsub/search.png" alt="검색아이콘" />
            </button>
            <input
              v-model="formData.detailAddress"
              type="text"
              id="detailAddress"
              placeholder="상세주소"
              required
            />
          </fieldset>
          <!-- 2. 제빙기 정보 -->
          <fieldset class="icemaker_information">
            <p class="detail-title" style="color: #9abae3">
              ❄ 청소할 제빙기의 용량을 선택해주세요.
            </p>

            <div class="reserv_card_wrap">
              <div
                v-for="(card, cardIndex) in cardTypes"
                :key="card.id"
                class="reserv_card"
              >
                <p class="card_title detail-title">[{{ card.name }}]</p>

                <div
                  class="card_inner"
                  v-for="(option, optionIndex) in card.options"
                  :key="optionIndex"
                >
                  <div class="card_info">
                    <p class="detail-txt" style="font-weight: bold">
                      {{ option.label }}
                    </p>
                    <p
                      style="font-size: 16px; color: #1456fd; font-weight: bold"
                    >
                      {{ option.price.toLocaleString() }}원
                    </p>
                  </div>
                  <div class="card_count">
                    <button
                      type="button"
                      @click="option.count > 0 && option.count--"
                      style="color: red; cursor: pointer"
                    >
                      -
                    </button>
                    <b>{{ option.count }}</b>
                    <button
                      type="button"
                      @click="option.count++"
                      style="color: #1456fd; cursor: pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 총 금액 -->
            <hr class="dotted-line" />
            <p style="font-size: 16px; text-align: right">
              결제 예상 금액:
              <b style="font-size: 18px; font-weight: bold">{{
                totalPrice.toLocaleString()
              }}</b>
              원
            </p>
          </fieldset>
          <!-- 쿠폰 배너 -->
          <div class="coupon">
            <img
              src="/reservation/reservsub/reservation_coupon.png"
              alt="쿠폰"
            />

            <img
              class="infoicon"
              src="/reservation/reservsub/reservation_infoicon.png"
              alt=""
            />
            <router-link
              to="/BingPrime"
              class="detail-title coupon_ment"
              style="color: #1456fd; font-weight: bold"
            >
              가입하기 ></router-link
            >
          </div>
          <!-- 3. 예약 정보 -->
          <fieldset class="reservation_information">
            <p class="detail-title reservTitle" style="color: #407bff">
              <img
                src="/reservation/reservsub/calendar-check.png"
                alt="캘린더"
              />
              청소할 날짜와 시간을 선택해주세요.
            </p>
            <div class="date_box">
              <div class="calendar">
                <p class="detail-txt">* 날짜를 선택해주세요</p>
                <input
                  ref="calendar"
                  class="date"
                  :min="minDate"
                  type="text"
                  placeholder="날짜 선택"
                  v-model="formData.selectedDate"
                  :config="config"
                />
              </div>
              <!-- 날짜 선택 후 라디오 -->
              <transition class="selectedDate" name="fade">
                <div v-if="formData.selectedDate">
                  <p class="detail-txt">* 해당 날짜에만 청소가 가능한가요?</p>
                  <div class="label">
                    <label
                      :class="[
                        'radio-button',
                        { selected: dateRestricted === 'yes' },
                      ]"
                    >
                      <input
                        type="radio"
                        value="yes"
                        v-model="formData.dateRestricted"
                      />
                      네, 선택한 날짜에만 가능해요
                    </label>

                    <label
                      :class="[
                        'radio-button',
                        { selected: dateRestricted === 'no' },
                      ]"
                    >
                      <input
                        type="radio"
                        value="no"
                        v-model="formData.dateRestricted"
                      />
                      아니요, 날짜 협의가 가능합니다
                    </label>
                  </div>
                </div>
              </transition>
            </div>
            <!-- 희망시간선택 -->
            <transition class="selectTime" name="fade">
              <div v-if="formData.dateRestricted" class="fade-box">
                <p class="detail-txt">* 희망하시는 청소 시간을 입력해주세요</p>
                <input
                  type="text"
                  placeholder="ex) 오후 11시 30분 ~ 00시에 방문해주세요"
                  v-model="formData.desiredTime"
                />
              </div>
            </transition>
            <!-- 기사님 선택 -->
            <transition name="fade">
              <div v-if="formData.dateRestricted" class="fade-box">
                <p class="detail-txt">
                  * 희망하시는 기사님 성별을 선택해주세요
                </p>
                <div class="gender-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="anything"
                      v-model="formData.gender"
                    />
                    <span style="font-weight: bold">성별 무관</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      v-model="formData.gender"
                    />
                    <span style="font-weight: bold">여성 기사님</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      v-model="formData.gender"
                    />
                    <span style="font-weight: bold">남성 기사님</span>
                  </label>
                </div>
              </div>
            </transition>
            <!-- 요청사항 -->
            <transition class="selectTime" name="fade">
              <div v-if="formData.dateRestricted" class="fade-box">
                <p class="detail-txt">* 요청사항이 있으신가요?</p>
                <input
                  type="text"
                  v-model="formData.notes"
                  placeholder="ex) 결과 레포트는 pdf파일로 전송해주세요."
                />
              </div>
            </transition>
            <!-- 서비스 선택 -->
            <transition class="selectTime" name="fade">
              <div v-if="formData.dateRestricted" class="fade-box">
                <p class="detail-txt">* 추가로 원하시는 서비스가 있나요?</p>
                <div class="service-options">
                  <label
                    v-for="(service, index) in serviceOptions"
                    :key="index"
                    class="service-option"
                  >
                    <input type="checkbox" v-model="service.selected" />
                    <span class="detail-txt"
                      >{{ service.label }}
                      <p style="color: #1456fd; margin-left: 32px">
                        +{{ service.price.toLocaleString() }}원
                      </p></span
                    >
                  </label>
                </div>
              </div>
            </transition>
            <!-- 총 금액 -->
            <hr class="dotted-line" />
            <div class="totalprice">
              <p style="font-size: 16px; text-align: right; margin-bottom: 5px">
                결제 예상 금액:
                <b style="font-size: 18px; font-weight: bold">{{
                  finalPrice.toLocaleString()
                }}</b>
                원
              </p>
              <span
                class="detail-txt"
                style="
                  float: right;
                  background: linear-gradient(
                    to top,
                    #e9ff54 50%,
                    transparent 80%
                  );
                  width: fit-content;
                "
              >
                지금 빙프라임을 구독하시면
                <router-link
                  to="/Bingprime"
                  style="
                    color: red;
                    font-weight: bold;
                    text-decoration: underline;
                  "
                  >{{
                    Math.floor(
                      totalPrice * 0.75 + servicePrice
                    ).toLocaleString()
                  }}원</router-link
                >에 청소 가능해요!
              </span>
            </div>
            <div class="reservBtn_box">
              <button
                class="reservBtn cancelReservation"
                style="background-color: #ccc; color: #fff"
                @click="handleCancel"
              >
                예약취소하기
              </button>
              <button
                class="reservBtn confirmReservation"
                style="background-color: #1456fd; color: #fff"
                :disabled="!isFormVaild"
              >
                예약하기
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <div
        class="reserv inner"
        v-if="reservTab === 'reservConfirm'"
        style="height: 2000px"
      ></div>
    </main>
  </div>
</template>
<style scoped></style>
