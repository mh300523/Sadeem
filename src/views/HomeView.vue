<template>
  <div>
    <MainTitle :name="$t('dashboard.idea_evaluation_dashboard')" />

    <div class="mt-3">
      <StatsGrid :stats="dashboardData.stats" />

      <div class="flex flex-wrap items-center justify-between gap-4 my-6">
        <h2 class="text-lg font-medium text-white">
          {{ $t("dashboard.ideas_table") }}
        </h2>

        <BaseFilter
          :filters="dashboardData.filters"
          @update:filters="activeFilters = $event"
        />
      </div>

      <IdeasTable
        :ideas="filteredIdeas"
        :headers="dashboardData.headers"
        :statusConfigs="dashboardData.statusConfigs"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import MainTitle from "@/components/ui/MainTitle.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import BaseFilter from "@/components/ui/BaseFilter.vue";
import IdeasTable from "@/components/dashboard/IdeasTable.vue";

import mockData from "@/mockData.json";

const dashboardData = mockData.dashboard;

const activeFilters = ref({});

/*
|--------------------------------------------------------------------------
| Generic filter engine — reads "field" from each filter definition.
| When you switch to API, just send activeFilters as query params instead.
|--------------------------------------------------------------------------
*/

// Build a lookup: filterId → field name from the filter config
const filterFieldMap = computed(() => {
  const map = {};
  dashboardData.filters.forEach((f) => {
    if (f.field) map[f.id] = f.field;
  });
  return map;
});

const filteredIdeas = computed(() => {
  return dashboardData.ideas.filter((idea) => {
    return Object.entries(activeFilters.value).every(
      ([filterId, filterValue]) => {
        if (!filterValue || filterValue === "all") return true;

        const field = filterFieldMap.value[filterId];
        if (!field) return true; // no field mapping → skip (e.g. date filters)

        return idea[field] === filterValue;
      },
    );
  });
});
</script>
