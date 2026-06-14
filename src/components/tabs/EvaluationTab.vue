<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import mockData from "@/mockData.json";
import BaseBox from "@/components/ui/BaseBox.vue";
import RadarChart from "@/components/tabsBlocks/RadarChart.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

// Reusable blocks
import ScoreCard from "@/components/tabsBlocks/ScoreCard.vue";
import BiasMetricCard from "@/components/tabsBlocks/BiasMetricCard.vue";
import EvaluatorCard from "@/components/tabsBlocks/EvaluatorCard.vue";
import EvaluationCriterion from "@/components/tabsBlocks/EvaluationCriterion.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const { t, locale } = useI18n();

// View toggle state: "sliders" (Criteria view) or "bias" (Bias comparison dashboard view)
const currentView = ref("sliders");

// Default baseline values from mockData.json default details in case props.data is empty
const defaultEvaluationData = mockData.details?.default?.tabs?.find((t) => t.key === "evaluation")?.data || {};

const defaultCriteria = defaultEvaluationData.criteria || [];
const defaultAiScores = defaultEvaluationData.aiScores || [];
const defaultTeamScores = defaultEvaluationData.teamScores || [];
const defaultEvaluators = defaultEvaluationData.evaluators || [];

// Initialize dynamic values loaded from props.data or defaults
const criteriaList = props.data?.criteria || defaultCriteria;
const aiScores = props.data?.aiScores || defaultAiScores;
const teamScores = props.data?.teamScores || defaultTeamScores;
const evaluatorsList = props.data?.evaluators || defaultEvaluators;

// Criteria mapped with localized text getters
const criteria = ref(
  criteriaList.map((crit) => {
    return {
      ...crit,
      get label() {
        return t(`evaluation.criteria.${crit.key}.label`);
      },
      get description() {
        return t(`evaluation.criteria.${crit.key}.description`);
      },
    };
  }),
);

// Localized radar chart labels dynamically computed from localized criteria
const radarLabels = computed(() => criteria.value.map((c) => c.label));

// Evaluators database
const evaluators = ref(
  evaluatorsList.map((e) => {
    // Use badge classes from current theme style if not specified
    const classificationStyles = {
      Balanced: "bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]",
      Generous: "bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]",
      Strict: "bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444]",
    };
    const badgeClass =
      e.badgeClass ||
      classificationStyles[e.classification] ||
      classificationStyles.Balanced;

    return {
      ...e,
      badgeClass,
      get classificationText() {
        return t(`evaluation.classifications.${e.classification}`);
      },
    };
  }),
);

const selectedEvaluatorIndex = ref(0);
const selectedEvaluator = computed(
  () => evaluators.value[selectedEvaluatorIndex.value],
);

// Dynamic strongest/weakest trait computations based on sliders
const commaSeparator = computed(() => {
  return locale.value === "ar" ? "، " : ", ";
});

const strongestAspects = computed(() => {
  const sorted = [...criteria.value].sort((a, b) => b.value - a.value);
  if (sorted.length === 0) return "";
  const maxVal = sorted[0].value;
  const top = sorted.filter((c) => c.value === maxVal).slice(0, 2);
  return top.map((t) => `${t.label} (${t.value}/5)`).join(commaSeparator.value);
});

const weakestAspects = computed(() => {
  const sorted = [...criteria.value].sort((a, b) => a.value - b.value);
  if (sorted.length === 0) return "";
  const minVal = sorted[0].value;
  const bottom = sorted.filter((c) => c.value === minVal).slice(0, 2);
  return bottom.map((b) => `${b.label} (${b.value}/5)`).join(commaSeparator.value);
});

// Calculate rating values dynamically or fallback to screen designs
const yourRating = computed(() => {
  if (criteria.value.length === 0) return "0.0";
  const sum = criteria.value.reduce((acc, c) => acc + c.value, 0);
  const maxPossible = criteria.value.length * 5;
  return ((sum / maxPossible) * 100).toFixed(1);
});

const teamRating = computed(() => {
  const scores = props.data?.teamScores || defaultTeamScores;
  if (scores.length === 0) return "0.0";
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return ((sum / (scores.length * 5)) * 100).toFixed(1);
});

const aiRating = computed(() => {
  const scores = props.data?.aiScores || defaultAiScores;
  if (scores.length === 0) return "0.0";
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return ((sum / (scores.length * 5)) * 100).toFixed(1);
});

const biasMetrics = computed(() => {
  return {
    balanceRate: props.data?.biasMetrics?.balanceRate || t("evaluation.balance_rate_value"),
    averageBias: props.data?.biasMetrics?.averageBias || t("evaluation.average_bias_value"),
    highestBias: props.data?.biasMetrics?.highestBias || t("evaluation.highest_bias_value"),
  };
});

// Dynamic sliders scores series
const sliderScores = computed(() => criteria.value.map((c) => c.value));

// Map series data for display
const sliderSeries = computed(() => [
  {
    name: t("evaluation.legends.current"),
    values: sliderScores.value,
    strokeColor: "#3B82F6",
    fillColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    name: t("evaluation.legends.team"),
    values: teamScores,
    strokeColor: "#F59E0B",
    fillColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    name: t("evaluation.legends.ai"),
    values: aiScores,
    strokeColor: "#10B981",
    fillColor: "rgba(16, 185, 129, 0.08)",
  },
]);

const biasSeries = computed(() => [
  {
    name: t("evaluation.legends.current"),
    values: selectedEvaluator.value.scores,
    strokeColor: "#3B82F6",
    fillColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    name: t("evaluation.legends.team"),
    values: teamScores,
    strokeColor: "#F59E0B",
    fillColor: "rgba(245, 158, 11, 0.08)",
  },
  {
    name: t("evaluation.legends.ai"),
    values: aiScores,
    strokeColor: "#10B981",
    fillColor: "rgba(16, 185, 129, 0.08)",
  },
]);

// Helper to reset a slider to its default value
const resetCriterion = (index) => {
  criteria.value[index].value = 3;
};
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Sidebar (تقييم الفكرة - Static across dashboard view states) -->
    <div class="lg:col-span-3">
      <BaseBox class="p-3 white-border rounded-2xl">
        <!-- Sidebar Title with Stars -->
        <div class="flex justify-between items-center pb-3">
          <h2 class="sidebar-gradient-title secondery-text-gradient mb-0!">
            {{ $t("evaluation.title") }}
          </h2>
          <SvgIcon name="stars" />
        </div>

        <!-- Gradient Info Box -->
        <div
          class="px-7 py-5 rounded-2xl rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#06B6D4] via-[#3B82F6] to-[#FF6B35]"
        >
          <h3 class="text-white text-base font-bold">{{ props.data?.ideaId || 'IDEA-1023' }}</h3>
          <h4 class="text-white text-lg font-bold leading-normal">
            {{ props.data?.ideaTitle || $t('evaluation.default_idea_title') }}
          </h4>
          <span class="text-white text-xs">
            <template v-if="props.data?.ideaSubmitter">
              {{ props.data.ideaSubmitter }}
              <template v-if="props.data.ideaDepartment"> - {{ props.data.ideaDepartment }}</template>
            </template>
            <template v-else>
              {{ $t('evaluation.default_submitter') }} - {{ $t('evaluation.default_department') }}
            </template>
          </span>

          <span
            class="block mt-4.5 w-fit px-3 py-2 rounded-full bg-[#32BEA6] text-white text-xs"
          >
            {{ $t("evaluation.live_radar_active") }}
          </span>
        </div>

        <!-- Metric rating cards (Data-driven ScoreCards!) -->
        <div class="mt-8">
          <ScoreCard
            :label="$t('evaluation.your_evaluation')"
            :value="yourRating"
          />
          <ScoreCard
            :label="$t('evaluation.team_average')"
            :value="teamRating"
          />
          <ScoreCard
            :label="$t('evaluation.ai_initial_evaluation')"
            :value="aiRating"
          />
        </div>

        <!-- Transition bias button (Shown in sliders view) -->
        <BaseButton
          v-if="currentView === 'sliders'"
          @click="currentView = 'bias'"
          class="w-full py-3 border border-[#5CE1E6] text-[#5CE1E6] hover:bg-[#5CE1E6]/5 font-medium"
        >
          <span>{{ $t("evaluation.show_bias_ratio") }}</span>
          <svg
            class="w-4 h-4 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </BaseButton>
      </BaseBox>
    </div>

    <!-- Main Content Panels -->
    <!-- VIEW A: Criteria Sliders -->
    <template v-if="currentView === 'sliders'">
      <!-- Center: 8 Criteria sliders (Data-driven EvaluationCriteria!) -->
      <div class="lg:col-span-5 flex flex-col gap-4">
        <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-5">
          <div class="border-b border-white/10 pb-3">
            <h3 class="text-white text-sm md:text-base font-bold">
              {{ $t("evaluation.evaluation_criteria") }}
            </h3>
          </div>

          <!-- Criteria sliders wrapper list -->
          <div class="flex flex-col gap-4.5">
            <EvaluationCriterion
              v-for="(crit, index) in criteria"
              :key="crit.key"
              :label="crit.label"
              :description="crit.description"
              :percentage="crit.weight"
              v-model="crit.value"
              @reset="resetCriterion(index)"
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
          <div class="w-full h-[220px] flex items-center justify-center">
            <RadarChart :labels="radarLabels" :series="sliderSeries" />
          </div>

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

    <!-- VIEW B: Evaluator Bias Dashboard (Screen 1 Layout) -->
    <template v-else-if="currentView === 'bias'">
      <!-- Left side (Evaluators list column using EvaluatorCard!) -->
      <div class="lg:col-span-3 flex flex-col gap-4">
        <BaseBox class="p-6 gradient-border rounded-2xl flex flex-col gap-4">
          <!-- Header and Manager mode button -->
          <div
            class="flex justify-between items-center border-b border-white/10 pb-3"
          >
            <button
              class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[rgba(1,138,175,0.2)] to-[rgba(127,79,255,0.2)] border border-[#7F4FFF]/30 text-[#7F4FFF] text-[10px] font-bold hover:bg-white/5 transition-colors cursor-pointer"
            >
              {{ $t("evaluation.evaluator_manager_mode") }}
            </button>
            <h3 class="text-white text-sm md:text-base font-bold">
              {{ $t("evaluation.evaluators") }}
            </h3>
          </div>

          <!-- List of Evaluators -->
          <div class="flex flex-col gap-3.5">
            <EvaluatorCard
              v-for="(evaluator, index) in evaluators"
              :key="evaluator.name"
              :evaluator="evaluator"
              :is-active="selectedEvaluatorIndex === index"
              @click="selectedEvaluatorIndex = index"
            />
          </div>
        </BaseBox>
      </div>

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
                @click="currentView = 'sliders'"
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
            <RadarChart
              :labels="radarLabels"
              :series="biasSeries"
              :size="260"
            />
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
                :value="biasMetrics.balanceRate"
              />
              <BiasMetricCard
                :label="$t('evaluation.average_bias')"
                :value="biasMetrics.averageBias"
              />
              <BiasMetricCard
                :label="$t('evaluation.highest_bias')"
                :value="biasMetrics.highestBias"
              />
            </div>

            <!-- Informational footnotes -->
            <div
              class="mt-1 flex flex-col gap-1 text-[10px] text-white/40 pr-1 leading-relaxed"
            >
              <p>
                {{ $t("evaluation.footnotes.strict") }}
              </p>
              <p>
                {{ $t("evaluation.footnotes.generous") }}
              </p>
              <p>
                {{ $t("evaluation.footnotes.balanced") }}
              </p>
            </div>
          </div>
        </BaseBox>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
