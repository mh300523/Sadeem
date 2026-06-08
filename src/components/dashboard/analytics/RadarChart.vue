<template>
  <BaseChart
    type="radar"
    height="300"
    width="100%"
    :options="chartOptions"
    :series="series"
  />
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
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

const { t } = useI18n();

const translatedCategories = computed(() => {
  // Extract values from props.series[0].data if available to append values dynamically
  const dataVals = props.series[0]?.data || [];
  return props.categories.map((catKey, idx) => {
    const val = dataVals[idx] !== undefined ? ` ${dataVals[idx]}` : "";
    return t(catKey) + val;
  });
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "radar",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        blur: 4,
        left: 0,
        top: 2,
        color: "#000",
        opacity: 0.3,
      },
    },
    colors: ["#34d3ff"],
    fill: {
      opacity: 0.16,
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ["#34d3ff"],
    },
    markers: {
      size: 4,
      colors: ["#091522"],
      strokeColor: "#34d3ff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: translatedCategories.value,
      labels: {
        show: true,
        style: {
          colors: Array(props.categories.length).fill("#d3e9ff"),
          fontSize: "11px",
          fontFamily: "Neo Sans Arabic, sans-serif",
          fontWeight: "500",
        },
      },
    },
    yaxis: {
      show: false,
      tickAmount: 4,
    },
    grid: {
      show: true,
      borderColor: "rgba(255, 255, 255, 0.08)",
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  };
});
</script>

<style scoped>
/* Scoped overrides if needed */
</style>
