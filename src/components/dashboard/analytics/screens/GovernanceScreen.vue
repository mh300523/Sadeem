<script setup>
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import HeatMap from "@/components/dashboard/analytics/HeatMap.vue";

const props = defineProps({
  screenData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Governance Indicators -->
    <BaseAnalyticBox :title="$t('analytics.governance_tab.indicators_title')">
      <BaseTable
        :headers="screenData?.indicators?.headers"
        :items="screenData?.indicators?.items"
      >
        <!-- Custom KPI cell -->
        <template #cell(kpiKey)="{ value }">
          <span class="text-xs text-theme-text/70">
            {{ $t(value) }}
          </span>
        </template>

        <!-- Custom value cell -->
        <template #cell(value)="{ value }">
          <span class="text-theme-text font-medium md:text-base">
            {{ value }}
          </span>
        </template>

        <!-- Custom status cell -->
        <template #cell(statusKey)="{ item, value }">
          <span
            class="flex items-center justify-center w-fit min-w-13 h-7 px-3 py-1 rounded-full text-xs"
            :style="{
              backgroundColor: `${item.statusColor}1A`,
              color: item.statusColor,
            }"
          >
            {{ $t(value) }}
          </span>
        </template>
      </BaseTable>
    </BaseAnalyticBox>

    <!-- Governance Heat Layer Custom Heatmap -->
    <BaseAnalyticBox :title="$t('analytics.governance_tab.heat_title')">
      <HeatMap
        :series="screenData.heatmap.series"
        :categories="screenData.heatmap.categories"
      />
    </BaseAnalyticBox>
  </div>
</template>
