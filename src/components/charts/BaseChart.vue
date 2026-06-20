<script setup>
import { computed } from "vue";
import apexchart from "vue3-apexcharts";

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: [String, Number],
    default: "300",
  },
  width: {
    type: [String, Number],
    default: "", // Default to empty string to detect if width is not specified
  },
});

// Deep merge helper to combine nested options safely
function deepMerge(target, source) {
  const output = { ...target };
  if (
    target &&
    typeof target === "object" &&
    source &&
    typeof source === "object"
  ) {
    Object.keys(source).forEach((key) => {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

// Core design system chart defaults
const defaultOptions = {
  chart: {
    background: "transparent",
    fontFamily: "Neo Sans Arabic, sans-serif",
    toolbar: {
      show: false,
    },
  },
  states: {
    hover: {
      filter: { type: "none" },
    },
    active: {
      filter: { type: "none" },
    },
  },
  tooltip: {
    theme: "dark",
  },
};

const mergedOptions = computed(() => {
  return deepMerge(defaultOptions, props.options);
});
</script>

<template>
  <div class="base-chart-container flex items-center justify-center w-full">
    <apexchart
      :height="height"
      :width="width"
      :options="mergedOptions"
      :series="series"
    />
  </div>
</template>

<style scoped>
@media (max-width: 1023px) {
  :deep(.vue-apexcharts),
  :deep(.apexcharts-canvas),
  :deep(.apexcharts-canvas svg) {
    width: 100% !important;
    height: 100% !important;
  }
  :deep(.apexcharts-xaxis-label) {
    font-size: 5px !important;
  }
}
</style>
