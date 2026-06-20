import { defineAsyncComponent } from "vue";
import OverviewTab from "@/components/tabs/OverviewTab/index.vue";
import PlaceholderTab from "@/components/tabs/PlaceholderTab/index.vue";

export const tabRegistry = {
  overview: OverviewTab,
  story: defineAsyncComponent(() => import("@/components/tabs/StoryTab/index.vue")),
  business_model: defineAsyncComponent(() => import("@/components/tabs/BusinessModelTab/index.vue")),
  strategic_alignment: defineAsyncComponent(() => import("@/components/tabs/StrategicAlignmentTab/index.vue")),
  ip: defineAsyncComponent(() => import("@/components/tabs/IPTab/index.vue")),
  classification: defineAsyncComponent(() => import("@/components/tabs/ClassificationTab/index.vue")),
  evaluation: defineAsyncComponent(() => import("@/components/tabs/EvaluationTab/index.vue")),
  decision: defineAsyncComponent(() => import("@/components/tabs/DecisionTab/index.vue")),
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
