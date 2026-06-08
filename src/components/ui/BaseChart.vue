<template>
  <div class="base-chart-container flex items-center justify-center w-full" :style="{ height: wrapperHeight }">
    <apexchart
      :type="type"
      :height="height"
      :width="width"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import apexchart from "vue3-apexcharts";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
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
    default: "100%",
  },
  width: {
    type: [String, Number],
    default: "100%",
  },
});

// Helper to set container height based on height prop
const wrapperHeight = computed(() => {
  if (typeof props.height === "number") return `${props.height}px`;
  return props.height;
});
</script>

<style scoped>
.base-chart-container {
  overflow: hidden;
}
</style>
