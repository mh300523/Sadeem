<script setup>
import { computed } from "vue";

const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
  titleClasses: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    default: 100,
  },
  label: {
    type: String,
    default: "",
  },
  valueText: {
    type: String,
    default: "",
  },
  // Custom fill class, e.g. gradient class
  customFillClass: {
    type: String,
    default:
      "rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#44CCFF] to-[#7F4FFF]",
  },
});

const percentage = computed(() => {
  const pct = (props.value / props.max) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
});
</script>

<template>
  <!-- ProgressBar Row -->
  <div class="flex items-center gap-3 mb-7 last:mb-0" :class="classes">
    <h4 class="text-xs text-white/70 w-26 shrink-0" :class="titleClasses">
      {{ label }}
    </h4>

    <div class="w-full flex items-center gap-2">
      <!-- Bar Track -->
      <div
        class="flex-1 h-5 rounded-full bg-white/10 border border-white/10 overflow-hidden relative"
      >
        <div
          class="h-full rounded-full"
          :class="customFillClass"
          :style="{ width: `${percentage}%` }"
        ></div>
      </div>

      <!-- Numeric value right side if not top labels -->
      <span class="font-bold text-white">
        {{ valueText }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Scoped overrides if needed */
</style>
