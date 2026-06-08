<template>
  <div class="w-full h-[320px] relative">
    <BaseChart
      type="treemap"
      height="320"
      width="100%"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseChart from "@/components/ui/BaseChart.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const chartSeries = computed(() => {
  return [
    {
      data: props.data,
    },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "treemap",
      toolbar: {
        show: false,
      },
    },
    colors: ["#34d3ff", "#8b5cf6", "#f59e0b", "#22c55e", "#ec4899", "#22d3ee"],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ["#091522"],
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Neo Sans Arabic, sans-serif",
        fontWeight: "bold",
      },
      offsetY: -4,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => String(val),
      },
    },
  };
});
</script>

<style scoped>
/* Chart-specific scoped styling is handled via BaseChart theme */
</style>
