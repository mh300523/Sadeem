<script setup>
import { computed } from "vue";
import BaseChart from "@/components/ui/BaseChart.vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  series: {
    type: Array,
    required: true, // array of { name, values, strokeColor, fillColor }
  },
  max: {
    type: Number,
    default: 5,
  },
  size: {
    type: [Number, String],
    default: 300,
  },
  showLegend: {
    type: Boolean,
    default: false,
  },
});

const chartSeries = computed(() => {
  return props.series.map((s) => ({
    name: s.name,
    data: s.values,
  }));
});

const colors = computed(() => props.series.map((s) => s.strokeColor));

const chartOptions = computed(() => ({
  chart: {
    type: "radar",
    toolbar: {
      show: false,
    },
    background: "transparent",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 300,
      dynamicAnimation: {
        enabled: true,
        speed: 250,
      },
    },
  },
  colors: colors.value,
  stroke: {
    width: 2,
  },
  fill: {
    opacity: 0.12,
  },
  markers: {
    size: 3,
    hover: {
      size: 5,
    },
  },
  xaxis: {
    categories: props.categories,
    labels: {
      show: true,
      style: {
        colors: Array(props.categories.length).fill(
          "rgba(255, 255, 255, 0.45)",
        ),
        fontSize: "9px",
        fontFamily: "Neo Sans Arabic",
        fontWeight: 500,
      },
    },
  },
  yaxis: {
    show: false,
    min: 0,
    max: props.max,
    tickAmount: props.max,
  },
  plotOptions: {
    radar: {
      polygons: {
        strokeColors: "rgba(255, 255, 255, 0.06)",
        connectorColors: "rgba(255, 255, 255, 0.06)",
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
    fontFamily: "Neo Sans Arabic",
    fontSize: "10px",
    labels: {
      colors: "rgba(255, 255, 255, 0.7)",
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
    theme: "dark",
    y: {
      formatter: (val) => `${val} / ${props.max}`,
    },
  },
}));
</script>

<template>
  <BaseChart :height="400" :options="chartOptions" :series="chartSeries" />
</template>

<style scoped></style>
