<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import RadarChart from "@/components/charts/RadarChart.vue";
import EvaluationCriterion from "./EvaluationCriterion.vue";
import AIAnalyticCard from "./AIAnalyticCard.vue";

defineProps({
  criteria: {
    type: Array,
    required: true,
  },
  radarLabels: {
    type: Array,
    required: true,
  },
  series: {
    type: Array,
    required: true,
  },
  strongestAspects: {
    type: String,
    required: true,
  },
  weakestAspects: {
    type: String,
    required: true,
  },
  directNote: {
    type: String,
    default: "",
  },
});

defineEmits(["reset-criterion"]);
</script>

<template>
  <div class="lg:col-span-9">
    <h2 class="text-theme-text mb-3">
      {{ $t("evaluation.evaluation_criteria") }}
    </h2>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Center: 8 Criteria sliders (Data-driven EvaluationCriteria!) -->
      <div class="lg:col-span-7">
        <BaseBox class="p-6 border border-[#06B6D46B] rounded-2xl">
          <!-- Criteria sliders wrapper list -->
          <div class="">
            <EvaluationCriterion
              v-for="(crit, index) in criteria"
              :key="crit.key"
              :label="$t(`evaluation.criteria.${crit.key}.label`)"
              :description="$t(`evaluation.criteria.${crit.key}.description`)"
              :percentage="crit.weight"
              v-model="crit.value"
              @reset="$emit('reset-criterion', index)"
            />
          </div>
        </BaseBox>
      </div>

      <!-- Left card: Radar spider map & AI analysis results -->
      <div class="lg:col-span-5">
        <BaseBox class="p-6 border border-[#06B6D46B] rounded-2xl">
          <h3
            class="text-theme-text text-sm md:text-base font-bold border-b border-white/10 pb-2"
          >
            {{ $t("evaluation.radar_chart_title") }}
          </h3>

          <!-- Spider radar SVG map -->
          <RadarChart
            :categories="radarLabels"
            :series="series"
            :show-legend="true"
          />

          <!-- AI Analysis insights panel -->
          <div class="mt-2">
            <h2
              class="gradient-purple py-4 px-5 rounded-2xl text-theme-text font-medium mb-4"
            >
              {{ $t("evaluation.ai_analysis") }}
            </h2>

            <!-- Strongest aspect -->
            <AIAnalyticCard
              :analyticType="$t('evaluation.strongest_aspects')"
              :analyticContent="strongestAspects"
            />

            <!-- Weakest aspect -->
            <AIAnalyticCard
              :analyticType="$t('evaluation.weakest_aspects')"
              :analyticContent="weakestAspects"
            />

            <!-- Direct notes -->
            <AIAnalyticCard
              :analyticType="$t('evaluation.direct_note')"
              :analyticContent="directNote"
            />
          </div>
        </BaseBox>
      </div>
    </div>
  </div>
</template>
