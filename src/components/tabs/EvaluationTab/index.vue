<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import BaseBox from "@/components/ui/BaseBox.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

// Reusable blocks
import ScoreCard from "./ScoreCard.vue";
import EvaluationCriteriaBlock from "./EvaluationCriteriaBlock.vue";
import EvaluationBiasBlock from "./EvaluationBiasBlock.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const { t, locale } = useI18n();

// ─── Data Layer (Safe fallbacks directly from props.data) ───────────
const idea = computed(() => {
  const d = props.data || {};
  return {
    id: d.ideaId ?? "",
    title: d.ideaTitle ?? "",
    submitter: d.ideaSubmitter ?? "",
    department: d.ideaDepartment ?? "",
  };
});

const rawCriteria = computed(() => {
  return props.data?.criteria ?? [];
});

const aiScores = computed(() => {
  return props.data?.aiScores ?? [];
});

const teamScores = computed(() => {
  return props.data?.teamScores ?? [];
});

const rawEvaluators = computed(() => {
  return props.data?.evaluators ?? [];
});

const biasMetrics = computed(() => {
  const metrics = props.data?.biasMetrics ?? {};
  return {
    balanceRate: metrics.balanceRate ?? "",
    averageBias: metrics.averageBias ?? "",
    highestBias: metrics.highestBias ?? "",
  };
});

// ─── View Toggle State ─────────────────────────────────────────────────────
const currentView = ref("sliders");

// ─── Interactive local state for sliders (synchronized reactively) ────────
const criteria = ref([]);

watch(
  rawCriteria,
  (newCriteria) => {
    criteria.value = (newCriteria || []).map((crit) => ({ ...crit }));
  },
  { immediate: true },
);

// ─── Active Evaluator State ────────────────────────────────────────────────
const selectedEvaluatorIndex = ref(0);
watch(
  () => idea.value.id,
  () => {
    selectedEvaluatorIndex.value = 0;
  },
);

// ─── Evaluators database computed reactively ──────────────────────
const evaluators = computed(() => {
  const classificationStyles = {
    Balanced: "bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]",
    Generous: "bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]",
    Strict: "bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444]",
  };
  return rawEvaluators.value.map((e) => {
    const badgeClass =
      e.badgeClass ||
      classificationStyles[e.classification] ||
      classificationStyles.Balanced;
    return {
      ...e,
      badgeClass,
      classificationText: t(`evaluation.classifications.${e.classification}`),
    };
  });
});

const selectedEvaluator = computed(
  () => evaluators.value[selectedEvaluatorIndex.value] || {},
);

// ─── Radar Categories (Labels) ─────────────────────────────────────────────
const getCriterionLabel = (key) => t(`evaluation.criteria.${key}.label`);
const radarLabels = computed(() =>
  criteria.value.map((c) => getCriterionLabel(c.key)),
);

// ─── Ratings Computation Helper ────────────────────────────────────────────
const calculateRating = (scores) => {
  if (!scores || scores.length === 0) return "0.0";
  const sum = scores.reduce((acc, val) => acc + val, 0);
  return ((sum / (scores.length * 5)) * 100).toFixed(1);
};

const ratings = computed(() => ({
  yourRating: calculateRating(criteria.value.map((c) => c.value)),
  teamRating: calculateRating(teamScores.value),
  aiRating: calculateRating(aiScores.value),
}));

// ─── AI Insights Strongest/Weakest computations ───────────────────────────
const commaSeparator = computed(() => (locale.value === "ar" ? "، " : ", "));

const strongestAspects = computed(() => {
  const sorted = [...criteria.value].sort((a, b) => b.value - a.value);
  if (sorted.length === 0) return "";
  const maxVal = sorted[0].value;
  const top = sorted.filter((c) => c.value === maxVal).slice(0, 2);
  return top
    .map((t) => `${getCriterionLabel(t.key)} (${t.value}/5)`)
    .join(commaSeparator.value);
});

const weakestAspects = computed(() => {
  const sorted = [...criteria.value].sort((a, b) => a.value - b.value);
  if (sorted.length === 0) return "";
  const minVal = sorted[0].value;
  const bottom = sorted.filter((c) => c.value === minVal).slice(0, 2);
  return bottom
    .map((b) => `${getCriterionLabel(b.key)} (${b.value}/5)`)
    .join(commaSeparator.value);
});

// ─── Radar Series Styles and Builder ───────────────────────────────────────
const SERIES_STYLES = {
  current: {
    strokeColor: "#3B82F6",
    fillColor: "rgba(59, 130, 246, 0.12)",
  },
  team: {
    strokeColor: "#F59E0B",
    fillColor: "rgba(245, 158, 11, 0.08)",
  },
  ai: {
    strokeColor: "#10B981",
    fillColor: "rgba(16, 185, 129, 0.08)",
  },
};

const buildRadarSeries = (currentScores) => [
  {
    name: t("evaluation.legends.current"),
    values: currentScores,
    ...SERIES_STYLES.current,
  },
  {
    name: t("evaluation.legends.team"),
    values: teamScores.value,
    ...SERIES_STYLES.team,
  },
  {
    name: t("evaluation.legends.ai"),
    values: aiScores.value,
    ...SERIES_STYLES.ai,
  },
];

const sliderSeries = computed(() =>
  buildRadarSeries(criteria.value.map((c) => c.value)),
);
const biasSeries = computed(() =>
  buildRadarSeries(selectedEvaluator.value.scores || []),
);

// ─── Reset Slider Event Handler ────────────────────────────────────────────
const resetCriterion = (index) => {
  const original = rawCriteria.value?.[index]?.value;
  criteria.value[index].value = original !== undefined ? original : 3;
};
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Sidebar (Static across dashboard view states) -->
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
          <h3 class="text-white text-base font-bold">
            {{ idea.id }}
          </h3>
          <h4 class="text-white text-lg font-bold leading-normal">
            {{ idea.title || $t("evaluation.default_idea_title") }}
          </h4>
          <span class="text-white text-xs">
            <template v-if="idea.submitter">
              {{ idea.submitter }}
              <template v-if="idea.department">
                - {{ idea.department }}</template
              >
            </template>
            <template v-else>
              {{ $t("evaluation.default_submitter") }} -
              {{ $t("evaluation.default_department") }}
            </template>
          </span>

          <span
            class="block mt-4.5 w-fit px-3 py-2 rounded-full bg-[#32BEA6] text-white text-xs"
          >
            {{ $t("evaluation.live_radar_active") }}
          </span>
        </div>

        <!-- Metric rating ScoreCards (explicitly rendered) -->
        <div class="mt-8">
          <ScoreCard
            :label="$t('evaluation.your_evaluation')"
            :value="ratings.yourRating"
          />
          <ScoreCard
            :label="$t('evaluation.team_average')"
            :value="ratings.teamRating"
          />
          <ScoreCard
            :label="$t('evaluation.ai_initial_evaluation')"
            :value="ratings.aiRating"
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
    <EvaluationCriteriaBlock
      v-if="currentView === 'sliders'"
      :criteria="criteria"
      :radar-labels="radarLabels"
      :series="sliderSeries"
      :strongest-aspects="strongestAspects"
      :weakest-aspects="weakestAspects"
      @reset-criterion="resetCriterion"
    />

    <!-- VIEW B: Evaluator Bias Dashboard -->
    <EvaluationBiasBlock
      v-else-if="currentView === 'bias'"
      :evaluators="evaluators"
      :selected-evaluator="selectedEvaluator"
      :selected-evaluator-index="selectedEvaluatorIndex"
      :radar-labels="radarLabels"
      :series="biasSeries"
      :bias-metrics="biasMetrics"
      @select-evaluator="selectedEvaluatorIndex = $event"
      @back="currentView = 'sliders'"
    />
  </div>
</template>

<style scoped></style>
