<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseSparklineBars from "@/components/ui/BaseSparklineBars.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

defineProps({
  screens: {
    type: Object,
    required: true,
  },
  activeScreen: {
    type: String,
    required: true,
  },
  liveSignal: {
    type: Object,
    required: true,
  },
  quickActions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:activeScreen"]);
</script>

<template>
  <aside class="lg:col-span-3">
    <BaseBox class="border border-white/10 rounded-2xl py-6">
      <!-- Brand logo section -->
      <div class="px-6 pb-[20px] border-b border-white/40 mb-4">
        <h1 class="sidebar-gradient-title secondery-text-gradient">
          {{ $t("analytics.sidebar.brand_title") }}
        </h1>
        <p class="text-white">
          {{ $t("analytics.sidebar.brand_subtitle") }}
        </p>
      </div>

      <!-- Navigation tabs -->
      <div class="px-6">
        <ul class="divide-y divide-white/20">
          <li v-for="scrKey in Object.keys(screens)" :key="scrKey" class="py-4">
            <button
              @click="emit('update:activeScreen', scrKey)"
              class="w-full flex justify-between items-center gap-3.5 cursor-pointer font-medium text-white text-base md:text-lg hover:text-[#FF6B35]"
            >
              <div class="flex items-center gap-2.5">
                <span
                  v-if="activeScreen === scrKey"
                  class="w-1.5 h-1.5 rounded-full bg-[#34d3ff] shadow-[0_0_8px_rgba(52,211,255,0.8)]"
                ></span>
                <span>{{ $t(`analytics.screens.${scrKey}`) }}</span>
              </div>
              <!-- Left pointing chevron in RTL, right in LTR -->
              <svg
                class="w-5 h-5 shrink-0 transform rtl:rotate-0 ltr:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <!-- Live Signal module -->
      <div class="px-6 mb-6">
        <BaseAnalyticBox class="pt-[20px] px-4">
          <h4 class="text-[#05D989] font-medium uppercase">
            {{ $t("analytics.live_signal") }}
          </h4>

          <div class="flex items-center justify-between mt-2">
            <h5 class="text-xs text-white/76">
              {{ $t("analytics.total_platform_ideas") }}
            </h5>
            <span class="text-white text-3xl font-extrabold italic">
              {{ liveSignal.value }}
            </span>
          </div>
          <!-- indicator bars -->
          <BaseSparklineBars :data="liveSignal.sparkline" />
        </BaseAnalyticBox>
      </div>

      <!-- Quick Actions list -->
      <div class="px-6">
        <!-- Orange pill button-style header -->
        <h2
          class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
        >
          {{ $t("analytics.quick_actions") }}
        </h2>
        <BaseButton
          v-for="action in quickActions"
          :key="action.id"
          class="w-full !py-4 !justify-between !rounded-2xl border border-white/10 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl text-white hover:translate-x-[-2px] mb-3"
        >
          {{ $t(action.labelKey) }}
        </BaseButton>
      </div>
    </BaseBox>
  </aside>
</template>
