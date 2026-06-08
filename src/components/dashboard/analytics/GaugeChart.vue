<template>
  <BaseChart
    type="radialBar"
    height="220"
    width="220"
    :options="chartOptions"
    :series="[value]"
  />
</template>

<script setup>
import { computed } from "vue";
import BaseChart from "@/components/ui/BaseChart.vue";

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  gradientColors: {
    type: Array,
    default: () => ["#34d3ff", "#8b5cf6"], // cyan to purple
  },
});

const chartOptions = computed(() => {
  return {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -130,
        endAngle: 130,
        hollow: {
          size: "68%",
        },
        track: {
          background: "rgba(255, 255, 255, 0.08)",
          strokeWidth: "100%",
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "12px",
            color: "#9dbad7",
            offsetY: 25,
            fontFamily: "Neo Sans Arabic, sans-serif",
          },
          value: {
            offsetY: -15,
            fontSize: "36px",
            fontWeight: "800",
            color: "#eff8ff",
            fontFamily: "Neo Sans Arabic, sans-serif",
            formatter: (val) => val,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [props.gradientColors[1]],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      colors: [props.gradientColors[0]],
    },
    stroke: {
      lineCap: "round",
    },
    labels: [props.label],
  };
});
</script>

<style scoped>
/* ApexCharts styling handles gauge rendering */
</style>
