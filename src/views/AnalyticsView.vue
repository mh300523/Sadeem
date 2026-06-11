<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import mockData from "@/mockData.json";
import { useFilters } from "@/composables/useFilters";

import AnalyticsSidebar from "@/components/dashboard/analytics/AnalyticsSidebar.vue";
import AnalyticsToolbar from "@/components/dashboard/analytics/AnalyticsToolbar.vue";
import SnapshotScreen from "@/components/dashboard/analytics/screens/SnapshotScreen.vue";
import OutcomesScreen from "@/components/dashboard/analytics/screens/OutcomesScreen.vue";
import PortfolioScreen from "@/components/dashboard/analytics/screens/PortfolioScreen.vue";
import ImpactScreen from "@/components/dashboard/analytics/screens/ImpactScreen.vue";
import GovernanceScreen from "@/components/dashboard/analytics/screens/GovernanceScreen.vue";
import IntelligenceScreen from "@/components/dashboard/analytics/screens/IntelligenceScreen.vue";
import DetailDrawer from "@/components/dashboard/analytics/DetailDrawer.vue";

const { t } = useI18n();

// Local UI reactive states
const activeScreen = ref("snapshot");

// Setup filter states via useFilters composable
const { activeFilters, handleFiltersChange } = useFilters({
  timeframe: "yearly",
  department: "all",
  innovationType: "all",
});

// Extract configuration and payload from API-ready mockData
const analyticsData = mockData.analytics;
const liveSignal = analyticsData.liveSignal;
const quickActions = analyticsData.quickActions;
const drawerDetails = analyticsData.drawerDetails;

// Drawer state
const isDrawerOpen = ref(false);
const selectedKpiDetails = ref(null);

// Helper function to calculate a unique hash from strings
function getStringHash(str) {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
}

// Dynamically calculate screens analytics metrics reactively based on filters
const screens = computed(() => {
  const baseScreens = JSON.parse(JSON.stringify(mockData.analytics.screens));

  // Calculate multiplier based on active filters
  let multiplier = 1.0;
  if (
    activeFilters.value.department &&
    activeFilters.value.department !== "all"
  ) {
    multiplier *= 0.42;
  }
  if (
    activeFilters.value.innovationType &&
    activeFilters.value.innovationType !== "all"
  ) {
    multiplier *= 0.28;
  }
  if (activeFilters.value.timeframe === "quarterly") {
    multiplier *= 0.25;
  } else if (activeFilters.value.timeframe === "monthly") {
    multiplier *= 0.08;
  }

  // If no filters are active, return original mock config directly
  if (multiplier === 1.0) {
    return baseScreens;
  }

  // 1. Update Gauge Value based on selected filter hash
  const seed =
    getStringHash(activeFilters.value.department || "all") +
    getStringHash(activeFilters.value.innovationType || "all") +
    getStringHash(activeFilters.value.timeframe || "yearly");
  baseScreens.snapshot.gaugeValue = Math.max(
    65,
    Math.min(95, 86 + (seed % 13) - 6),
  );

  // 2. Update Radar Chart Series data
  if (baseScreens.snapshot.radar?.series?.[0]?.data) {
    baseScreens.snapshot.radar.series[0].data =
      baseScreens.snapshot.radar.series[0].data.map((val, i) => {
        return Math.max(50, Math.min(98, val + ((seed + i) % 11) - 5));
      });
  }

  // 3. Scale Outcome Summary values
  baseScreens.snapshot.outcomeSummary.forEach((out) => {
    const rawVal = parseInt(out.value.replace(/,/g, "")) || 0;
    const scaled = Math.max(5, Math.round(rawVal * multiplier));
    out.value = scaled.toLocaleString();
  });

  // 4. Scale Timeline values
  baseScreens.snapshot.timeline.forEach((step) => {
    const rawVal = parseInt(step.value.replace(/,/g, "")) || 0;
    const scaled = Math.max(3, Math.round(rawVal * multiplier));
    step.value = scaled.toLocaleString();
  });

  // 5. Update KPI Cards reactively based on filter seed
  baseScreens.snapshot.kpis.forEach((kpi, idx) => {
    const valSeed = seed + idx;
    const baseVal = 88;
    const computedVal = Math.max(
      62,
      Math.min(96, baseVal + (valSeed % 11) - 5),
    );
    kpi.value = `${computedVal}%`;

    const baseGrowth = 5.3;
    const computedGrowth = Math.max(
      1.5,
      Math.min(9.5, baseGrowth + (valSeed % 7) * 0.7 - 2.1),
    ).toFixed(1);
    kpi.percentage = `+${computedGrowth}%`;

    kpi.sparkline = kpi.sparkline.map((h, sIdx) => {
      return Math.max(15, Math.min(95, h + ((valSeed + sIdx) % 15) - 7));
    });
  });

  return baseScreens;
});

// Load department list from main dashboard filter options for consistency
const departmentsList = computed(() => {
  const deptFilter = mockData.dashboard.filters.find(
    (f) => f.id === "department",
  );
  if (!deptFilter) return [];
  return deptFilter.options
    .filter((o) => o.value !== "all")
    .map((o) => o.value);
});

// Computed options for the BaseSelect filters
const timeframeOptions = computed(() => [
  { value: "yearly", label: t("analytics.filters.yearly") },
  { value: "quarterly", label: t("analytics.filters.quarterly") },
  { value: "monthly", label: t("analytics.filters.monthly") },
]);

const departmentOptions = computed(() => {
  const list = [
    { value: "all", label: t("analytics.filters.all_departments") },
  ];
  departmentsList.value.forEach((dept) => {
    list.push({ value: dept, label: dept });
  });
  return list;
});

const innovationTypeOptions = computed(() => [
  { value: "all", label: t("analytics.filters.all_types") },
  { value: "Incremental", label: t("analytics.filters.incremental") },
  { value: "Breakthrough", label: t("analytics.filters.breakthrough") },
  { value: "Disruptive", label: t("analytics.filters.disruptive") },
  { value: "Transformational", label: t("analytics.filters.transformational") },
]);

// Computed configuration for BaseFilter component
const analyticsFilters = computed(() => [
  {
    id: "innovationType",
    label: "",
    default: activeFilters.value.innovationType || "all",
    options: innovationTypeOptions.value,
  },
  {
    id: "department",
    label: "",
    default: activeFilters.value.department || "all",
    options: departmentOptions.value,
  },
  {
    id: "timeframe",
    label: "",
    default: activeFilters.value.timeframe || "yearly",
    options: timeframeOptions.value,
  },
]);

// KPI Detail Selector logic
function handleSelectKpi(kpiId) {
  const details = drawerDetails[kpiId];
  if (details) {
    selectedKpiDetails.value = details;
    isDrawerOpen.value = true;
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar navigation area -->
    <AnalyticsSidebar
      :screens="screens"
      :activeScreen="activeScreen"
      :liveSignal="liveSignal"
      :quickActions="quickActions"
      @update:activeScreen="activeScreen = $event"
    />

    <!-- Main Content Area -->
    <div class="lg:col-span-9">
      <!-- Topbar Header & Filters -->
      <AnalyticsToolbar
        :activeScreen="activeScreen"
        :analyticsFilters="analyticsFilters"
        @update:filters="handleFiltersChange"
      />

      <!-- Active view renderer -->
      <transition name="fade" mode="out-in">
        <SnapshotScreen
          v-if="activeScreen === 'snapshot'"
          :screenData="screens.snapshot"
          @select-kpi="handleSelectKpi"
        />

        <OutcomesScreen
          v-else-if="activeScreen === 'outcomes'"
          :screenData="screens.outcomes"
          @select-kpi="handleSelectKpi"
        />

        <PortfolioScreen
          v-else-if="activeScreen === 'portfolio'"
          :screenData="screens.portfolio"
        />

        <ImpactScreen
          v-else-if="activeScreen === 'impact'"
          :screenData="screens.impact"
        />

        <GovernanceScreen
          v-else-if="activeScreen === 'governance'"
          :screenData="screens.governance"
        />

        <IntelligenceScreen
          v-else-if="activeScreen === 'intelligence'"
          :screenData="screens.intelligence"
        />
      </transition>
    </div>

    <!-- Reusable dynamically driven Detail Drawer -->
    <DetailDrawer
      :isOpen="isDrawerOpen"
      :data="selectedKpiDetails"
      @close="isDrawerOpen = false"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
