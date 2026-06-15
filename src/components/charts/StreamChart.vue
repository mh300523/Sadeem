<script setup>
import { computed } from "vue";
import BaseChart from "./BaseChart.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "area",
      stacked: true,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    colors: ["#FF8E53", "#7F4FFF", "#06B6D4"],
    stroke: {
      curve: "smooth",
      width: 0,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val) => `${val} points`,
      },
    },
  };
});
</script>

<template>
  <BaseAnalyticBox v-if="series.length" class="p-0!">
    <BaseChart :options="chartOptions" :series="series" />
  </BaseAnalyticBox>
</template>

<style scoped>
:deep(.vue-apexcharts),
:deep(.apexcharts-canvas) {
  width: 100% !important;
}
/* Area gradient flows are styled dynamically by ApexCharts */
</style>
