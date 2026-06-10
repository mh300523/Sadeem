<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import mockData from "@/mockData.json";
import BaseBox from "@/components/ui/BaseBox.vue";
import KpiCard from "@/components/dashboard/analytics/KpiCard.vue";
import DetailDrawer from "@/components/dashboard/analytics/DetailDrawer.vue";
import GaugeChart from "@/components/dashboard/analytics/GaugeChart.vue";
import RadarChart from "@/components/dashboard/analytics/RadarChart.vue";
import TreemapChart from "@/components/dashboard/analytics/TreemapChart.vue";
import BubbleCluster from "@/components/dashboard/analytics/BubbleCluster.vue";
import DonutChart from "@/components/dashboard/analytics/DonutChart.vue";
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import StreamChart from "@/components/dashboard/analytics/StreamChart.vue";
import BaseFilter from "@/components/ui/BaseFilter.vue";
import BaseSparklineBars from "@/components/ui/BaseSparklineBars.vue";
import { useFilters } from "@/composables/useFilters";
import BaseButton from "@/components/ui/BaseButton.vue";

const { t } = useI18n();

// Local UI reactive states
const activeScreen = ref("snapshot");

// Setup filter states via useFilters composable
const { activeFilters, handleFiltersChange } = useFilters({
  timeframe: "yearly",
  department: "all",
  innovationType: "all",
});

const isDrawerOpen = ref(false);
const selectedKpiDetails = ref(null);

// Extract configuration and payload from API-ready mockData
const analyticsData = mockData.analytics;
const liveSignal = analyticsData.liveSignal;
const quickActions = analyticsData.quickActions;
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
const drawerDetails = analyticsData.drawerDetails;

// Load department list from main dashboard filter options for consistency
const departmentsList = computed(() => {
  const deptFilter = mockData.dashboard.filters.find(
    (f) => f.id === "department",
  );
  if (!deptFilter) return [];
  // Exclude "all" value
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

// Dynamic titles & descriptions
const screenInfo = computed(() => {
  return {
    snapshot: {
      desc: t("analytics.screens.snapshot_desc"),
    },
    outcomes: {
      desc: t("analytics.screens.outcomes_desc"),
    },
    portfolio: {
      desc: "Detailed view of innovation type, output, technology, and departmental distribution.",
    },
    impact: {
      desc: "Expected and realized impact indicators beyond the executive summary.",
    },
    governance: {
      desc: "Evaluation control, approval cycle time, and governance quality.",
    },
    intelligence: {
      desc: "AI-generated insights, similarity detection, IP potential, and future trends.",
    },
  };
});

// KPI Detail Selector logic
function handleSelectKpi(kpiId) {
  const details = drawerDetails[kpiId];
  if (details) {
    selectedKpiDetails.value = details;
    isDrawerOpen.value = true;
  }
}

// Custom helper styles mapping
function getHeatClass(rowName, value) {
  // Map values based on hierarchy
  if (rowName === "Viable" || rowName === "مجدية") {
    if (value > 100)
      return "bg-rose-500/20 text-rose-400 border border-rose-500/10";
    if (value > 85)
      return "bg-amber-500/20 text-amber-400 border border-amber-500/10";
    return "bg-violet-500/20 text-violet-400 border border-violet-500/10";
  }
  if (rowName === "Redesign" || rowName === "بحاجة لإعادة تصميم") {
    if (value > 65)
      return "bg-violet-500/20 text-violet-400 border border-violet-500/10";
    if (value > 45)
      return "bg-[#34d3ff]/15 text-[#34d3ff] border border-[#34d3ff]/10";
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10";
  }
  // Non-viable
  if (value > 30)
    return "bg-amber-500/20 text-amber-400 border border-[#f59e0b]/10";
  if (value > 20)
    return "bg-[#34d3ff]/15 text-[#34d3ff] border border-[#34d3ff]/10";
  return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10";
}

function getGovernanceHeatClass(level) {
  if (level === "h1")
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10";
  if (level === "h2")
    return "bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/10";
  return "bg-violet-500/20 text-violet-400 border border-violet-500/10";
}

function getStatusBadgeClass(type) {
  if (type === "green")
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  if (type === "cyan") return "border-cyan-500/20 bg-cyan-500/10 text-cyan-400";
  return "border-amber-500/20 bg-amber-500/10 text-amber-400";
}

function getCustomGradient(label) {
  if (label === "High IP") return "from-emerald-500 to-[#14b8a6]";
  if (label === "Medium IP") return "from-[#f59e0b] to-[#f97316]";
  return "from-rose-500 to-[#fb7185]";
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar navigation area (already exists in design layout) -->
    <aside class="lg:col-span-3">
      <BaseBox class="border border-white/10 rounded-2xl py-6">
        <!-- Brand logo section -->
        <div class="px-6 pb-[20px] border-b border-white/40 mb-4">
          <h1 class="sidebar-gradient-title secondery-text-gradient">
            {{ $t("analytics.sidebar.brand_title") }}
          </h1>
          <p class="text-white">
            {{ $t("analytics.sidebar.brand_subtitle") }}
          </p>
        </div>

        <!-- Navigation tabs -->
        <div class="px-6">
          <ul class="divide-y divide-white/20">
            <li
              v-for="scrKey in Object.keys(screens)"
              :key="scrKey"
              class="py-4"
            >
              <button
                @click="activeScreen = scrKey"
                class="w-full flex justify-between items-center gap-3.5 cursor-pointer font-medium text-white text-base md:text-lg hover:text-[#FF6B35]"
              >
                <div class="flex items-center gap-2.5">
                  <span
                    v-if="activeScreen === scrKey"
                    class="w-1.5 h-1.5 rounded-full bg-[#34d3ff] shadow-[0_0_8px_rgba(52,211,255,0.8)]"
                  ></span>
                  <span>{{ $t(`analytics.screens.${scrKey}`) }}</span>
                </div>
                <!-- Left pointing chevron in RTL, right in LTR -->
                <svg
                  class="w-5 h-5 shrink-0 transform rtl:rotate-0 ltr:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <!-- Live Signal module -->
        <div class="px-6 mb-6">
          <BaseBox class="pt-[20px] px-4" type="glass">
            <h4 class="text-[#05D989] font-medium uppercase">
              {{ $t("analytics.live_signal") }}
            </h4>

            <div class="flex items-center justify-between mt-2">
              <h5 class="text-xs text-white/76">
                {{ $t("analytics.total_platform_ideas") }}
              </h5>
              <span class="text-white text-3xl font-extrabold italic">
                {{ liveSignal.value }}
              </span>
            </div>
            <!-- indicator bars -->
            <BaseSparklineBars :data="liveSignal.sparkline" />
          </BaseBox>
        </div>

        <!-- Quick Actions list -->
        <div class="px-6">
          <!-- Orange pill button-style header -->
          <h2
            class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
          >
            {{ $t("analytics.quick_actions") }}
          </h2>
          <BaseButton
            v-for="action in quickActions"
            :key="action.id"
            class="w-full !py-4 !justify-between !rounded-2xl border border-white/10 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl text-white hover:translate-x-[-2px] mb-3"
          >
            {{ $t(action.labelKey) }}
          </BaseButton>
        </div>
      </BaseBox>
    </aside>

    <!-- Main Content Area -->
    <div class="lg:col-span-9">
      <!-- Topbar Header & Filters -->
      <div
        class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-6"
      >
        <div class="flex-1">
          <h1 class="text-lg lg:text-xl font-bold primary-text-gradient mb-3">
            {{ $t(`analytics.screens.${activeScreen}`) }}
          </h1>
          <p class="text-xs text-white/70 leading-relaxed">
            {{ screenInfo[activeScreen]?.desc }}
          </p>
        </div>

        <!-- Filters bar configuration-driven selection - ordered right-to-left under RTL -->
        <div
          class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto flex-1.5"
        >
          <BaseFilter
            :filters="analyticsFilters"
            @update:filters="handleFiltersChange"
            buttonClass="rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#018AAF]/10 to-[#7F4FFF]/10 px-4 py-2 rounded-full"
          />

          <!-- Export button (leftmost in RTL) -->
          <BaseButton class="gradient-purple py-2! text-white w-full md:w-auto">
            {{ $t("analytics.actions.export_pdf") }}
          </BaseButton>
        </div>
      </div>

      <!-- Active view renderer -->
      <transition name="fade" mode="out-in">
        <!-- Screen: Snapshot -->
        <div v-if="activeScreen === 'snapshot'">
          <BaseBox
            type="glass"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-[20px]! gradient-border mb-5"
          >
            <KpiCard
              v-for="kpi in screens.snapshot.kpis"
              :key="kpi.id"
              v-bind="kpi"
              @select="handleSelectKpi"
            />
          </BaseBox>

          <!-- Gauge and Radar visual row -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-5">
            <BaseBox class="lg:col-span-6 rounded-[20px] p-6" type="glass">
              <h2
                class="text-lg lg:text-xl font-bold primary-text-gradient mb-3"
              >
                {{ $t("analytics.snapshot.radar_title") }}
              </h2>
              <p class="text-xs text-white/70 mb-7">
                {{ $t("analytics.snapshot.radar_subtitle") }}
              </p>
              <RadarChart
                :series="screens.snapshot.radar.series"
                :categories="screens.snapshot.radar.categories"
              />
            </BaseBox>
            <BaseBox class="lg:col-span-6 rounded-[20px] p-6" type="glass">
              <div>
                <h2
                  class="text-lg lg:text-xl font-bold primary-text-gradient mb-3"
                >
                  {{ $t("analytics.snapshot.gauge_title") }}
                </h2>
                <p class="text-xs text-white/70 mb-7">
                  {{ $t("analytics.snapshot.gauge_subtitle") }}
                </p>
              </div>
              <GaugeChart
                :value="screens.snapshot.gaugeValue"
                :label="$t('analytics.snapshot.gauge_label')"
              />
            </BaseBox>
          </div>

          <!-- Timeline and Outcome Row (Swapped order in DOM so Timeline is right, Outcome Summary is left in RTL) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <!-- Timeline panel -->

            <BaseBox class="rounded-[20px] p-4 lg:col-span-8" type="glass">
              <h2
                class="text-lg lg:text-xl font-bold primary-text-gradient mb-3"
              >
                {{ $t("analytics.timeline.title") }}
              </h2>
              <div
                class="relative flex items-center justify-between my-6 min-h-[160px]"
              >
                <!-- The horizontal connector line -->
                <span
                  class="absolute left-6 right-6 h-1.5 ltr:bg-[linear-gradient(to_left,#00000000_0%,#44CCFF_50%,#7F4FFF_85%,#00000000_100%)] rtl:bg-[linear-gradient(to_right,#00000000_0%,#44CCFF_50%,#7F4FFF_85%,#00000000_100%)] top-1/2 -translate-y-1/2 rounded"
                ></span>

                <!-- Step items -->
                <div
                  v-for="(step, idx) in screens.snapshot.timeline"
                  :key="idx"
                  class="flex flex-col items-center relative z-10 w-1/4"
                >
                  <!-- Alternating label/value placements based on index -->
                  <!-- Top element -->
                  <div
                    class="h-10 flex items-end justify-center pb-2 text-center absolute -top-10 left-1/2 -translate-x-1/2 w-full"
                  >
                    <span
                      v-if="idx % 2 === 0"
                      class="text-base md:text-lg font-bold text-white"
                    >
                      {{ step.value }}
                    </span>
                    <h4
                      v-else
                      class="text-xs text-white/70 truncate max-w-[80px] md:max-w-none"
                    >
                      {{ $t(step.labelKey) }}
                    </h4>
                  </div>

                  <!-- Middle Circle Dot -->
                  <div
                    class="w-7 h-7 rounded-full flex items-center justify-center bg-[#8B5CF6]"
                  ></div>

                  <!-- Bottom element -->
                  <div
                    class="h-10 flex items-start justify-center pt-2.5 text-center absolute top-7 left-1/2 -translate-x-1/2 w-full"
                  >
                    <span
                      v-if="idx % 2 !== 0"
                      class="text-base md:text-lg font-bold text-white"
                    >
                      {{ step.value }}
                    </span>
                    <h4
                      v-else
                      class="text-xs text-white/70 truncate max-w-[80px] md:max-w-none"
                    >
                      {{ $t(step.labelKey) }}
                    </h4>
                  </div>
                </div>
              </div>
            </BaseBox>

            <!-- Outcome Summary panel -->

            <BaseBox class="rounded-[20px] p-4 lg:col-span-4" type="glass">
              <h2
                class="text-lg lg:text-xl font-bold primary-text-gradient mb-3"
              >
                {{ $t("analytics.snapshot.outcome_title") }}
              </h2>
              <div class="grid grid-cols-2 gap-3.5">
                <BaseBox
                  type="glass"
                  v-for="(out, idx) in screens.snapshot.outcomeSummary"
                  :key="idx"
                  class="p-4 rounded-xl border border-white/5 bg-white/[0.03] text-right ltr:text-left animate-pulse-subtle"
                >
                  <h3 class="text-xs text-white/70 block mb-3">
                    {{ $t(out.labelKey) }}
                  </h3>
                  <span class="text-lg font-bold text-white italic">{{
                    out.value
                  }}</span>
                </BaseBox>
              </div>
            </BaseBox>
          </div>
        </div>

        <!-- Screen: Outcomes -->
        <div v-else-if="activeScreen === 'outcomes'" class="">
          <BaseBox
            type="glass"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-[20px]! gradient-border mb-5"
          >
            <KpiCard
              v-for="kpi in screens.outcomes.kpis"
              :key="kpi.id"
              v-bind="kpi"
              @select="handleSelectKpi"
            />
          </BaseBox>

          <!-- Heatmap table and Distribution horizontal bars row -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-5">
            <!-- Decision Distribution bars -->
            <BaseBox class="lg:col-span-6 rounded-[20px] p-6" type="glass">
              <h2
                class="text-lg lg:text-xl font-bold primary-text-gradient mb-3"
              >
                {{ $t("analytics.outcomes.distribution_title") }}
              </h2>
              <p class="text-xs text-white/70 mb-7">
                {{ $t("analytics.outcomes.distribution_subtitle") }}
              </p>
              <div class="flex flex-col gap-5">
                <ProgressBar
                  v-for="(dist, idx) in screens.outcomes.distribution"
                  :key="idx"
                  :value="dist.value"
                  :label="dist.label"
                  :valueText="`${dist.value}%`"
                />
              </div>
            </BaseBox>

            <!-- Outcome Heatmap Custom Implementation -->
            <BaseBox class="lg:col-span-6 rounded-[20px] p-6" type="glass">
              <h2
                class="text-lg lg:text-xl font-bold primary-text-gradient mb-3"
              >
                {{ $t("analytics.outcomes.heatmap_title") }}
              </h2>
              <p class="text-xs text-white/70 mb-7">
                {{ $t("analytics.outcomes.heatmap_subtitle") }}
              </p>

              <div class="overflow-x-auto">
                <table class="w-full text-right ltr:text-left border-collapse">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="pb-3 text-xs font-bold text-white/50"></th>
                      <th
                        v-for="cat in screens.outcomes.heatmap.categories"
                        :key="cat"
                        class="pb-3 text-xs font-bold text-white/70 text-center"
                      >
                        {{ cat }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, idx) in screens.outcomes.heatmap.series"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-4 text-xs font-bold text-white/80">
                        {{ row.name }}
                      </td>
                      <td
                        v-for="(val, vIdx) in row.data"
                        :key="vIdx"
                        class="py-2.5 px-1.5"
                      >
                        <div
                          class="min-h-[44px] rounded-xl flex items-center justify-center font-bold text-xs shadow-inner"
                          :class="getHeatClass(row.name, val)"
                        >
                          {{ val }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </BaseBox>
          </div>
        </div>

        <!-- Screen: Portfolio -->
        <div
          v-else-if="activeScreen === 'portfolio'"
          class="flex flex-col gap-6"
        >
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white">
                  {{ $t("analytics.portfolio_tab.treemap_title") }}
                </h3>
                <span class="text-[10px] text-white/40 block mb-6"
                  >Visual output distribution</span
                >
              </div>
              <TreemapChart :data="screens.portfolio.treemap" />
            </div>

            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white">
                  {{ $t("analytics.portfolio_tab.bubbles_title") }}
                </h3>
                <span class="text-[10px] text-white/40 block mb-6"
                  >Technology share bubbles</span
                >
              </div>
              <BubbleCluster
                :bubbles="screens.portfolio.bubbles"
                :height="320"
              />
            </div>

            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white">
                  {{ $t("analytics.portfolio_tab.sunburst_title") }}
                </h3>
                <span class="text-[10px] text-white/40 block mb-6"
                  >Mix of innovation categories</span
                >
              </div>
              <DonutChart
                :series="screens.portfolio.sunburst.series"
                :labels="
                  screens.portfolio.sunburst.labels.map(
                    (l) => `analytics.filters.${l.toLowerCase()}`,
                  )
                "
                :totalValue="screens.portfolio.sunburst.total"
                totalLabelKey="analytics.total_platform_ideas"
              />
            </div>
          </div>

          <!-- Ideas per Dept and Type Summary row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.portfolio_tab.dept_title") }}
              </h3>
              <div class="flex flex-col gap-5">
                <ProgressBar
                  v-for="(dept, idx) in screens.portfolio.departments"
                  :key="idx"
                  :value="dept.value"
                  :max="300"
                  :label="dept.label"
                  :valueText="String(dept.value)"
                  customFillClass="bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]"
                />
              </div>
            </div>

            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.portfolio_tab.mix_title") }}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-right ltr:text-left border-collapse text-xs md:text-sm"
                >
                  <thead>
                    <tr class="border-b border-white/10 text-white/50">
                      <th class="pb-3 text-xs font-bold">
                        {{ $t("analytics.portfolio_tab.headers.type") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.portfolio_tab.headers.ideas") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.portfolio_tab.headers.share") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(sum, idx) in screens.portfolio.typeSummary"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-3.5 text-white/80 font-semibold">
                        {{ sum.type }}
                      </td>
                      <td class="py-3.5 text-center text-white/90 font-bold">
                        {{ sum.ideas }}
                      </td>
                      <td class="py-3.5 text-center text-[#34d3ff] font-bold">
                        {{ sum.share }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Screen: Impact -->
        <div v-else-if="activeScreen === 'impact'" class="flex flex-col gap-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Expected Impact Table -->
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.impact_tab.expected_title") }}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-right ltr:text-left border-collapse text-xs md:text-sm"
                >
                  <thead>
                    <tr class="border-b border-white/10 text-white/50">
                      <th class="pb-3 text-xs font-bold">
                        {{ $t("analytics.impact_tab.headers.indicator") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.value") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.status") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(exp, idx) in screens.impact.expected"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-3.5 text-white/80 font-semibold">
                        {{ $t(exp.indicatorKey) }}
                      </td>
                      <td class="py-3.5 text-center text-white/90 font-bold">
                        {{ exp.value }}
                      </td>
                      <td class="py-3.5 text-center">
                        <span
                          class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                          :class="getStatusBadgeClass(exp.statusType)"
                        >
                          {{ $t(exp.statusKey) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Measured Impact Table -->
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.impact_tab.measured_title") }}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-right ltr:text-left border-collapse text-xs md:text-sm"
                >
                  <thead>
                    <tr class="border-b border-white/10 text-white/50">
                      <th class="pb-3 text-xs font-bold">
                        {{ $t("analytics.impact_tab.headers.indicator") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.value") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.status") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(meas, idx) in screens.impact.measured"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-3.5 text-white/80 font-semibold">
                        {{ $t(meas.indicatorKey) }}
                      </td>
                      <td class="py-3.5 text-center text-white/90 font-bold">
                        {{ meas.value }}
                      </td>
                      <td class="py-3.5 text-center">
                        <span
                          class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                          :class="getStatusBadgeClass(meas.statusType)"
                        >
                          {{ $t(meas.statusKey) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Impact Bands & Themes row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.impact_tab.bands_title") }}
              </h3>
              <div class="flex flex-col gap-5">
                <ProgressBar
                  v-for="(band, idx) in screens.impact.bands"
                  :key="idx"
                  :value="band.percentage"
                  :max="100"
                  :label="band.label"
                  :valueText="`${band.percentage}%`"
                  customFillClass="bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]"
                />
              </div>
            </div>

            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.impact_tab.themes_title") }}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-right ltr:text-left border-collapse text-xs md:text-sm"
                >
                  <thead>
                    <tr class="border-b border-white/10 text-white/50">
                      <th class="pb-3 text-xs font-bold">
                        {{ $t("analytics.impact_tab.headers.theme") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.ideas") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.expected_score") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(theme, idx) in screens.impact.themes"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-3.5 text-white/80 font-semibold">
                        {{ theme.theme }}
                      </td>
                      <td class="py-3.5 text-center text-white/90 font-bold">
                        {{ theme.ideas }}
                      </td>
                      <td class="py-3.5 text-center text-[#34d3ff] font-bold">
                        {{ theme.score }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Screen: Governance -->
        <div
          v-else-if="activeScreen === 'governance'"
          class="flex flex-col gap-6"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <!-- Governance Indicators -->
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-6">
                {{ $t("analytics.governance_tab.indicators_title") }}
              </h3>
              <div class="overflow-x-auto">
                <table
                  class="w-full text-right ltr:text-left border-collapse text-xs md:text-sm"
                >
                  <thead>
                    <tr class="border-b border-white/10 text-white/50">
                      <th class="pb-3 text-xs font-bold">
                        {{ $t("analytics.governance_tab.headers.kpi") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.value") }}
                      </th>
                      <th class="pb-3 text-xs font-bold text-center">
                        {{ $t("analytics.impact_tab.headers.status") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(gov, idx) in screens.governance.indicators"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-3.5 text-white/80 font-semibold">
                        {{ $t(gov.kpiKey) }}
                      </td>
                      <td class="py-3.5 text-center text-white/90 font-bold">
                        {{ gov.value }}
                      </td>
                      <td class="py-3.5 text-center">
                        <span
                          class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                          :class="getStatusBadgeClass(gov.statusType)"
                        >
                          {{ $t(gov.statusKey) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Governance Heat Layer Custom Heatmap -->
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-1">
                {{ $t("analytics.governance_tab.heat_title") }}
              </h3>
              <span class="text-[10px] text-white/40 block mb-6"
                >Governance targets tracking</span
              >

              <div class="overflow-x-auto">
                <table class="w-full text-right ltr:text-left border-collapse">
                  <thead>
                    <tr class="border-b border-white/10">
                      <th class="pb-3 text-xs font-bold text-white/50"></th>
                      <th
                        v-for="xCat in screens.governance.heatmap.xCategories"
                        :key="xCat"
                        class="pb-3 text-xs font-bold text-white/70 text-center"
                      >
                        {{ xCat }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, idx) in screens.governance.heatmap.data"
                      :key="idx"
                      class="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td class="py-4 text-xs font-bold text-white/80">
                        {{ row.name }}
                      </td>
                      <td
                        v-for="(cell, cIdx) in row.data"
                        :key="cIdx"
                        class="py-2.5 px-1.5"
                      >
                        <div
                          class="min-h-[44px] rounded-xl flex items-center justify-center font-bold text-xs shadow-inner"
                          :class="getGovernanceHeatClass(cell.level)"
                        >
                          {{ cell.y }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Screen: AI Intelligence -->
        <div
          v-else-if="activeScreen === 'intelligence'"
          class="flex flex-col gap-6"
        >
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <!-- Gauge Alignment -->
            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white">
                  {{ $t("analytics.intelligence_tab.ai_alignment_title") }}
                </h3>
                <span class="text-[10px] text-white/40 block mb-6"
                  >Readiness gauge analysis</span
                >
              </div>
              <GaugeChart
                :value="screens.intelligence.gaugeValue"
                :label="$t('analytics.intelligence_tab.gauge_sub')"
                :gradientColors="['#22d3ee', '#8b5cf6']"
              />
            </div>

            <!-- Similarity bubbles -->
            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white">
                  {{ $t("analytics.intelligence_tab.similarity_title") }}
                </h3>
                <span class="text-[10px] text-white/40 block mb-6"
                  >Similarity cluster groupings</span
                >
              </div>
              <BubbleCluster
                :bubbles="screens.intelligence.bubbles"
                :height="280"
              />
            </div>

            <!-- Probability bands progress bars -->
            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white mb-6">
                  {{ $t("analytics.intelligence_tab.probability_title") }}
                </h3>
              </div>
              <div class="flex flex-col gap-5 justify-center flex-1">
                <ProgressBar
                  v-for="(prob, idx) in screens.intelligence.probability"
                  :key="idx"
                  :value="prob.percentage"
                  :max="100"
                  :label="prob.label"
                  :valueText="`${prob.percentage}%`"
                  :customFillClass="`bg-gradient-to-r ${getCustomGradient(prob.label)}`"
                />
              </div>
            </div>
          </div>

          <!-- Predictive Stream Graph & AI Commentary Note -->
          <div class="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-4">
            <!-- Predictive Area Stream Chart -->
            <div class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5">
              <h3 class="text-sm font-bold text-white mb-2">
                {{ $t("analytics.intelligence_tab.predictive_title") }}
              </h3>
              <span class="text-[10px] text-white/40 block mb-6"
                >Area stream graphing model</span
              >
              <StreamChart
                :series="screens.intelligence.streamSeries"
                label="Emerging themes: AI triage, predictive dispatch, patient journey orchestration"
              />
            </div>

            <!-- AI Commentary note block -->
            <div
              class="p-5 rounded-3xl bg-[#091522]/90 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <h3 class="text-sm font-bold text-white mb-4">
                  {{ $t("analytics.intelligence_tab.commentary_title") }}
                </h3>
                <div
                  class="p-5 rounded-2xl border border-white/5 bg-white/[0.03] text-sm text-[#9dbad7] leading-relaxed text-right ltr:text-left relative overflow-hidden"
                >
                  <div
                    class="absolute -top-10 -left-10 w-24 h-24 bg-[#06b6d4]/10 rounded-full blur-2xl pointer-events-none"
                  ></div>
                  {{ $t(screens.intelligence.aiCommentaryKey) }}
                </div>
              </div>
              <div
                class="text-[10px] text-white/30 text-right ltr:text-left select-none font-bold uppercase tracking-wider pt-4"
              >
                Sadeem Platform Insights Engine
              </div>
            </div>
          </div>
        </div>
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
