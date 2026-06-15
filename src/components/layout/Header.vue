<template>
  <header class="header flex items-center justify-between p">
    <!-- Right side -->
    <div class="welcome-area flex items-center gap-4">
      <div class="welcome-logo w-[70px] h-[70px]">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="welcome-title">
        <span class="text-white font-bold block">
          {{ $t("header.welcome_user") }} شمس حسان
        </span>
        <p class="text-white font-bold text-xl md:text-2xl mt-1">
          {{ $t("header.welcome_planet") }}
        </p>
      </div>
    </div>

    <!-- Middle Navigation Switcher -->
    <nav class="hidden lg:flex items-center gap-2 bg-[#091522]/80 border border-white/5 rounded-full p-1" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
      <RouterLink
        to="/"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
        :class="$route.path === '/' ? 'gradient-purple text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'"
      >
        {{ $t("dashboard.idea_evaluation_dashboard") }}
      </RouterLink>
      <RouterLink
        to="/analytics"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
        :class="$route.path.startsWith('/analytics') ? 'gradient-orange text-white shadow-[0_0_12px_rgba(255,107,53,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'"
      >
        {{ $t("analytics.title") }}
      </RouterLink>
    </nav>

    <!-- Left side Tools and Profile -->
    <div class="header-tools flex items-center gap-3 sm:gap-4">
      <!-- Language Switcher -->
      <LanguageSwitcher />

      <!-- Theme Switcher -->
      <button
        class="theme-switcher relative flex items-center w-16 h-10 bg-white rounded-full p-1 shadow-md transition-colors duration-300"
      >
        <!-- The toggle circle with sun icon -->
        <div
          class="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center transform transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-[#FFC107]"
            viewBox="0 0 640 640"
            fill="currentColor"
          >
            <path
              d="M320 32C328.4 32 336.3 36.4 340.6 43.7L396.1 136.3L500.9 110C509.1 108 517.8 110.4 523.7 116.3C529.6 122.2 532 131 530 139.1L503.7 243.8L596.4 299.3C603.6 303.6 608.1 311.5 608.1 319.9C608.1 328.3 603.7 336.2 596.4 340.5L503.7 396.1L530 500.8C532 509 529.6 517.7 523.7 523.6C517.8 529.5 509 532 500.9 530L396.2 503.7L340.7 596.4C336.4 603.6 328.5 608.1 320.1 608.1C311.7 608.1 303.8 603.7 299.5 596.4L243.9 503.7L139.2 530C131 532 122.4 529.6 116.4 523.7C110.4 517.8 108 509 110 500.8L136.2 396.1L43.6 340.6C36.4 336.2 32 328.4 32 320C32 311.6 36.4 303.7 43.7 299.4L136.3 243.9L110 139.1C108 130.9 110.3 122.3 116.3 116.3C122.3 110.3 131 108 139.2 110L243.9 136.2L299.4 43.6L301.2 41C305.7 35.3 312.6 31.9 320 31.9zM320 176C240.5 176 176 240.5 176 320C176 399.5 240.5 464 320 464C399.5 464 464 399.5 464 320C464 240.5 399.5 176 320 176zM320 416C267 416 224 373 224 320C224 267 267 224 320 224C373 224 416 267 416 320C416 373 373 416 320 416z"
            />
          </svg>
        </div>
      </button>

      <!-- Lock Icon -->
      <button
        class="lock-icon w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
      >
        <SvgIcon name="lock" />
      </button>

      <!-- Profile Section -->
      <div
        class="profile-section flex items-center gap-4 ps-6 border-s border-white"
      >
        <div class="profile-img w-[50px] h-[50px] rounded-full overflow-hidden">
          <img
            src="@/assets/images/logo.png"
            alt="profile"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="profile-info text-right">
          <div class="text-white font-bold text-[17px]">شمس حسان</div>
          <div class="text-[#FCFCFD] text-xs">مقيم</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
</script>
<style scoped>
.header {
  background-image: url("../../assets/images/Header-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 17px 50px;
  padding-bottom: 60px;
}
</style>
