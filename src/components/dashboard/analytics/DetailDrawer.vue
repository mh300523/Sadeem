<script setup>
import ProgressBar from "./ProgressBar.vue";
import { watchEffect } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

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

watchEffect(() => {
  document.body.classList.toggle("overflow-hidden", props.isOpen);
});

// Helper to determine max bar value dynamically for correct scaling
function getMaxValue(bars) {
  if (!bars || bars.length === 0) return 100;
  const maxVal = Math.max(...bars.map((b) => b.value));
  return maxVal > 100 ? maxVal : 100;
}
</script>

<template>
  <div>
    <!-- Backdrop Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
      @click="$emit('close')"
    ></div>

    <!-- Drawer Panel: Floating with margins matching designs exactly -->
    <aside
      class="fixed! top-0 bottom-0 inset-e-0 w-[485px] max-w-[90vw] z-50 overflow-y-auto transition-all duration-300 ease-out"
      :class="[
        isOpen
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 pointer-events-none rtl:-translate-x-12 ltr:translate-x-12 ',
      ]"
    >
      <div
        class="aside-container min-h-full gradient-border bg-gradient-surface bg-[#02142D] p-4 sm:p-6 rounded-e-none! rounded-s-[40px]!"
      >
        <!-- Head Section -->
        <div class="flex justify-between items-start gap-4 mb-5">
          <!-- Title & Subtitle (Right in RTL, Left in LTR) -->
          <div class="">
            <h2 class="panel-title text-gradient-secondary">
              {{ data?.title }}
            </h2>
            <p class="text-xs text-theme-text/70 leading-relaxed">
              {{ data?.desc }}
            </p>
          </div>
          <!-- Close Button (Left in RTL, Right in LTR) -->
          <button
            @click="$emit('close')"
            class="w-4 h-4 flex items-center justify-center text-theme-text hover:text-danger cursor-pointer"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Detailed Metrics List -->
        <div
          v-if="data?.metrics && data.metrics.length"
          class="flex flex-col gap-3"
        >
          <BaseBox
            v-for="(m, idx) in data.metrics"
            :key="idx"
            class="p-4 rounded-2xl bg-[#0b2035]/30 border border-white/10 transition-colors hover:border-white/30"
          >
            <h3 class="font-meduim text-theme-text mb-1.5">
              {{ m.label }}
            </h3>
            <p class="text-theme-text/70 text-xs leading-relaxed">
              {{ m.value }}
            </p>
          </BaseBox>
        </div>

        <!-- Breakdown Visualization Block -->

        <BaseAnalyticBox v-if="data?.bars && data.bars.length" class="p-4 mt-6">
          <h4 class="font-medium text-theme-text uppercase mb-3">
            {{ $t("analytics.drawer.breakdown") }}
          </h4>
          <ProgressBar
            v-for="(b, idx) in data.bars"
            :key="idx"
            :value="b.value"
            :max="getMaxValue(data.bars)"
            :label="b.label"
            :valueText="String(b.value)"
          />
        </BaseAnalyticBox>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* Sidebar and drawer slides are handled by CSS translation */
</style>
