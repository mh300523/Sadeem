<script setup>
import TreemapChart from "@/components/dashboard/analytics/TreemapChart.vue";
import BubbleCluster from "@/components/dashboard/analytics/BubbleCluster.vue";
import DonutChart from "@/components/dashboard/analytics/DonutChart.vue";
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

defineProps({
  screenData: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">
      <BaseAnalyticBox :title="$t('analytics.portfolio.sunburst_title')">
        <DonutChart
          :series="screenData.sunburst.series"
          :labels="screenData.sunburst.labels"
          :totalValue="screenData.sunburst.total"
          totalLabelKey="analytics.idea"
        />
      </BaseAnalyticBox>

      <BaseAnalyticBox :title="$t('analytics.portfolio.bubbles_title')">
        <BubbleCluster :bubbles="screenData.bubbles" :height="320" />
      </BaseAnalyticBox>

      <BaseAnalyticBox :title="$t('analytics.portfolio.treemap_title')">
        <TreemapChart :data="screenData.treemap" />
      </BaseAnalyticBox>
    </div>

    <!-- Ideas per Dept and Type Summary row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseAnalyticBox :title="$t('analytics.portfolio.dept_title')">
        <div class="flex flex-col gap-5">
          <ProgressBar
            v-for="(dept, idx) in screenData.departments"
            :key="idx"
            :value="dept.value"
            :max="300"
            :label="dept.label"
            :valueText="String(dept.value)"
            customFillClass="bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]"
          />
        </div>
      </BaseAnalyticBox>

      <BaseAnalyticBox :title="$t('analytics.portfolio.mix_title')">
        <div class="overflow-x-auto">
          <table
            class="w-full text-right ltr:text-left border-collapse text-xs md:text-sm"
          >
            <thead>
              <tr class="border-b border-white/10 text-white/50">
                <th class="pb-3 text-xs font-bold">
                  {{ $t("analytics.portfolio.headers.type") }}
                </th>
                <th class="pb-3 text-xs font-bold text-center">
                  {{ $t("analytics.portfolio.headers.ideas") }}
                </th>
                <th class="pb-3 text-xs font-bold text-center">
                  {{ $t("analytics.portfolio.headers.share") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sum, idx) in screenData.typeSummary"
                :key="idx"
                class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td class="py-3.5 text-white/80 font-semibold">
                  {{ sum.type }}
                </td>
                <td class="py-3.5 text-center text-white/90 font-bold">
                  {{ sum.ideas }}
                </td>
                <td class="py-3.5 text-center text-[#34d3ff] font-bold">
                  {{ sum.share }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseAnalyticBox>
    </div>
  </div>
</template>
