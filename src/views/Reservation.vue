<script setup>
import { ref, computed, onMounted, watch, nextTick, reactive } from "vue";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_blue.css"; // 💙 이게 저 UI 스타일!
import { Korean } from "flatpickr/dist/l10n/ko.js";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter();
const reservTab = ref("reserv"); // 탭
const calendar = ref(null); //캘린더
const showModal = ref(false); // 예약하기-> 모달
const showFAQ = ref(false);
const normalizePhone = (phone) => phone.replace(/-/g, "").trim();
const matchedReservation = ref(null);
const imageUrl = ref(null);
const reservationFormData = ref({
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

// 쿠키에 저장된 정보 가져오기
onMounted(() => {
  if (reservTab.value === "reservConfirm") {
    const savedData = Cookies.get("reservationData");
    if (savedData) {
      formData.value = JSON.parse(savedData);
    }
  }
});

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

// 선택한 제빙기
// count > 0인 옵션만 추출하는 computed
const selectedIceMakers = computed(() => {
  return cardTypes.value.flatMap((card) =>
    card.options
      .filter((option) => option.count > 0)
      .map((option) => ({
        type: card.name,
        label: option.label,
        count: option.count,
        price: option.price,
      }))
  );
});

// 사진 업로드
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

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

// 서비스 유형
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

let calendarInstance = null;

// flatpickr 초기화 함수
const initCalendar = () => {
  if (calendarInstance) {
    calendarInstance.destroy();
    calendarInstance = null;
  }

  if (calendar.value) {
    calendarInstance = flatpickr(calendar.value, {
      locale: Korean,
      dateFormat: "Y-m-d",
      minDate: minDate.value,
      onChange: function (selectedDates) {
        formData.value.selectedDate = selectedDates[0];
      },
    });
  }
};

// 탭 전환 감지 → 달력 초기화
watch(reservTab, async (newTab) => {
  if (newTab === "reserv") {
    await nextTick(); // DOM이 렌더된 후에
    initCalendar();
  }
});

// 페이지 첫 로드시도 달력 초기화 (탭이 이미 reservation일 경우)
onMounted(async () => {
  if (reservTab.value === "reserv") {
    await nextTick();
    initCalendar();
  }
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
const confirmformData = ref({
  name: "",
  phone: "",
});

// 예약 취소 처리
// 사용자 확인후 홈페이지로 이동
const handleCancel = () => {
  if (confirm("예약을 취소하시겠습니까?")) {
    router.push("/");
  }
};

// 모달 나오게 하기
const handleSubmit = () => {
  showModal.value = true;
};

const confirmReservation = () => {
  showModal.value = false;

  // 기존 예약들 가져오기
  let existingReservations;
  try {
    const parsed = JSON.parse(Cookies.get("reservationData") || "[]");
    existingReservations = Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    existingReservations = [];
  }

  //  새 예약 추가
  existingReservations.push({ ...formData.value });

  // 쿠키에 다시 저장
  Cookies.set("reservationData", JSON.stringify(existingReservations), {
    expires: 3,
  });

  // 예약 완료
  alert("예약이 완료되었습니다!");

  // 예약 조회로 이동
  reservTab.value = "reservConfirm";

  // 입력값 초기화
  formData.value = {
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
  };
};

// 예약 조회하기 누르면
const isReservationMatched = ref(false);

const showReservationInfo = () => {
  const name = confirmformData.value.name.trim();
  const phone = confirmformData.value.phone.trim().replace(/-/g, "");

  if (!name || !phone) {
    alert("이름과 연락처를 모두 입력해주세요.");
    isReservationMatched.value = false;
    return;
  }

  // 쿠키에서 예약 정보 배열 가져오기 (방어적 파싱)
  let storedReservations;
  try {
    const parsed = JSON.parse(Cookies.get("reservationData") || "[]");
    storedReservations = Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    storedReservations = [];
  }

  // 전화번호 비교 시 하이픈 제거
  const matched = storedReservations.find((reservation) => {
    const storedPhone = reservation.phone.replace(/-/g, "");
    return reservation.name === name && storedPhone === phone;
  });

  if (matched) {
    console.log("예약 정보가 일치합니다.");
    matchedReservation.value = matched;
    isReservationMatched.value = true;

    confirmformData.value.name = "";
    confirmformData.value.phone = "";
  } else {
    alert("일치하는 예약 정보가 없습니다.");
    isReservationMatched.value = false;
  }
};

// FAQ
const faqs = reactive([
  {
    id: 1,
    question: "제빙기 청소 출장 가능 지역이 어떻게 되나요?",
    answer:
      "현재 저희 빙프리는 전 지역 지점망이 구축되어 있어, 서울부터 제주도까지 전국적인 서비스가 가능합니다.",
    isOpen: false,
  },
  {
    id: 2,
    question: "제빙기 청소 작업 시간은 어느 정도 소요되나요?",
    answer:
      "평균적으로 1시간 정도 소요됩니다. *제품의 상태 및 주변 환경에 따라 작업 시간이 조금 더 소요될 수 있습니다.",
    isOpen: false,
  },
  {
    id: 3,
    question: "제빙기를 가져가서 청소하시나요?",
    answer:
      "제빙기를 가져가서 청소하게 되면 해당 기간 동안 업소의 입장에선 얼음이 들어가는 음식을 제공할 수 없는 상황이 발생할 수도 있기 때문에 저희 빙프리에서는 제빙기 분해 청소 시 서비스의 차질이 생기시지 않게끔 현장에서 분해 청소를 진행하고 있습니다. ",
    isOpen: false,
  },
  {
    id: 4,
    question: "대량 제빙기 청소 의뢰나 정기적 케어 의뢰도 가능할까요?",
    answer:
      "물론입니다. 대량 제빙기 청소는 제빙기의 대수에 따라 고객님과 스케줄을 조율하고 있고 정기적인 케어 역시 빙프라임 구독을 하시면 스케줄 조정 후 케어 진행하며, 빙프라임 고객님들께는 빙프라임 인증 스티커도 함께 제공해드리고 있습니다.",
    isOpen: false,
  },
  {
    id: 5,
    question: "제빙기 청소 서비스 가능 시간은 어떻게 되나요?",
    answer:
      "업소 오픈 전/후 시간대 및 운영 시간에 상관없이 24시간 작업이 가능하기 때문에 방문 시간은 고객님과 조율하여 진행하고 있습니다.",
    isOpen: false,
  },
  {
    id: 6,
    question: "영수증 발급이 가능한가요?",
    answer:
      "네, 현장에서 영수증을 발급해드립니다. 필요하시다면 이메일로도 발송 가능합니다.",
    isOpen: false,
  },
]);

// 오른쪽 사이드 고탑기능
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// '예약 다시하기' 버튼 클릭 시 실행될 함수
const handleReSubmit = () => {
  const savedData = Cookies.get("reservationData");
  if (savedData) {
    const parsed = JSON.parse(savedData);

    // 배열이면 첫 번째 요소만 formData에 넣기
    formData.value = Array.isArray(parsed) ? parsed[0] : parsed;

    reservTab.value = "reserv";
    isReservationMatched.value = false;
  }
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
  <div class="reserv-wrap">
    <div class="reserv_top" style="margin-top: 80px">
      <div class="banner">
        <img
          class="reserv_visual"
          src="/reservation/reservsub/reservation_banner.png"
          alt="예약하기배너"
        />
        <div class="reserv_txtbox">
          <p
            class="bannerTitle main-h2"
            style="font-weight: bold; line-height: 1.15"
          >
            최대 <b style="color: #1456fd">20% 할인</b>은 기본!
            <br />
            전용 할인 <b style="color: #1456fd">쿠폰</b>까지
          </p>

          <router-link to="/BingPrime">
            <button class="yellowBtn main-h4">구독하기</button>
          </router-link>
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
            <p class="main-h5" style="margin-bottom: 30px">1. 기본 정보</p>
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
            <div class="address_box">
              <input
                type="text"
                class="address"
                v-model="formData.roadAddress"
                placeholder="주소"
                readonly
              />
              
              <button
                class="main-h6"
                style="color: #757575"
                type="button"
                @click="openPostcode"
              >
              | &nbsp&nbsp 검색하기
              </button>
            </div>
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
            <p class="main-h5">2. 제빙기 정보</p>

            <div class="reserv_card_wrap">
              <div
                v-for="(card, cardIndex) in cardTypes"
                :key="card.id"
                class="reserv_card"
              >
                <p class="card_title main-h4">[{{ card.name }}]</p>

                <div
                  class="card_inner"
                  v-for="(option, optionIndex) in card.options"
                  :key="optionIndex"
                >
                  <div class="card_info">
                    <p class="main-h6">
                      {{ option.label }}
                    </p>
                    <p style="font-size: 16px; color: #1456fd">
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
            <div class="image">
              <input type="file" @change="onFileChange" accept="image/*" />
              <img v-if="imageUrl" :src="imageUrl" alt="이미지 미리보기" />
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
              class="main-h4 coupon_ment"
              style="color: #1456fd; font-weight: bold"
            >
              가입하기 ></router-link
            >
          </div>
          <!-- 3. 예약 정보 -->
          <fieldset class="reservation_information">
            <p class="main-h5 reservTitle">3. 예약 정보</p>
            <div class="date_box">
              <div class="calendar">
                <p class="main-h4">* 날짜를 선택해주세요</p>
                <input
                  ref="calendar"
                  class="date"
                  :min="minDate"
                  type="text"
                  placeholder="날짜 선택"
                  v-model="formData.selectedDate"
                />
              </div>
              <!-- 날짜 선택 후 라디오 -->
              <transition class="selectedDate" name="fade">
                <div v-if="formData.selectedDate">
                  <p class="main-h4">* 해당 날짜에만 청소가 가능한가요?</p>
                  <div class="label">
                    <label
                      :class="[
                        'radio-button',
                        { selected: formData.dateRestricted === 'yes' },
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
                        { selected: formData.dateRestricted === 'no' },
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
                <p class="main-h4">* 희망하시는 청소 시간을 입력해주세요</p>
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
                <p class="main-h4">* 희망하시는 기사님 성별을 선택해주세요</p>
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
                <p class="main-h4">* 요청사항이 있으신가요?</p>
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
                <p class="main-h4">* 추가로 원하시는 서비스가 있나요?</p>
                <div class="service-options">
                  <label
                    v-for="(service, index) in serviceOptions"
                    :key="index"
                    class="service-option"
                  >
                    <input type="checkbox" v-model="service.selected" />
                    <span class="main-h4"
                      >{{ service.label }}
                      <p style="color: #1456fd">
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
                class="main-h4"
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
              <button class="main-h4 reservBtn cancel" @click="handleCancel">
                예약취소하기
              </button>
              <button type="submit" class="main-h4 reservBtn">예약하기</button>
            </div>
          </fieldset>
        </form>

        <!-- 모달창 -->
        <transition name="fade">
          <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
              <div class="basic_info">
                <p class="main-h3">예약 정보</p>
                <hr class="dotted-line" />
                <p class="main-h4">
                  <b>{{ formData.name }} </b>님
                </p>
                <p class="main-h4">
                  <strong>주소:</strong> {{ formData.roadAddress }}
                  {{ formData.detailAddress }}
                </p>
                <p class="main-h4">
                  <strong>예약날짜:</strong>
                  {{ formData.selectedDate }}
                  {{ formData.desiredTime }}
                </p>
                <p class="main-h4">
                  <strong>요청사항:</strong> {{ formData.notes }}
                </p>
                <p
                  style="font-size: 16px; text-align: right; margin-bottom: 5px"
                >
                  결제 예상 금액:
                  <b style="font-size: 18px; font-weight: bold">{{
                    finalPrice.toLocaleString()
                  }}</b>
                  원
                </p>
              </div>
              <hr class="dotted-line" />
              <div class="notice-box">
                <p class="main-h4" style="font-weight: bold; color: red">
                  ! 꼭 지켜주세요
                </p>
                <ul
                  style="
                    padding-left: 0;
                    list-style: none;
                    color: #555;
                    font-size: 14px;
                  "
                >
                  <li style="margin-bottom: 6px">
                    <p class="notice-title" style="color: red">✳ 전원 차단</p>
                    청소 전 제빙기의 전원을 미리 차단해 주세요.
                  </li>
                  <li style="margin-bottom: 6px">
                    <p class="notice-title" style="color: red">✳ 공간 확보</p>
                    원활한 작업을 위해 제빙기 주변의 장애물을 정리해 주세요.
                  </li>
                  <li>
                    <p class="notice-title" style="color: red">
                      ✳ 주차 공간 제공
                    </p>
                    기술자의 원활한 방문을 위해 주차 공간을 미리 확보해 주세요.
                  </li>
                </ul>
                <hr class="dotted-line" />
                <div>
                  <p
                    style="
                      font-weight: bold;
                      color: #5cb85c;
                      margin-bottom: 4px;
                    "
                  >
                    ? 청소 진행 및 소요 시간
                  </p>
                  <ul
                    style="
                      padding-left: 0;
                      list-style: none;
                      color: #555;
                      font-size: 14px;
                    "
                  >
                    <li style="margin-bottom: 6px">
                      <p class="notice-title" style="color: green">
                        ✳ 청소 시간
                      </p>
                      평균 1~2시간 소요되며, 오염 상태에 따라 변동될 수
                      있습니다.
                    </li>
                    <li style="margin-bottom: 6px">
                      <p class="notice-title" style="color: green">
                        ✳ 소음 발생
                      </p>
                      청소 과정에서 일부 소음이 발생할 수 있습니다.
                    </li>
                    <li>
                      <p class="notice-title" style="color: green">
                        ✳ 배수 필요
                      </p>
                      청소 중 일정량의 물이 배출될 수 있으니 참고해 주세요.
                    </li>
                  </ul>
                </div>
              </div>
              <div class="modal-buttons">
                <button @click="confirmReservation" class="confirm">
                  확인
                </button>
                <button @click="showModal = false" class="cancel">취소</button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="reservConfirm inner" v-if="reservTab === 'reservConfirm'">
        <!-- 예약조회 정보 -->
        <fieldset class="confirm_info">
          <input
            type="text"
            v-model="confirmformData.name"
            name="name"
            class="confirmname"
            placeholder="이름"
            required
          />
          <input
            type="tel"
            v-model="confirmformData.phone"
            name="phone"
            class="confirmphone"
            placeholder="연락처"
            required
          />
          <button type="button" class="reservBtn" @click="showReservationInfo">
            예약조회하기
          </button>
        </fieldset>
        <!-- 쿠폰 배너 -->
        <div class="coupon">
          <img src="/reservation/reservsub/reservation_coupon.png" alt="쿠폰" />

          <img
            class="infoicon"
            src="/reservation/reservsub/reservation_infoicon.png"
            alt=""
          />
          <router-link
            to="/BingPrime"
            class="main-h3 coupon_ment"
            style="color: #1456fd; font-weight: bold"
          >
            가입하기 ></router-link
          >
        </div>
        <!-- 진행 중인 예약 -->
        <fieldset v-if="isReservationMatched" class="result_info">
          <p class="main-h3 info-title" style="color: #9abae3">
            <img
              class="calendar"
              src="/reservation/reservsub/calendar-check.png"
              alt="달력"
            />
            진행 중인 예약
          </p>
          <hr />
          <div class="reservation-info-box">
            <p class="main-h4">
              <b>{{ matchedReservation.name }} </b>님
            </p>
            <span
              v-if="selectedIceMakers.length > 0"
              class="main-h5"
              style="font-size: 24px; font-weight: 800; color: #1456fd"
            >
              [{{ selectedIceMakers[0].type }}] {{ selectedIceMakers[0].label }}
              <template v-if="selectedIceMakers.length > 1">
                외 {{ selectedIceMakers.length - 1 }}개
              </template>
            </span>
            <ul class="reservation-info-list" style="list-style: none">
              <li>
                <p class="main-h4">
                  <strong>일정</strong>
                  {{ matchedReservation.selectedDate }}
                  {{ matchedReservation.desiredTime }}
                </p>
              </li>
              <li>
                <p class="main-h4">
                  <strong>요청</strong> {{ matchedReservation.notes }}
                </p>
              </li>
              <li>
                <p class="main-h4">
                  <strong style="font-weight: bold">금액</strong>
                  {{ finalPrice.toLocaleString() }}
                  원
                </p>
              </li>
            </ul>
          </div>
          <button
            v-on:click="handleReSubmit"
            type="button"
            class="retryreservationBtn"
          >
            예약수정하기
          </button>
        </fieldset>
        <!-- 자주 묻는 질문 -->
        <fieldset class="faq-box" v-if="isReservationMatched">
          <p class="main-h3" style="color: #424242">
            자주 묻는 질문
            <span style="color: #424242" v-on:click="showFAQ = !showFAQ">{{
              showFAQ ? "접기 ▲" : "펼치기 ▼"
            }}</span>
          </p>
          <hr style="margin: 10px 0" />
          <div
            class="faq-list"
            v-if="showFAQ"
            v-for="faq in faqs"
            :key="faq.id"
          >
            <p class="main-h4" style="font-weight: 800; color: #424242">
              Q. {{ faq.question }}
            </p>
            <p
              class="main-h5"
              style="color: #888; font-weight: 500; line-height: 1.5 !important"
            >
              A. {{ faq.answer }}
            </p>
          </div>
        </fieldset>
        <!-- 지난 예약 내역 -->
        <fieldset v-if="isReservationMatched" class="result_info past">
          <p class="main-h3 info-title" style="color: #888">
            <img
              class="calendar"
              src="/reservation/reservsub/calendar-check.png"
              alt="달력"
            />
            지난 예약 내역
          </p>
          <hr />
          <div class="reservation-info-box">
            <p class="main-h4">
              <b>{{ matchedReservation.name }} </b>님
            </p>
            <span
              v-if="selectedIceMakers.length > 0"
              class="main-h5"
              style="font-size: 24px; font-weight: 800; color: #1456fd"
            >
              [{{ selectedIceMakers[0].type }}] {{ selectedIceMakers[0].label }}
              <template v-if="selectedIceMakers.length > 1">
                외 {{ selectedIceMakers.length - 1 }}개
              </template>
            </span>
            <ul class="reservation-info-list" style="list-style: none">
              <li>
                <p class="main-h4">
                  <strong>일정</strong>
                  {{ matchedReservation.selectedDate }}
                  {{ matchedReservation.desiredTime }}
                </p>
              </li>
              <li>
                <p class="main-h4">
                  <strong>요청</strong> {{ matchedReservation.notes }}
                </p>
              </li>
              <li>
                <p class="main-h4">
                  <strong style="font-weight: bold">금액</strong>
                  {{ finalPrice.toLocaleString() }}
                  원
                </p>
              </li>
            </ul>
          </div>
          <div class="reservBtn_box">
            <button v-on:click="handleReSubmit" class="pastBtn">
              다시 예약하기
            </button>
            <router-link to="/review"
              ><button class="pastBtn">리뷰 쓰기</button></router-link
            >
          </div>
        </fieldset>
      </div>
    </main>
  </div>
</template>
<style scoped></style>
