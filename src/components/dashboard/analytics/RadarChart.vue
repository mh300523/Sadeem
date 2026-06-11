<script setup>
import { computed } from "vue";
import BaseChart from "@/components/ui/BaseChart.vue";

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#7F4FFF"],
    fill: {
      opacity: 0.5,
    },
    stroke: {
      show: true,
      width: 1.5,
      colors: ["#7F4FFF"],
    },
    markers: {
      size: 0,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: 400,
        colors: ["rgba(255, 255, 255, 0.7)"],
      },
      background: {
        enabled: false,
      },
    },
    xaxis: {
      categories: props.categories,
      labels: {
        style: {
          colors: Array(props.categories.length).fill(
            "rgba(255, 255, 255, 0.7)",
          ),
          fontSize: "12px",
          fontFamily: "Neo Sans Arabic, sans-serif",
        },
      },
    },
    yaxis: {
      show: false,
      tickAmount: 5,
    },
  };
});
</script>

<template>
  <BaseChart :options="chartOptions" :series="series" />
</template>

<style scoped>
/* Scoped overrides if needed */
</style>
