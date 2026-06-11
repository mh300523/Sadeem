<script setup>
import GaugeChart from "@/components/dashboard/analytics/GaugeChart.vue";
import BubbleCluster from "@/components/dashboard/analytics/BubbleCluster.vue";
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import StreamChart from "@/components/dashboard/analytics/StreamChart.vue";

defineProps({
  screenData: {
    type: Object,
    required: true,
  },
});

function getCustomGradient(label) {
  if (label === "High IP") return "from-emerald-500 to-[#14b8a6]";
  if (label === "Medium IP") return "from-[#f59e0b] to-[#f97316]";
  return "from-rose-500 to-[#fb7185]";
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <!-- Gauge Alignment -->
      <div
        class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-sm font-bold text-white">
            {{ $t("analytics.intelligence_tab.ai_alignment_title") }}
          </h3>
          <span class="text-[10px] text-white/40 block mb-6"
            >Readiness gauge analysis</span
          >
        </div>
        <GaugeChart
          :value="screenData.gaugeValue"
          :label="$t('analytics.intelligence_tab.gauge_sub')"
          :gradientColors="['#22d3ee', '#8b5cf6']"
        />
      </div>

      <!-- Similarity bubbles -->
      <div
        class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-sm font-bold text-white">
            {{ $t("analytics.intelligence_tab.similarity_title") }}
          </h3>
          <span class="text-[10px] text-white/40 block mb-6"
            >Similarity cluster groupings</span
          >
        </div>
        <BubbleCluster
          :bubbles="screenData.bubbles"
          :height="280"
        />
      </div>

      <!-- Probability bands progress bars -->
      <div
        class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-sm font-bold text-white mb-6">
            {{ $t("analytics.intelligence_tab.probability_title") }}
          </h3>
        </div>
        <div class="flex flex-col gap-5 justify-center flex-1">
          <ProgressBar
            v-for="(prob, idx) in screenData.probability"
            :key="idx"
            :value="prob.percentage"
            :max="100"
            :label="prob.label"
            :valueText="`${prob.percentage}%`"
            :customFillClass="`bg-gradient-to-r ${getCustomGradient(prob.label)}`"
          />
        </div>
      </div>
    </div>

    <!-- Predictive Stream Graph & AI Commentary Note -->
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-4">
      <!-- Predictive Area Stream Chart -->
      <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
        <h3 class="text-sm font-bold text-white mb-2">
          {{ $t("analytics.intelligence_tab.predictive_title") }}
        </h3>
        <span class="text-[10px] text-white/40 block mb-6"
          >Area stream graphing model</span
        >
        <StreamChart
          :series="screenData.streamSeries"
          label="Emerging themes: AI triage, predictive dispatch, patient journey orchestration"
        />
      </div>

      <!-- AI Commentary note block -->
      <div
        class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-sm font-bold text-white mb-4">
            {{ $t("analytics.intelligence_tab.commentary_title") }}
          </h3>
          <div
            class="p-5 rounded-2xl border border-white/5 bg-white/[0.03] text-sm text-[#9dbad7] leading-relaxed text-right ltr:text-left relative overflow-hidden"
          >
            <div
              class="absolute -top-10 -left-10 w-24 h-24 bg-[#06b6d4]/10 rounded-full blur-2xl pointer-events-none"
            ></div>
            {{ $t(screenData.aiCommentaryKey) }}
          </div>
        </div>
        <div
          class="text-[10px] text-white/30 text-right ltr:text-left select-none font-bold uppercase tracking-wider pt-4"
        >
          Sadeem Platform Insights Engine
        </div>
      </div>
    </div>
  </div>
</template>
