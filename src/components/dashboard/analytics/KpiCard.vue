<script setup>
import { computed } from "vue";
import BaseSparklineBars from "@/components/ui/BaseSparklineBars.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    required: true,
  },
  title: {
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

// Custom Color Computations based on growth status
const growthColorClass = computed(() => {
  if (props.growthType === "up") return "text-[#05D989]";
  if (props.growthType === "down") return "text-[#ef4444]";
  return "text-[#f59e0b]";
});
</script>

<template>
  <BaseBox type="glass" class="p-4 cursor-pointer" @click="$emit('select', id)">
    <!-- Header Row: Badge and Title -->
    <div class="flex justify-between items-center gap-2.5">
      <h5 class="text-xs text-white/76">
        {{ title }}
      </h5>
      <span
        class="px-3 py-1.5 rounded-full text-xs"
        :class="badgeColor ? badgeColor : 'text-white bg-white/10'"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Value Row: Main KPI reading -->
    <div class="my-2">
      <span class="text-white text-3xl font-extrabold italic">
        {{ value }}
      </span>
    </div>

    <!-- Sparkline Row: 7 vertical bars matching designs exactly -->
    <BaseSparklineBars v-if="sparkline" :data="sparkline" />

    <!-- Footer Row: Growth & Supporting Metric -->
    <div class="flex justify-between items-center mt-5">
      <span class="text-xs text-white/76">
        {{ changeLabelKey }}
      </span>
      <span
        class="font-medium flex items-center gap-1"
        :class="growthColorClass"
      >
        <SvgIcon
          name="indicator"
          :classes="growthType === 'up' ? 'up' : 'down'"
        />
        {{ percentage }}
      </span>
    </div>
  </BaseBox>
</template>

<style scoped>
/* Override SVG fill/stroke to respect the parent's text color */
:deep(svg [fill]) {
  fill: currentColor !important;
}

:deep(svg [stroke]) {
  stroke: currentColor !important;
}
</style>
