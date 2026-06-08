<template>
  <div class="flex flex-col gap-1.5 w-full text-right ltr:text-left">
    <!-- Optional top labels row -->
    <div v-if="showLabels && (label || valueText)" class="flex justify-between items-center text-xs">
      <span class="text-white/70 font-medium">{{ label }}</span>
      <span class="text-white/50 font-semibold">{{ valueText }}</span>
    </div>

    <!-- ProgressBar Row -->
    <div class="flex items-center gap-3">
      <!-- Label left side if not top labels -->
      <span v-if="!showLabels && label" class="text-xs text-[#d7ebff] w-32 shrink-0 truncate">
        {{ label }}
      </span>

      <!-- Bar Track -->
      <div class="flex-1 h-3 rounded-full bg-white/10 overflow-hidden relative">
        <div
          class="h-full rounded-full transition-all duration-500 ease-out"
          :class="customFillClass"
          :style="fillStyle"
        ></div>
      </div>

      <!-- Numeric value right side if not top labels -->
      <span v-if="!showLabels" class="text-xs font-semibold text-white/60 min-w-10 text-left ltr:text-right">
        {{ valueText || `${percentage}%` }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
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
  showLabels: {
    type: Boolean,
    default: false,
  },
  // Custom fill class, e.g. gradient class
  customFillClass: {
    type: String,
    default: "bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]",
  },
});

const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");

const percentage = computed(() => {
  const pct = (props.value / props.max) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
});

const fillStyle = computed(() => {
  return {
    width: `${percentage.value}%`,
  };
});
</script>

<style scoped>
/* Scoped overrides if needed */
</style>
