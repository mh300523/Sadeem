<template>
  <div>
    <MainTitle :name="$t('dashboard.idea_evaluation_dashboard')" />

    <!-- Error State -->
    <div
      v-if="store.dashboardError"
      class="mt-6 p-6 bg-red-950/20 border border-red-500/30 rounded-2xl text-center"
    >
      <div class="text-red-400 font-medium mb-3">
        {{ store.dashboardError }}
      </div>
      <button
        @click="store.fetchDashboard"
        class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors border border-red-500/30"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="mt-3">
      <!-- Stats Grid (Skeleton vs Content) -->
      <BaseSkeleton
        v-if="store.dashboardLoading"
        type="grid"
        :count="8"
        :cols="8"
      />
      <StatsGrid v-else :stats="store.stats" />

      <!-- Section Title & Filters -->
      <div class="flex flex-wrap items-center justify-between gap-4 my-6">
        <h2 class="text-lg font-medium text-theme-text">
          {{ $t("dashboard.ideas_table") }}
        </h2>

        <!-- Filters (Skeleton vs Content) -->
        <BaseSkeleton
          v-if="store.dashboardLoading"
          type="box"
          height="h-10"
          custom-class="w-64 !rounded-full"
        />
        <BaseFilter
          v-else
          :filters="store.filters"
          @update:filters="handleFiltersChange"
        />
      </div>

      <!-- Ideas Table (Skeleton vs Content) -->
      <BaseSkeleton
        v-if="store.dashboardLoading"
        type="table"
        :count="5"
        :cols="8"
      />
      <IdeasTable
        v-else
        :ideas="filteredIdeas"
        :headers="store.headers"
        :statusConfigs="store.statusConfigs"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";

import MainTitle from "@/components/ui/MainTitle.vue";
import StatsGrid from "@/components/dashboard/StatsGrid.vue";
import BaseFilter from "@/components/ui/BaseFilter.vue";
import IdeasTable from "@/components/dashboard/IdeasTable.vue";
import BaseSkeleton from "@/components/ui/BaseSkeleton.vue";

import { useIdeaStore } from "@/stores/ideaStore";
import { useFilters } from "@/composables/useFilters";

const store = useIdeaStore();

onMounted(() => {
  store.fetchDashboard();
});

// Initialize the generic filter state with the dashboard filters config
const { activeFilters, handleFiltersChange, filterItems } = useFilters(
  {},
  computed(() => store.filters),
);

const filteredIdeas = filterItems(computed(() => store.ideas));
</script>
