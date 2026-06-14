<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import RadarChart from "@/components/tabsBlocks/RadarChart.vue";
import EvaluationCriterion from "@/components/tabsBlocks/EvaluationCriterion.vue";

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
      <RadarChart :categories="radarLabels" :series="series" />

      <!-- Color legends -->
      <div class="flex flex-col gap-2 border-t border-white/10 pt-3">
        <div class="flex items-center gap-2 text-[10px] text-white/70">
          <span class="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span>
          <span>{{ $t("evaluation.legends.current") }}</span>
        </div>
        <div class="flex items-center gap-2 text-[10px] text-white/70">
          <span class="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]"></span>
          <span>{{ $t("evaluation.legends.team") }}</span>
        </div>
        <div class="flex items-center gap-2 text-[10px] text-white/70">
          <span class="w-2.5 h-2.5 rounded-sm bg-[#10B981]"></span>
          <span>{{ $t("evaluation.legends.ai") }}</span>
        </div>
      </div>

      <!-- AI Analysis insights panel -->
      <div
        class="flex flex-col gap-3.5 mt-2 border-t border-white/10 pt-4 text-right"
      >
        <button
          class="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#018AAF] to-[#8B5CF6] text-white text-xs font-bold text-center"
        >
          {{ $t("evaluation.ai_analysis") }}
        </button>

        <!-- Strongest aspect -->
        <div>
          <span class="text-white/40 text-[10px] font-bold block mb-1">{{
            $t("evaluation.strongest_aspects")
          }}</span>
          <p class="text-[#10B981] text-xs font-bold">
            {{ strongestAspects }}
          </p>
        </div>

        <!-- Weakest aspect -->
        <div>
          <span class="text-white/40 text-[10px] font-bold block mb-1">{{
            $t("evaluation.weakest_aspects")
          }}</span>
          <p class="text-[#EF4444] text-xs font-bold">
            {{ weakestAspects }}
          </p>
        </div>

        <!-- Direct notes -->
        <div>
          <span class="text-white/40 text-[10px] font-bold block mb-1">{{
            $t("evaluation.direct_note")
          }}</span>
          <p class="text-white/70 text-[11px] leading-relaxed">
            {{ $t("evaluation.direct_note_text") }}
          </p>
        </div>
      </div>
    </BaseBox>
  </div>
</template>
