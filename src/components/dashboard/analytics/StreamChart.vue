<template>
  <div class="w-full h-[260px] relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
    <!-- Header Note Inside the Chart Area -->
    <div class="text-xs text-[#d3e9ff] bg-[#0c2340]/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/5 max-w-lg z-10 text-right ltr:text-left leading-relaxed">
      {{ label }}
    </div>

    <!-- Chart Block -->
    <div class="flex-1 w-full relative min-h-[190px]">
      <BaseChart
        type="area"
        height="100%"
        width="100%"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseChart from "@/components/ui/BaseChart.vue";

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    colors: ["#34d3ff", "#8b5cf6", "#f59e0b"],
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
        stops: [0, 95, 100],
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "dark",
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

<style scoped>
/* Area gradient flows are styled dynamically by ApexCharts */
</style>
