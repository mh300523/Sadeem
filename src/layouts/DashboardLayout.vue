<template>
  <Header />
  <main
    class="min-h-screen mt-[-40px] p-6 rounded-t-[40px] ltr:bg-[linear-gradient(to_right,rgba(2,20,45,0.8)_60%,rgba(0,0,0,0.8)_100%),url('@/assets/images/Header-bg.png')] rtl:bg-[linear-gradient(to_left,rgba(2,20,45,0.9)_60%,rgba(0,0,0,0.5)_100%),url('@/assets/images/Header-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed"
  >
    <RouterView />
  </main>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import { RouterView } from "vue-router";
</script>
