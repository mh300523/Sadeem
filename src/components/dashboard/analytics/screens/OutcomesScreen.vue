<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
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
  <div>
    <BaseBox
      type="glass"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-[20px]! gradient-border mb-5"
    >
      <KpiCard
        v-for="kpi in screenData.kpis"
        :key="kpi.id"
        v-bind="kpi"
        @select="emit('select-kpi', $event)"
      />
    </BaseBox>

    <!-- Heatmap table and Distribution horizontal bars row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
      <!-- Decision Distribution bars -->
      <BaseAnalyticBox
        :title="$t('analytics.outcomes.distribution_title')"
        :subtitle="$t('analytics.outcomes.distribution_subtitle')"
      >
        <div class="flex flex-col gap-5">
          <ProgressBar
            v-for="(dist, idx) in screenData.distribution"
            :key="idx"
            :value="dist.value"
            :label="dist.label"
            :valueText="`${dist.value}%`"
          />
        </div>
      </BaseAnalyticBox>

      <!-- Outcome Heatmap Custom Implementation -->
      <BaseAnalyticBox
        :title="$t('analytics.outcomes.heatmap_title')"
        :subtitle="$t('analytics.outcomes.heatmap_subtitle')"
      >
        <HeatMap
          :series="screenData.heatmap.series"
          :categories="screenData.heatmap.categories"
        />
      </BaseAnalyticBox>
    </div>
  </div>
</template>
