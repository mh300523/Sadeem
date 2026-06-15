import OverviewTab from "@/components/tabs/OverviewTab/index.vue";
import StoryTab from "@/components/tabs/StoryTab/index.vue";
import BusinessModelTab from "@/components/tabs/BusinessModelTab/index.vue";
import StrategicAlignmentTab from "@/components/tabs/StrategicAlignmentTab/index.vue";
import IPTab from "@/components/tabs/IPTab/index.vue";
import ClassificationTab from "@/components/tabs/ClassificationTab/index.vue";
import EvaluationTab from "@/components/tabs/EvaluationTab/index.vue";
import DecisionTab from "@/components/tabs/DecisionTab/index.vue";
import PlaceholderTab from "@/components/tabs/PlaceholderTab/index.vue";

export const tabRegistry = {
  overview: OverviewTab,
  story: StoryTab,
  business_model: BusinessModelTab,
  strategic_alignment: StrategicAlignmentTab,
  ip: IPTab,
  classification: ClassificationTab,
  evaluation: EvaluationTab,
  decision: DecisionTab,
};

export const iconRegistry = {
  overview: "solar_clipboard",
  story: "mingcute_robot-fill",
  business: "solar_chart-square-bold",
  alignment: "mingcute_target-fill",
  ip: "tabler_lock-filled",
  classification: "solar_widget-bold",
  evaluation: "solar_star-bold",
  decision: "tabler_scale-filled",
};

export function getTabComponent(key) {
  return tabRegistry[key] ?? PlaceholderTab;
}

export function getTabIconPath(key) {
  return iconRegistry[key] ?? iconRegistry.decision;
}
