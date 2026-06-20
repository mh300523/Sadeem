<script setup>
import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";
import ThemeSwitcher from "@/components/common/ThemeSwitcher.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
</script>

<template>
  <header
    class="header flex items-center justify-center lg:justify-between gap-4 lg:gap-2 flex-wrap bg-[url('@/assets/images/Header-bg.png')] bg-cover bg-center bg-no-repeat px-2 lg:px-10 pt-4 pb-14"
  >
    <!-- Right side -->
    <div class="welcome-area hidden lg:flex items-center gap-4">
      <div class="welcome-logo w-[70px] h-[70px] shrink-0">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          width="70"
          height="70"
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
      class="flex items-center gap-2 bg-[#091522]/80 border border-white/5 rounded-full p-1 order-last sm:order-0"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    >
      <RouterLink
        to="/"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
        :class="
          $route.path === '/'
            ? 'bg-gradient-primary text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
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
            ? 'bg-gradient-accent text-white shadow-[0_0_12px_rgba(255,107,53,0.3)]'
            : 'text-white/60 hover:text-white hover:bg-white/5'
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
        type="button"
        class="lock-icon w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform shrink-0"
        :aria-label="$t('header.lock_session')"
      >
        <SvgIcon name="lock" />
      </button>

      <!-- Profile Section -->
      <div
        class="profile-section flex items-center gap-2 ps-2 lg:ps-6 border-s border-white"
      >
        <div
          class="profile-img w-12 h-12 rounded-full overflow-hidden shrink-0"
        >
          <img
            src="@/assets/images/logo.png"
            alt="profile"
            width="48"
            height="48"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="profile-info text-right">
          <div class="text-white font-bold text-[10px] sm:text-base">
            شمس حسان
          </div>
          <div class="text-[#FCFCFD] text-xs">مقيم</div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
