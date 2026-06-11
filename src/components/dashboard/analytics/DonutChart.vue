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
              color: "rgba(255,255,255,0.76)",
              offsetY: 20,
              fontFamily: "Neo Sans Arabic, sans-serif",
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: "700",
              color: "#ffffff",
              offsetY: -15,
              fontFamily: "Neo Sans Arabic, sans-serif",
              formatter: (val) => `${val}%`,
            },
            total: {
              show: true,
              showAlways: true,
              label: t(props.totalLabelKey),
              color: "rgba(255,255,255,0.76)",
              fontSize: "12px",
              fontFamily: "Neo Sans Arabic, sans-serif",
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
      <span class="text-xs text-white/70">{{ $t(lbl) }}</span>
      <span class="text-white font-medium">{{ series[idx] }}%</span>
    </li>
  </ul>
</template>

<style scoped>
/* Tooltips and donut shapes are rendered by ApexCharts */
</style>
