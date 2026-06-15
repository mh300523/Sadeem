<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import BaseChart from "./BaseChart.vue";

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
  strokeWidth: {
    type: Number,
    default: undefined,
  },
  markerSize: {
    type: Number,
    default: undefined,
  },
  labelFontSize: {
    type: String,
    default: "",
  },
  labelColor: {
    type: String,
    default: "",
  },
  height: {
    type: [Number, String],
    default: undefined,
  },
});

const { t } = useI18n();

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

const resolvedStrokeWidth = computed(() => {
  if (props.strokeWidth !== undefined) return props.strokeWidth;
  return props.series.length === 1 ? 1.5 : 2;
});

const resolvedMarkerSize = computed(() => {
  if (props.markerSize !== undefined) return props.markerSize;
  return props.series.length === 1 ? 0 : 3;
});

const resolvedLabelFontSize = computed(() => {
  if (props.labelFontSize) return props.labelFontSize;
  return props.series.length === 1 ? "12px" : "9px";
});

const resolvedLabelColor = computed(() => {
  if (props.labelColor) return props.labelColor;
  return props.series.length === 1 ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.45)";
});

const resolvedHeight = computed(() => {
  if (props.height !== undefined) return props.height;
  return props.series.length === 1 ? 300 : 400;
});

const chartOptions = computed(() => ({
  chart: {
    type: "radar",
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
  colors: resolvedColors.value,
  stroke: {
    show: true,
    width: resolvedStrokeWidth.value,
    colors: resolvedColors.value,
  },
  fill: {
    opacity: resolvedOpacity.value,
  },
  markers: {
    size: resolvedMarkerSize.value,
    hover: {
      size: resolvedMarkerSize.value ? resolvedMarkerSize.value + 2 : 0,
    },
  },
  xaxis: {
    categories: props.categories,
    labels: {
      show: true,
      style: {
        colors: Array(props.categories.length).fill(resolvedLabelColor.value),
        fontSize: resolvedLabelFontSize.value,
        fontWeight: props.series.length === 1 ? 400 : 500,
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
    y: {
      formatter: (value) => value,
    },
  },
}));
</script>

<template>
  <BaseChart :height="resolvedHeight" :options="chartOptions" :series="chartSeries" />
</template>

<style scoped></style>
