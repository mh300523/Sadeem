<template>
  <div class="flex flex-col items-center justify-center w-full min-h-[300px]">
    <!-- Donut Chart -->
    <BaseChart
      type="donut"
      height="230"
      width="230"
      :options="chartOptions"
      :series="series"
    />

    <!-- Custom Center/Bottom Translated Legend inline matching layout v7 -->
    <div class="text-xs text-white/60 text-center mt-4 max-w-xs leading-relaxed select-none">
      <span v-for="(lbl, idx) in labels" :key="idx" class="inline-block">
        <span class="inline-block w-2.5 h-2.5 rounded-full me-1.5" :style="{ backgroundColor: colors[idx] }"></span>
        <span class="font-bold text-white/95">{{ $t(lbl) }}</span>
        <span class="text-white/50 ms-1 font-semibold">{{ series[idx] }}%</span>
        <span v-if="idx < labels.length - 1" class="mx-2 text-white/20 select-none">•</span>
      </span>
    </div>
  </div>
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
  labels: {
    type: Array,
    required: true,
  },
  totalValue: {
    type: String,
    default: "",
  },
  totalLabelKey: {
    type: String,
    default: "analytics.total_platform_ideas",
  },
});

const { t } = useI18n();
const colors = ["#34d3ff", "#8b5cf6", "#f59e0b", "#22c55e"]; // Custom color harmony palette

const chartOptions = computed(() => {
  return {
    chart: {
      type: "donut",
    },
    labels: props.labels.map(l => t(l)),
    colors: colors,
    stroke: {
      show: true,
      colors: ["#091522"],
      width: 2.5,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "11px",
              color: "#9dbad7",
              offsetY: 20,
              fontFamily: "Neo Sans Arabic, sans-serif",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: "800",
              color: "#eff8ff",
              offsetY: -15,
              fontFamily: "Neo Sans Arabic, sans-serif",
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              label: t(props.totalLabelKey),
              color: "#9dbad7",
              fontSize: "10px",
              fontFamily: "Neo Sans Arabic, sans-serif",
              formatter: () => props.totalValue,
            },
          },
        },
      },
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
/* Tooltips and donut shapes are rendered by ApexCharts */
</style>
