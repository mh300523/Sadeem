<script setup>
import GaugeChart from "@/components/charts/GaugeChart.vue";
import BubbleCluster from "@/components/dashboard/analytics/BubbleCluster.vue";
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import StreamChart from "@/components/charts/StreamChart.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

defineProps({
  screenData: {
    type: Object,
    required: true,
  },
});

function getProgressColor(type) {
  if (type === "high") return "bg-[#05D989]";
  if (type === "medium") return "bg-[#FF8E53]";
  return "bg-[#FB3748]";
}
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
    <!-- Gauge Alignment -->
    <BaseAnalyticBox
      :title="$t('analytics.intelligence_tab.ai_alignment_title')"
    >
      <GaugeChart
        :value="screenData?.gaugeValue"
        :label="$t('analytics.intelligence_tab.gauge_sub')"
        :gradientColors="['#7086FD']"
      />
    </BaseAnalyticBox>

    <!-- Similarity bubbles -->
    <BaseAnalyticBox :title="$t('analytics.intelligence_tab.similarity_title')">
      <BubbleCluster :bubbles="screenData?.bubbles" />
    </BaseAnalyticBox>

    <!-- Probability bands progress bars -->
    <BaseAnalyticBox
      :title="$t('analytics.intelligence_tab.probability_title')"
    >
      <ProgressBar
        v-for="(prob, idx) in screenData?.probability"
        :key="idx"
        classes="flex-col items-start"
        title-classes="w-auto"
        :value="prob.percentage"
        :max="100"
        :label="prob.label"
        :valueText="`${prob.percentage}%`"
        :customFillClass="getProgressColor(prob.type)"
      />
    </BaseAnalyticBox>
  </div>

  <!-- Predictive Stream Graph & AI Commentary Note -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Predictive Area Stream Chart -->
    <BaseAnalyticBox :title="$t('analytics.intelligence_tab.predictive_title')">
      <StreamChart :series="screenData.streamSeries" />
    </BaseAnalyticBox>

    <!-- AI Commentary note block -->
    <BaseAnalyticBox :title="$t('analytics.intelligence_tab.commentary_title')">
      <BaseAnalyticBox class="whitespace-pre-line text-white">
        {{ $t(screenData.aiCommentaryKey) }}
      </BaseAnalyticBox>
    </BaseAnalyticBox>
  </div>
</template>
