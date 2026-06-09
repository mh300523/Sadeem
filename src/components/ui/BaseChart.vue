<template>
  <div class="base-chart-container flex items-center justify-center w-full">
    <apexchart
      :height="height"
      :width="width"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script setup>
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
    default: "100%",
  },
});
</script>

<style scoped></style>
