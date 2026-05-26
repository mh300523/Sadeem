<script setup>
import { ref } from "vue";
import { useLocale } from "@/composables/useLocale";

const isOpen = ref(false);

const { locale, setLocale } = useLocale();

const languages = [
  {
    code: "ar",
    translationKey: "lang.ar",
  },
  {
    code: "en",
    translationKey: "lang.en",
  },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLang = (lang) => {
  setLocale(lang);
  isOpen.value = false;
};
</script>

<template>
  <div class="language relative h-10">
    <button
      type="button"
      @click="toggleDropdown"
      class="flex items-center gap-1 bg-white rounded-full py-2 px-3 shadow-md cursor-pointer transition-all hover:shadow-lg border border-[#a0a0a0]"
    >
      <div
        class="w-[18px] h-[18px] rounded-full bg-[#1abc9c] flex items-center justify-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <span class="text-[#0d1e3e] font-semibold text-sm px-1">
        {{ $t(`lang.${locale}`) }}
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-[#0d1e3e] transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-show="isOpen"
      class="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg w-full overflow-hidden z-50 border border-gray-100"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        type="button"
        @click="selectLang(lang.code)"
        class="w-full px-4 py-2 hover:bg-gray-100 text-[#0d1e3e] text-sm font-semibold transition-colors flex items-center justify-between"
      >
        <span>
          {{ $t(lang.translationKey) }}
        </span>

        <span v-if="locale === lang.code" class="text-[#1abc9c]"> ✓ </span>
      </button>
    </div>
  </div>
</template>
