<script setup>
import TreeMap from "@/components/dashboard/analytics/TreeMap.vue";
import BubbleCluster from "@/components/dashboard/analytics/BubbleCluster.vue";
import DonutChart from "@/components/dashboard/analytics/DonutChart.vue";
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";
import BaseTable from "@/components/ui/BaseTable.vue";

defineProps({
  screenData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <BaseAnalyticBox :title="$t('analytics.portfolio.sunburst_title')">
      <DonutChart
        :series="screenData.sunburst.series"
        :labels="screenData.sunburst.labels"
        :totalValue="screenData.sunburst.total"
        totalLabelKey="analytics.idea"
      />
    </BaseAnalyticBox>

    <BaseAnalyticBox :title="$t('analytics.portfolio.bubbles_title')">
      <BubbleCluster :bubbles="screenData.bubbles" />
    </BaseAnalyticBox>

    <BaseAnalyticBox :title="$t('analytics.portfolio.treemap_title')">
      <TreeMap :series="screenData.treemap.series" />
    </BaseAnalyticBox>
  </div>

  <!-- Ideas per Dept and Type Summary row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <BaseAnalyticBox :title="$t('analytics.portfolio.dept_title')">
      <ProgressBar
        v-for="(dept, idx) in screenData?.departments"
        :key="idx"
        :value="dept.value"
        :max="300"
        :label="dept.label"
        :valueText="String(dept.value)"
      />
    </BaseAnalyticBox>

    <BaseAnalyticBox :title="$t('analytics.portfolio.mix_title')">
      <BaseTable
        :headers="screenData?.typeSummary?.headers"
        :items="screenData?.typeSummary?.items"
      >
        <!-- Custom rendering for type -->
        <template #cell(type)="{ value }">
          <span class="text-xs text-white/70">
            {{ value }}
          </span>
        </template>

        <!-- Custom rendering for ideas -->
        <template #cell(ideas)="{ value }">
          <span class="text-white font-bold text-lg md:text-xl">
            {{ value }}
          </span>
        </template>

        <!-- Custom rendering for share -->
        <template #cell(share)="{ value }">
          <span class="text-white font-bold text-lg md:text-xl">
            {{ value }}
          </span>
        </template>
      </BaseTable>
    </BaseAnalyticBox>
  </div>
</template>
