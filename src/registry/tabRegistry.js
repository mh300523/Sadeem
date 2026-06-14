import OverviewTab from "@/components/tabs/OverviewTab.vue";
import StoryTab from "@/components/tabs/StoryTab.vue";
import BusinessModelTab from "@/components/tabs/BusinessModelTab.vue";
import StrategicAlignmentTab from "@/components/tabs/StrategicAlignmentTab.vue";
import IPTab from "@/components/tabs/IPTab.vue";
import ClassificationTab from "@/components/tabs/ClassificationTab.vue";
import EvaluationTab from "@/components/tabs/EvaluationTab.vue";
import DecisionTab from "@/components/tabs/DecisionTab.vue";
import PlaceholderTab from "@/components/tabs/PlaceholderTab.vue";

export const tabRegistry = {
  overview: OverviewTab,
  story: StoryTab,
  business_model: BusinessModelTab,
  strategic_alignment: StrategicAlignmentTab,
  ip: IPTab,
  classification: ClassificationTab,
  evaluation: EvaluationTab,
  decision: PlaceholderTab,
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
