<template>
  <Header />
  <main
    class="main-content-bg min-h-screen mt-[-40px] p-6 rounded-t-[40px]"
  >
    <RouterView />
  </main>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import { RouterView } from "vue-router";
</script>
