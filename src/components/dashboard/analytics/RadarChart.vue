<template>
  <BaseChart :options="chartOptions" :series="series" />
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
    return t(catKey);
  });
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
      categories: translatedCategories.value,
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

<style scoped>
/* Scoped overrides if needed */
</style>
