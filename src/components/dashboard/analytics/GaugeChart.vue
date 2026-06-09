<template>
  <BaseChart type="radialBar" :options="chartOptions" :series="[value]" />
  <p class="text-white/70 text-xs text-center">
    {{ label }}
  </p>
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
    default: () => ["#7086FD"], // cyan to purple
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
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 270,
        hollow: {
          size: "40%",
          background: "transparent",
        },
        track: {
          background: "rgba(255,255,255,0.5)",
          strokeWidth: "60%",
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 8,
            fontSize: "24px",
            fontWeight: "600",
            color: "rgba(255,255,255,0.9)",
            fontFamily: "Neo Sans Arabic, sans-serif",
            formatter: (val) => Math.round(val),
          },
        },
      },
    },
    fill: {
      type: "gradient",
      colors: [props.gradientColors[0]],
    },
    stroke: {
      lineCap: "butt",
    },
    tooltip: {
      enabled: false,
    },
  };
});
</script>

<style scoped>
/* ApexCharts styling handles gauge rendering */
</style>
