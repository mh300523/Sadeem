<script setup>
import KpiCard from "@/components/dashboard/analytics/KpiCard.vue";
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import HeatMap from "@/components/dashboard/analytics/HeatMap.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

defineProps({
  screenData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["select-kpi"]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <KpiCard
      v-for="kpi in screenData.kpis"
      :key="kpi.id"
      v-bind="kpi"
      @select="emit('select-kpi', $event)"
    />
  </div>

  <!-- Heatmap table and Distribution horizontal bars row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Decision Distribution bars -->
    <BaseAnalyticBox
      :title="$t('analytics.outcomes.distribution_title')"
      :subtitle="$t('analytics.outcomes.distribution_subtitle')"
    >
      <ProgressBar
        v-for="(dist, idx) in screenData.distribution"
        :key="idx"
        :value="dist.value"
        :label="dist.label"
        :valueText="`${dist.value}%`"
      />
    </BaseAnalyticBox>

    <!-- Outcome Heatmap Custom Implementation -->
    <BaseAnalyticBox
      :title="$t('analytics.outcomes.heatmap_title')"
      :subtitle="$t('analytics.outcomes.heatmap_subtitle')"
    >
      <HeatMap
        :series="screenData.heatmap.series"
        :categories="screenData.heatmap.categories"
        class="text-xl font-bold"
      />
    </BaseAnalyticBox>
  </div>
</template>
