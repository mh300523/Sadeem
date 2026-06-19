<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import BaseChart from "./BaseChart.vue";
import { useTheme } from "@/composables/useTheme";

const { isDark } = useTheme();

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
    default: "",
  },
});

const { t } = useI18n();
const colors = ["#7086FD", "#6FD195", "#FFAE4C", "#07DBFA"]; // Custom color harmony palette

const chartOptions = computed(() => {
  return {
    chart: {
      type: "donut",
    },
    labels: props.labels,
    colors: colors,
    stroke: {
      show: false,
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
          size: "55%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "12px",
              color: isDark.value ? "rgba(255,255,255,0.76)" : "#64748b",
              offsetY: 20,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: "700",
              color: isDark.value ? "#ffffff" : "#0f172a",
              offsetY: -15,
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              showAlways: true,
              label: t(props.totalLabelKey),
              color: isDark.value ? "rgba(255,255,255,0.76)" : "#64748b",
              fontSize: "12px",
              formatter: () => props.totalValue,
            },
          },
        },
      },
    },
  };
});
</script>

<template>
  <!-- Donut Chart -->
  <BaseChart height="230" :options="chartOptions" :series="series" />

  <!-- Custom Center/Bottom Translated Legend inline matching layout v7 -->
  <ul class="mt-4">
    <li
      v-for="(lbl, idx) in labels"
      :key="idx"
      class="flex items-center justify-between gap-2 mb-2.5 last:mb-0"
    >
      <span class="text-xs text-theme-text/70">{{ $t(lbl) }}</span>
      <span class="text-theme-text font-medium">{{ series[idx] }}%</span>
    </li>
  </ul>
</template>

<style scoped>
/* Tooltips and donut shapes are rendered by ApexCharts */
</style>
