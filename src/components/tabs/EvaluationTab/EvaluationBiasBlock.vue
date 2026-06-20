<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import RadarChart from "@/components/charts/RadarChart.vue";
import EvaluatorCard from "./EvaluatorCard.vue";
import BiasMetricCard from "./BiasMetricCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

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
  <!-- Dashboard header with back button -->

  <div class="lg:col-span-9">
    <div class="flex items-start justify-between flex-wrap gap-3 mb-10">
      <div class="flex gap-4">
        <!-- Back arrow button -->
        <BaseButton
          @click="$emit('back')"
          class="w-11 h-11 bg-white/10 hover:bg-white/30 text-theme-text flex items-center justify-center p-1!"
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
        </BaseButton>
        <div class="">
          <h3 class="text-theme-text text-lg md:text-2xl font-medium mb-3">
            {{ $t("evaluation.bias_dashboard_title") }}
          </h3>
          <!-- Description text -->
          <p class="text-theme-text/70 text-xs leading-relaxed">
            {{ $t("evaluation.bias_dashboard_description") }}
          </p>
        </div>
      </div>

      <BaseButton class="px-10! bg-[#5CE1E6]/10 text-[#5CE1E6] font-medium">
        {{ $t("evaluation.evaluator_manager_mode") }}
      </BaseButton>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Center: Bias radar details & stats -->
      <div class="lg:col-span-7">
        <BaseBox class="p-4 sm:p-6 border border-[#06B6D46B] rounded-2xl">
          <div class="mb-4">
            <h2 class="text-theme-text text-lg md:text-2xl font-medium mb-3">
              {{ $t("evaluation.bias_comparison_title") }}
            </h2>
            <!-- Description text -->
            <p class="text-theme-text/70 text-xs leading-relaxed">
              {{ $t("evaluation.bias_comparison_description") }}
            </p>
          </div>
          <!-- Row display selected evaluator metrics -->
          <BaseBox
            type="glass"
            class="grid sm:grid-cols-3 gap-4 border border-[#06B6D4]/42 rounded-[20px] bg-[#161F30]/50"
          >
            <!-- Selected Evaluator -->
            <div class="py-5 px-4 border border-[#06B6D4]/42 rounded-[12px]">
              <h4 class="text-theme-text/70 mb-3">
                {{ $t("evaluation.selected_evaluator") }}
              </h4>
              <p class="text-theme-text text-lg md:text-2xl font-bold">
                {{ selectedEvaluator.name }}
              </p>
            </div>
            <!-- Bias percentage -->
            <div class="py-5 px-4 border border-[#06B6D4]/42 rounded-[12px]">
              <h4 class="text-theme-text/70 mb-3">
                {{ $t("evaluation.bias_percentage") }}
              </h4>
              <p class="text-theme-text text-lg md:text-2xl font-bold">
                {{ selectedEvaluator.bias }}
              </p>
            </div>

            <!-- Classification -->
            <div class="py-5 px-4 border border-[#06B6D4]/42 rounded-[12px]">
              <h4 class="text-theme-text/70 mb-3">
                {{ $t("evaluation.classification") }}
              </h4>
              <p class="text-theme-text text-lg md:text-2xl font-bold">
                {{ selectedEvaluator.classificationText }}
              </p>
            </div>
          </BaseBox>

          <!-- Big Radar Chart in Center -->
          <BaseBox type="glass" class="rounded-2xl my-8">
            <RadarChart
              :categories="radarLabels"
              :series="series"
              :show-legend="true"
            />
          </BaseBox>

          <!-- Bias Metrics Section bottom -->
          <div class="flex flex-col gap-4 pt-1">
            <h2
              class="gradient-purple py-4 px-5 rounded-2xl text-theme-text font-medium mb-4"
            >
              {{ $t("evaluation.bias_metrics") }}
            </h2>

            <p class="text-theme-text/70 leading-relaxed">
              {{ $t("evaluation.bias_metrics_explanation") }}
            </p>

            <!-- Metrics details columns using BiasMetricCard! -->

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

            <!-- Informational footnotes -->
            <div
              class="mt-1 flex flex-col gap-1 text-theme-text/70 leading-relaxed"
            >
              <p>{{ $t("evaluation.footnotes.strict") }}</p>
              <p>{{ $t("evaluation.footnotes.generous") }}</p>
              <p>{{ $t("evaluation.footnotes.balanced") }}</p>
            </div>
          </div>
        </BaseBox>
      </div>
      <!-- Left side (Evaluators list column using EvaluatorCard!) -->
      <div class="lg:col-span-5">
        <BaseBox class="p-4 sm:p-6 border border-[#06B6D46B] rounded-2xl">
          <h2
            class="gradient-purple py-4 px-5 rounded-2xl text-theme-text font-medium mb-4"
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
    </div>
  </div>
</template>
