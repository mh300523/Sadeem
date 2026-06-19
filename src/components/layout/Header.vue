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
    <nav
      class="hidden lg:flex items-center gap-2 bg-[#091522]/80 border border-white/5 rounded-full p-1"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    >
      <RouterLink
        to="/"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
        :class="
          $route.path === '/'
            ? 'gradient-purple text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        "
      >
        {{ $t("dashboard.idea_evaluation_dashboard") }}
      </RouterLink>
      <RouterLink
        to="/analytics"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
        :class="
          $route.path.startsWith('/analytics')
            ? 'gradient-orange text-white shadow-[0_0_12px_rgba(255,107,53,0.3)]'
            : 'text-white/60 hover:text-theme-text hover:bg-white/5'
        "
      >
        {{ $t("analytics.title") }}
      </RouterLink>
    </nav>

    <!-- Left side Tools and Profile -->
    <div class="header-tools flex items-center gap-3 sm:gap-4">
      <!-- Language Switcher -->
      <LanguageSwitcher />

      <!-- Theme Switcher -->
      <ThemeSwitcher />

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
          <div class="text-theme-text font-bold text-[17px]">شمس حسان</div>
          <div class="text-[#FCFCFD] text-xs">مقيم</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";
import ThemeSwitcher from "@/components/common/ThemeSwitcher.vue";
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
