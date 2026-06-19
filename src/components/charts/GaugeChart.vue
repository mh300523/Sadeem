<script setup>
import { computed } from "vue";
import BaseChart from "./BaseChart.vue";
import { useTheme } from "@/composables/useTheme";

const { isDark } = useTheme();

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
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 270,
        hollow: {
          size: "40%",
          background: "transparent",
        },
        track: {
          background: isDark.value ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.08)",
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
            color: isDark.value ? "rgba(255,255,255,0.9)" : "#0f172a",
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
      enabled: false, // Override to disable tooltip specifically for Gauge
    },
  };
});
</script>

<template>
  <BaseChart type="radialBar" :options="chartOptions" :series="[value]" />
  <p class="text-theme-text/70 text-xs text-center">
    {{ label }}
  </p>
</template>

<style scoped>
/* ApexCharts styling handles gauge rendering */
</style>
