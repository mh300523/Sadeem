<script setup>
import { useI18n } from "vue-i18n";

defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  tabName: {
    type: String,
    required: false,
    default: "",
  },
});

const { t } = useI18n();
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center py-16 px-4 border border-theme-card-border/50 bg-theme-card/40 rounded-3xl backdrop-blur-xl shadow-2xl animate-fade-in"
  >
    <div
      class="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_30px_rgba(137,90,247,0.2)]"
    >
      <svg
        class="w-10 h-10 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
      <!-- Subtle glow dot -->
      <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500"
        ></span>
      </span>
    </div>

    <h3 class="text-xl md:text-2xl font-bold text-theme-text mb-2 text-center">
      <span v-if="tabName">{{ tabName }}</span>
      <span v-else>{{ t("details.coming_soon") }}</span>
      - {{ t("details.coming_soon") }}
    </h3>

    <p class="text-slate-400 md:text-base max-w-md text-center leading-relaxed">
      {{ t("details.coming_soon_desc") }}
    </p>

    <!-- Decorative elements -->
    <div class="mt-8 flex gap-2">
      <div class="w-1.5 h-1.5 rounded-full bg-purple-500/30"></div>
      <div class="w-1.5 h-1.5 rounded-full bg-purple-500/50"></div>
      <div class="w-8 h-1.5 rounded-full bg-purple-500"></div>
      <div class="w-1.5 h-1.5 rounded-full bg-purple-500/50"></div>
      <div class="w-1.5 h-1.5 rounded-full bg-purple-500/30"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
