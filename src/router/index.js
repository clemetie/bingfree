import { createRouter, createWebHistory } from "vue-router";
import BingFree from "@/views/BingFree.vue";
import BingPrime from "@/views/BingPrime.vue";
import FreeMall from "@/views/FreeMall.vue";
import IntroBing from "@/views/IntroBing.vue";
import Price from "@/views/Price.vue";
import Review from "@/views/Review.vue";
import Reservation from "@/views/Reservation.vue";

const routes = [
  {
    path: "/",
    component: BingFree,
  },
  {
    path: "/BingPrime",
    component: BingPrime,
  },
  {
    path: "/FreeMall",
    component: FreeMall,
  },
  {
    path: "/IntroBing",
    component: IntroBing,
  },
  {
    path: "/Price",
    component: Price,
  },
  {
    path: "/Review",
    component: Review,
  },
  {
    path: "/Reservation",
    component: Reservation,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
