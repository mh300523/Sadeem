<script setup>
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";
import BaseTable from "@/components/ui/BaseTable.vue";

defineProps({
  screenData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <!-- Expected Impact Table -->
    <BaseAnalyticBox :title="$t('analytics.impact_tab.expected_title')">
      <BaseTable
        :headers="screenData?.expected?.headers"
        :items="screenData?.expected?.items"
      >
        <!-- Custom indicator key cell -->
        <template #cell(indicatorKey)="{ value }">
          <span class="text-xs text-theme-text/70">
            {{ $t(value) }}
          </span>
        </template>

        <!-- Custom value cell -->
        <template #cell(value)="{ value }">
          <span class="text-theme-text font-medium md:text-base">
            {{ value }}
          </span>
        </template>

        <!-- Custom status cell -->
        <template #cell(statusKey)="{ item, value }">
          <span
            class="flex items-center justify-center w-fit min-w-13 h-7 px-3 py-1 rounded-full text-xs"
            :style="{
              backgroundColor: `${item.statusColor}1A`,
              color: item.statusColor,
            }"
          >
            {{ $t(value) }}
          </span>
        </template>
      </BaseTable>
    </BaseAnalyticBox>

    <!-- Measured Impact Table -->
    <BaseAnalyticBox :title="$t('analytics.impact_tab.measured_title')">
      <BaseTable
        :headers="screenData?.measured?.headers"
        :items="screenData?.measured?.items"
      >
        <!-- Custom indicator key cell -->
        <template #cell(indicatorKey)="{ value }">
          <span class="text-xs text-theme-text/70">
            {{ $t(value) }}
          </span>
        </template>

        <!-- Custom value cell -->
        <template #cell(value)="{ value }">
          <span class="text-theme-text font-medium md:text-base">
            {{ value }}
          </span>
        </template>

        <!-- Custom status cell -->
        <template #cell(statusKey)="{ item, value }">
          <span
            class="flex items-center justify-center w-fit min-w-13 h-7 px-3 py-1 rounded-full text-xs"
            :style="{
              backgroundColor: `${item.statusColor}1A`,
              color: item.statusColor,
            }"
          >
            {{ $t(value) }}
          </span>
        </template>
      </BaseTable>
    </BaseAnalyticBox>
  </div>

  <!-- Impact Bands & Themes row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <BaseAnalyticBox :title="$t('analytics.impact_tab.bands_title')">
      <ProgressBar
        v-for="(band, idx) in screenData.bands"
        :key="idx"
        :value="band.percentage"
        :max="100"
        :label="band.label"
        :valueText="`${band.percentage}%`"
        customFillClass="bg-gradient-to-r from-theme-accent-primary to-[#8b5cf6]"
      />
    </BaseAnalyticBox>

    <BaseAnalyticBox :title="$t('analytics.impact_tab.themes_title')">
      <BaseTable
        :headers="screenData?.themes?.headers"
        :items="screenData?.themes?.items"
      >
        <!-- Custom theme cell -->
        <template #cell(theme)="{ value }">
          <span class="text-xs text-theme-text/70">
            {{ value }}
          </span>
        </template>

        <!-- Custom ideas cell -->
        <template #cell(ideas)="{ value }">
          <span class="text-theme-text font-bold text-lg md:text-xl">
            {{ value }}
          </span>
        </template>

        <!-- Custom score cell -->
        <template #cell(score)="{ value }">
          <span class="text-theme-text font-bold text-lg md:text-xl">
            {{ value }}
          </span>
        </template>
      </BaseTable>
    </BaseAnalyticBox>
  </div>
</template>
