import { computed } from "vue";
import mockData from "@/mockData.json";

/**
 * Normalizes evaluation tab data from props with fallback to mock defaults.
 * Exposes only raw dynamic data that maps to future API responses.
 *
 * @param {import('vue').Ref<Object>} dataRef - Reactive reference to props.data
 */
export function useEvaluationData(dataRef) {
  // Navigate mockData's nested structure to find the default evaluation payload
  const defaultEvaluationData =
    mockData.details?.default?.tabs?.find((t) => t.key === "evaluation")?.data ||
    {};

  const idea = computed(() => {
    const data = dataRef.value || {};
    return {
      id: data.ideaId ?? defaultEvaluationData.ideaId ?? "IDEA-1023",
      title: data.ideaTitle ?? defaultEvaluationData.ideaTitle ?? "",
      submitter: data.ideaSubmitter ?? defaultEvaluationData.ideaSubmitter ?? "",
      department: data.ideaDepartment ?? defaultEvaluationData.ideaDepartment ?? "",
    };
  });

  const rawCriteria = computed(() => {
    return dataRef.value?.criteria ?? defaultEvaluationData.criteria ?? [];
  });

  const aiScores = computed(() => {
    return dataRef.value?.aiScores ?? defaultEvaluationData.aiScores ?? [];
  });

  const teamScores = computed(() => {
    return dataRef.value?.teamScores ?? defaultEvaluationData.teamScores ?? [];
  });

  const rawEvaluators = computed(() => {
    return dataRef.value?.evaluators ?? defaultEvaluationData.evaluators ?? [];
  });

  const biasMetrics = computed(() => {
    const metrics = dataRef.value?.biasMetrics ?? defaultEvaluationData.biasMetrics ?? {};
    return {
      balanceRate: metrics.balanceRate ?? "",
      averageBias: metrics.averageBias ?? "",
      highestBias: metrics.highestBias ?? "",
    };
  });

  return {
    idea,
    rawCriteria,
    aiScores,
    teamScores,
    rawEvaluators,
    biasMetrics,
  };
}
