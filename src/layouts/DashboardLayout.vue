<template>
  <Header />
  <main
    class="min-h-screen mt-[-40px] p-6 rounded-tl-[40px] rounded-tr-[40px] bg-[linear-gradient(to_right,_#02142D_29%,_rgba(0,0,0,0.31)_100%),url('@/assets/images/Header-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed"
  >
    <RouterView />
  </main>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import { RouterView } from "vue-router";
</script>
