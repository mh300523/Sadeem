<template>
  <div>
    <!-- Backdrop Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
      @click="$emit('close')"
    ></div>

    <!-- Drawer Panel: Floating with margins matching designs exactly -->
    <aside
      class="fixed top-6 bottom-6 w-[440px] max-w-[90vw] bg-[#071727]/95 backdrop-blur-2xl border border-white/10 z-50 overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-[32px] transition-all duration-300 ease-out p-6 flex flex-col gap-6"
      :class="[
        isRtl ? 'left-6' : 'right-6',
        isOpen 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 pointer-events-none ' + (isRtl ? '-translate-x-12' : 'translate-x-12')
      ]"
      :dir="isRtl ? 'rtl' : 'ltr'"
    >
      <!-- Head Section -->
      <div class="flex justify-between items-start gap-4 pb-2 border-b border-white/5">
        <!-- Close Button (Left in RTL, Right in LTR) -->
        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer shrink-0 order-first ltr:order-last"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Title & Subtitle (Right in RTL, Left in LTR) -->
        <div class="flex-1 text-right ltr:text-left order-last ltr:order-first">
          <h3 class="text-base lg:text-lg font-bold text-[#34d3ff] tracking-tight">
            {{ data?.titleKey ? $t(data.titleKey) : (data?.title || '') }}
          </h3>
          <p class="text-[11px] text-white/50 mt-1 leading-relaxed">
            {{ data?.descKey ? $t(data.descKey) : (data?.desc || '') }}
          </p>
        </div>
      </div>

      <!-- Detailed Metrics List -->
      <div v-if="data?.metrics && data.metrics.length" class="flex flex-col gap-3">
        <div
          v-for="(m, idx) in data.metrics"
          :key="idx"
          class="p-4 rounded-2xl bg-[#0b2035]/30 border border-white/5 text-right ltr:text-left transition-colors hover:bg-white/[0.02]"
        >
          <strong class="block text-xs font-bold text-[#34d3ff] mb-1">
            {{ m.labelKey ? $t(m.labelKey) : m.label }}
          </strong>
          <span class="text-xs text-white/80 leading-relaxed block">
            {{ m.value }}
          </span>
        </div>
      </div>

      <!-- Breakdown Visualization Block -->
      <div v-if="data?.bars && data.bars.length" class="flex flex-col gap-4">
        <h4 class="text-xs font-bold text-[#34d3ff] text-right ltr:text-left uppercase tracking-wider">
          {{ $t('analytics.drawer.breakdown') }}
        </h4>
        <div class="flex flex-col gap-4 bg-[#0b2035]/20 border border-white/5 rounded-2xl p-4">
          <ProgressBar
            v-for="(b, idx) in data.bars"
            :key="idx"
            :value="b.value"
            :max="getMaxValue(data.bars)"
            :label="b.label"
            :valueText="String(b.value)"
            customFillClass="bg-gradient-to-r from-[#00E2FF] to-[#8B5CF6]"
          />
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import ProgressBar from "./ProgressBar.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    default: null,
  },
});

defineEmits(["close"]);

const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

// Helper to determine max bar value dynamically for correct scaling
function getMaxValue(bars) {
  if (!bars || bars.length === 0) return 100;
  const maxVal = Math.max(...bars.map(b => b.value));
  return maxVal > 100 ? maxVal : 100;
}
</script>

<style scoped>
/* Sidebar and drawer slides are handled by CSS translation */
</style>
