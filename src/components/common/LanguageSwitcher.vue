<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const isOpen = ref(false);
const { locale } = useI18n();
const languages = ["ar", "en"];
</script>

<template>
  <div class="language relative h-10">
    <button
      type="button"
      @click="isOpen = !isOpen"
      @keydown.escape="isOpen = false"
      class="flex items-center gap-1 bg-white rounded-full py-2 px-3 shadow-md border border-[#a0a0a0] text-[#0d1e3e] font-semibold cursor-pointer"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-label="$t('header.select_language')"
    >
      <!-- Fixed Globe Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-[18px] h-[18px] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>

      <!-- Text: Full on desktop, initials on mobile -->
      <span class="px-1 shrink-0">
        <span class="hidden md:inline">{{ $t(`lang.${locale}`) }}</span>
        <span class="inline md:hidden">{{ locale === "ar" ? "ع" : "EN" }}</span>
      </span>

      <!-- Caret Down Icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 transition-transform shrink-0"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      role="listbox"
      class="absolute top-full inset-s-0 mt-1 bg-white rounded-xl shadow-lg w-32 overflow-hidden z-50 border border-gray-100 text-[#0d1e3e] font-semibold"
    >
      <button
        v-for="code in languages"
        :key="code"
        type="button"
        role="option"
        :aria-selected="locale === code"
        @click="
          locale = code;
          isOpen = false;
        "
        class="w-full px-4 py-2.5 hover:bg-gray-100 transition-colors flex items-center justify-between cursor-pointer"
      >
        <span>{{ $t(`lang.${code}`) }}</span>
        <span v-if="locale === code" class="text-[#1abc9c] font-bold">✓</span>
      </button>
    </div>
  </div>
</template>
