<template>
  <div
    class="p-5 rounded-2xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between min-h-[160px] cursor-pointer hover:border-white/10 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 relative select-none"
    @click="$emit('select', id)"
  >
    <!-- Background glow highlight -->
    <div
      class="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#06B6D4]/10 to-transparent rounded-full blur-2xl pointer-events-none"
    ></div>

    <!-- Header Row: Badge and Title -->
    <div class="flex justify-between items-start gap-2.5 w-full">
      <!-- Badge (Left in RTL, Right in LTR) -->
      <span
        class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border order-last ltr:order-first"
        :class="badgeColorClass"
      >
        {{ $t(badgeKey) }}
      </span>
      <!-- Title (Right in RTL, Left in LTR) -->
      <span class="text-xs text-white/50 font-bold order-first ltr:order-last">
        {{ $t(titleKey) }}
      </span>
    </div>

    <!-- Value Row: Main KPI reading -->
    <div class="my-1 text-right ltr:text-left">
      <span class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight select-none">
        {{ value }}
      </span>
    </div>

    <!-- Sparkline Row: 7 vertical bars matching designs exactly -->
    <div class="h-8 flex gap-1.5 items-end my-2 justify-end ltr:justify-start select-none">
      <div
        v-for="(val, idx) in sparkline"
        :key="idx"
        class="w-2.5 rounded-t bg-gradient-to-t from-[#009dfe] to-[#00e2ff] transition-all duration-500 ease-out"
        :style="{ height: `${(val / maxSparklineVal) * 80 + 20}%` }"
      ></div>
    </div>

    <!-- Footer Row: Growth & Supporting Metric -->
    <div class="flex justify-between items-center text-xs w-full pt-1.5 border-t border-white/5">
      <span class="font-bold flex items-center gap-1 order-last ltr:order-first" :class="growthColorClass">
        <span v-if="growthType === 'up'">▲</span>
        <span v-else-if="growthType === 'down'">▼</span>
        <span v-else>●</span>
        {{ percentage }}
      </span>
      <span class="text-white/40 font-medium order-first ltr:order-last">
        {{ $t(changeLabelKey) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  badgeKey: {
    type: String,
    required: true,
  },
  titleKey: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  changeLabelKey: {
    type: String,
    required: true,
  },
  sparkline: {
    type: Array,
    required: true,
  },
  growthType: {
    type: String,
    default: "up", // "up" | "mid" | "down"
  },
  badgeColor: {
    type: String,
    default: "",
  },
});

defineEmits(["select"]);

const maxSparklineVal = computed(() => {
  if (!props.sparkline || props.sparkline.length === 0) return 100;
  return Math.max(...props.sparkline, 10);
});

// Custom Color Computations based on growth status
const growthColorClass = computed(() => {
  if (props.growthType === "up") return "text-[#22c55e]";
  if (props.growthType === "down") return "text-[#ef4444]";
  return "text-[#f59e0b]";
});

const badgeColorClass = computed(() => {
  if (props.badgeColor) return props.badgeColor;
  // Fallback defaults
  if (props.growthType === "up") return "border-[#22c55e]/20 bg-[#22c55e]/10 text-[#22c55e]";
  if (props.growthType === "down") return "border-[#ef4444]/20 bg-[#ef4444]/10 text-[#ef4444]";
  return "border-[#f59e0b]/20 bg-[#f59e0b]/10 text-[#f59e0b]";
});
</script>

<style scoped>
/* Hover transitions are handled globally in Tailwind */
</style>
