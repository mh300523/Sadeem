<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import RadarChart from "@/components/charts/RadarChart.vue";
import EvaluatorCard from "./EvaluatorCard.vue";
import BiasMetricCard from "./BiasMetricCard.vue";

defineProps({
  evaluators: {
    type: Array,
    required: true,
  },
  selectedEvaluator: {
    type: Object,
    required: true,
  },
  selectedEvaluatorIndex: {
    type: Number,
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
  biasMetrics: {
    type: Object,
    required: true,
  },
});

defineEmits(["select-evaluator", "back"]);
</script>

<template>
  <!-- Center: Bias radar details & stats -->
  <div class="lg:col-span-6 flex flex-col gap-4">
    <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
      <!-- Dashboard header with back button -->
      <div
        class="flex justify-between items-center border-b border-white/10 pb-3"
      >
        <h3
          class="text-white text-base md:text-lg font-bold flex items-center gap-3"
        >
          <!-- Back arrow button -->
          <button
            @click="$emit('back')"
            class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
            :title="$t('evaluation.evaluation_criteria')"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <span>{{ $t("evaluation.bias_dashboard_title") }}</span>
        </h3>
      </div>

      <!-- Description text -->
      <p class="text-white/60 text-xs leading-relaxed">
        {{ $t("evaluation.bias_dashboard_description") }}
      </p>

      <!-- Row display selected evaluator metrics -->
      <div
        class="grid grid-cols-3 gap-4 border border-white/5 p-4 rounded-xl bg-[#161F30]/50 text-center"
      >
        <!-- Classification -->
        <div>
          <span class="text-white/40 text-[10px] block mb-1">{{
            $t("evaluation.classification")
          }}</span>
          <p class="text-[#06B6D4] text-sm md:text-base font-bold">
            {{ selectedEvaluator.classificationText }}
          </p>
        </div>

        <!-- Bias percentage -->
        <div>
          <span class="text-white/40 text-[10px] block mb-1">{{
            $t("evaluation.bias_percentage")
          }}</span>
          <p class="text-white text-sm md:text-base font-bold">
            {{ selectedEvaluator.bias }}
          </p>
        </div>

        <!-- Selected Evaluator -->
        <div>
          <span class="text-white/40 text-[10px] block mb-1">{{
            $t("evaluation.selected_evaluator")
          }}</span>
          <p class="text-white text-sm md:text-base font-bold">
            {{ selectedEvaluator.name }}
          </p>
        </div>
      </div>

      <!-- Big Radar Chart in Center -->
      <div class="w-full h-[280px] flex items-center justify-center my-2">
        <RadarChart :categories="radarLabels" :series="series" :size="260" />
      </div>

      <!-- Color legends row -->
      <div class="flex justify-center gap-6 border-b border-white/10 pb-4">
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

      <!-- Bias Metrics Section bottom -->
      <div class="flex flex-col gap-4 pt-1">
        <button
          class="w-full py-2 rounded-xl bg-gradient-to-r from-[#018AAF] to-[#8B5CF6] text-white text-xs font-bold text-center"
        >
          {{ $t("evaluation.bias_metrics") }}
        </button>

        <p class="text-white/50 text-[10px] leading-relaxed">
          {{ $t("evaluation.bias_metrics_explanation") }}
        </p>

        <!-- Metrics details columns using BiasMetricCard! -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <BiasMetricCard
            :label="$t('evaluation.balance_rate')"
            :value="$t('evaluation.balance_rate_value')"
          />
          <BiasMetricCard
            :label="$t('evaluation.average_bias')"
            :value="$t('evaluation.average_bias_value')"
          />
          <BiasMetricCard
            :label="$t('evaluation.highest_bias')"
            :value="$t('evaluation.highest_bias_value')"
          />
        </div>

        <!-- Informational footnotes -->
        <div
          class="mt-1 flex flex-col gap-1 text-[10px] text-white/40 pr-1 leading-relaxed"
        >
          <p>{{ $t("evaluation.footnotes.strict") }}</p>
          <p>{{ $t("evaluation.footnotes.generous") }}</p>
          <p>{{ $t("evaluation.footnotes.balanced") }}</p>
        </div>
      </div>
    </BaseBox>
  </div>
  <!-- Left side (Evaluators list column using EvaluatorCard!) -->
  <div class="lg:col-span-3">
    <BaseBox class="p-6 border border-[#06B6D46B] rounded-2xl">
      <!-- Header and Manager mode button -->
      <div class="flex justify-between items-center pb-3">
        <button
          class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[rgba(1,138,175,0.2)] to-[rgba(127,79,255,0.2)] border border-[#7F4FFF]/30 text-[#7F4FFF] text-[10px] font-bold hover:bg-white/5 transition-colors cursor-pointer"
        >
          {{ $t("evaluation.evaluator_manager_mode") }}
        </button>
      </div>

      <h2
        class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
      >
        {{ $t("evaluation.evaluators") }}
      </h2>

      <!-- List of Evaluators -->

      <EvaluatorCard
        v-for="(evaluator, index) in evaluators"
        :key="evaluator.name"
        :evaluator="evaluator"
        :is-active="selectedEvaluatorIndex === index"
        @click="$emit('select-evaluator', index)"
      />
    </BaseBox>
  </div>
</template>
