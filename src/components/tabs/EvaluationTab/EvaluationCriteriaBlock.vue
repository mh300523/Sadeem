<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import RadarChart from "./RadarChart.vue";
import EvaluationCriterion from "./EvaluationCriterion.vue";

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
});

defineEmits(["reset-criterion"]);
</script>

<template>
  <!-- Center: 8 Criteria sliders (Data-driven EvaluationCriteria!) -->
  <div class="lg:col-span-5">
    <h2 class="text-white mb-3">
      {{ $t("evaluation.evaluation_criteria") }}
    </h2>
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
  <div class="lg:col-span-4 flex flex-col gap-4">
    <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
      <h3
        class="text-white text-sm md:text-base font-bold border-b border-white/10 pb-2"
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
      <div
        class="flex flex-col gap-3.5 mt-2 border-t border-white/10 pt-4 text-right"
      >
        <h2
          class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
        >
          {{ $t("evaluation.ai_analysis") }}
        </h2>

        <!-- Strongest aspect -->
        <BaseBox type="glass" class="p-5">
          <h3 class="text-white font-bold mb-3">
            {{ $t("evaluation.strongest_aspects") }}
          </h3>
          <p class="text-[#FFFFFFB2]">
            {{ strongestAspects }}
          </p>
        </BaseBox>

        <!-- Weakest aspect -->
        <BaseBox type="glass">
          <span class="text-white/40 text-[10px] font-bold block mb-1">{{
            $t("evaluation.weakest_aspects")
          }}</span>
          <p class="text-[#EF4444] text-xs font-bold">
            {{ weakestAspects }}
          </p>
        </BaseBox>

        <!-- Direct notes -->
        <BaseBox type="glass">
          <span class="text-white/40 text-[10px] font-bold block mb-1">{{
            $t("evaluation.direct_note")
          }}</span>
          <p class="text-white/70 text-[11px] leading-relaxed">
            {{ $t("evaluation.direct_note_text") }}
          </p>
        </BaseBox>
      </div>
    </BaseBox>
  </div>
</template>
