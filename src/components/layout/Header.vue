<template>
  <header class="header flex items-center justify-between">
    <div class="welocme-area flex items-center gap-3">
      <div class="welcome-img rounded-full w-[70px] h-[70px] overflow-hidden">
        <img src="@/assets/images/logo.png" alt="logo" />
      </div>
      <div class="welcom-title">
        <span class="text-white font-bold">
          {{ $t("header.welcome_user") }}</span
        >
        <p class="text-white font-bold text-2xl">
          {{ $t("header.welcome_planet") }}
        </p>
      </div>
    </div>

    <div class="header-tools">
      <LanguageSwicher />
    </div>
  </header>
</template>

<script setup>
import LanguageSwicher from "@/components/common/LanguageSwicher.vue";
</script>
<style scoped>
.header {
  background-image: url("../../assets/images/Header-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 17px 50px;
}
</style>
