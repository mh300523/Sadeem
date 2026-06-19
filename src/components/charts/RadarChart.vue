<script setup>
import { computed } from "vue";
import BaseChart from "./BaseChart.vue";
import { useTheme } from "@/composables/useTheme";

const { isDark } = useTheme();

const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  showLegend: {
    type: Boolean,
    default: false,
  },
  colors: {
    type: Array,
    default: () => ["#7F4FFF"],
  },
  fillOpacity: {
    type: Number,
    default: undefined,
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
});

const chartSeries = computed(() => {
  return props.series.map((s) => {
    const data = s.values || s.data || [];
    return {
      name: s.name,
      data: data,
    };
  });
});

const resolvedColors = computed(() => {
  const strokeColors = props.series.map((s) => s.strokeColor).filter(Boolean);
  if (strokeColors.length > 0) {
    return strokeColors;
  }
  return props.colors;
});

const resolvedOpacity = computed(() => {
  if (props.fillOpacity !== undefined) return props.fillOpacity;
  return props.series.length === 1 ? 0.5 : 0.12;
});

const resolvedHeight = computed(() => {
  if (props.height !== undefined) return props.height;
  return props.series.length === 1 ? 300 : 400;
});

const resolvedWidth = computed(() => {
  if (props.width !== undefined) return props.width;
  return props.series.length === 1 ? 300 : 400;
});

const chartOptions = computed(() => ({
  chart: {
    type: "radar",
  },
  colors: resolvedColors.value,
  stroke: {
    show: true,
    width: 1,
    colors: resolvedColors.value,
  },
  fill: {
    opacity: resolvedOpacity.value,
  },
  markers: {
    size: 3,
    hover: {
      size: 4,
    },
  },
  xaxis: {
    categories: props.categories,
    labels: {
      show: true,
      style: {
        colors: isDark.value ? "rgba(255, 255, 255, 0.7)" : "#0f172a",
        fontSize: "10px",
      },
    },
  },
  yaxis: {
    show: false,
    tickAmount: 5,
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: isDark.value ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.08)",
        connectorColors: isDark.value ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.08)",
        fill: {
          colors: ["transparent"],
        },
      },
    },
  },
  legend: {
    show: props.showLegend,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "10px",
    labels: {
      colors: isDark.value ? "rgba(255, 255, 255, 0.7)" : "#0f172a",
      useSeriesColors: false,
    },
    markers: {
      shape: "square",
      strokeWidth: 0,
      strokeColor: "transparent",
      offsetX: -4,
    },
    itemMargin: {
      horizontal: 12,
      vertical: 4,
    },
  },
  tooltip: {
    y: {
      formatter: (value) => value,
    },
  },
}));
</script>

<template>
  <BaseChart
    :height="resolvedHeight"
    :width="resolvedWidth"
    :options="chartOptions"
    :series="chartSeries"
  />
</template>

<style scoped></style>
