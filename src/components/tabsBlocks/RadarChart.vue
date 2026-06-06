<script setup>
import { computed } from "vue";
import apexchart from "vue3-apexcharts";

const props = defineProps({
  labels: {
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
    categories: props.labels,
    labels: {
      show: true,
      style: {
        colors: Array(props.labels.length).fill("rgba(255, 255, 255, 0.45)"),
        fontSize: "9px",
        fontFamily: "sans-serif",
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
    show: false,
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
  <div class="flex justify-center items-center w-full h-full select-none max-w-full">
    <apexchart
      type="radar"
      :height="size"
      width="100%"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>
