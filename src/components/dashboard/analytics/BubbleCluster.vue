<script setup>
import { computed } from "vue";
import BaseChart from "@/components/ui/BaseChart.vue";

const props = defineProps({
  bubbles: { type: Array, required: true },
  height: { type: Number, default: 320 },
});

const positions = [
  { x: 30, y: 55 },
  { x: 55, y: 70 },
  { x: 45, y: 30 },
  { x: 75, y: 45 },
  { x: 70, y: 20 },
  { x: 20, y: 80 },
];

const series = computed(() =>
  props.bubbles.map((b, i) => ({
    name: b.name,
    data: [
      {
        x: positions[i]?.x || 30 + i * 15,
        y: positions[i]?.y || 40 + i * 10,
        z: b.size || b.value,
      },
    ],
  })),
);

const colors = computed(() =>
  props.bubbles.map((b) => b.color?.match(/#[0-9a-fA-F]{6}/)?.[0] || "#34d3ff"),
);

const chartOptions = computed(() => ({
  chart: {
    type: "bubble",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  states: {
    hover: { filter: { type: "none" } },
    active: { filter: { type: "none" } },
  },
  colors: colors.value,
  fill: { opacity: 1 },
  grid: { show: false, padding: { top: -10, right: 0, bottom: -10, left: 0 } },
  xaxis: {
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
    min: 0,
    max: 100,
  },
  yaxis: { labels: { show: false }, min: 0, max: 100 },
  dataLabels: {
    enabled: true,
    formatter: (_val, opts) => [
      opts.w.config.series[opts.seriesIndex].name,
      String(props.bubbles[opts.seriesIndex]?.value ?? ""),
    ],
    style: {
      fontSize: "10px",
      fontFamily: "Neo Sans Arabic, sans-serif",
      fontWeight: "400",
      colors: ["#ffffff"],
    },
  },
  legend: { show: false },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
  plotOptions: {
    bubble: { zScaling: true, minBubbleRadius: 28, maxBubbleRadius: 70 },
  },
}));
</script>

<template>
  <BaseChart
    type="bubble"
    :height="height"
    :options="chartOptions"
    :series="series"
  />
</template>

<style scoped>
/* ApexCharts handles bubble rendering */
</style>
