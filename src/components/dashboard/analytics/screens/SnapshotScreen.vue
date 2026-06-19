<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
import KpiCard from "@/components/dashboard/analytics/KpiCard.vue";
import GaugeChart from "@/components/charts/GaugeChart.vue";
import RadarChart from "@/components/charts/RadarChart.vue";
import BaseAnalyticBox from "@/components/ui/BaseAnalyticBox.vue";

defineProps({
  screenData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["select-kpi"]);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <KpiCard
      v-for="kpi in screenData.kpis"
      :key="kpi.id"
      v-bind="kpi"
      @select="emit('select-kpi', $event)"
    />
  </div>

  <!-- Gauge and Radar visual row -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <BaseAnalyticBox
      :title="$t('analytics.snapshot.radar_title')"
      :subtitle="$t('analytics.snapshot.radar_subtitle')"
    >
      <RadarChart
        :series="screenData.radar.series"
        :categories="screenData.radar.categories"
      />
    </BaseAnalyticBox>
    <BaseAnalyticBox
      :title="$t('analytics.snapshot.gauge_title')"
      :subtitle="$t('analytics.snapshot.gauge_subtitle')"
    >
      <GaugeChart
        :value="screenData.gaugeValue"
        :label="$t('analytics.snapshot.gauge_label')"
      />
    </BaseAnalyticBox>
  </div>

  <!-- Timeline and Outcome Row -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
    <!-- Timeline panel -->
    <BaseAnalyticBox
      :title="$t('analytics.timeline.title')"
      class="lg:col-span-8"
    >
      <div
        class="relative flex items-center justify-between my-6 min-h-[160px]"
      >
        <!-- The horizontal connector line -->
        <span
          class="absolute left-6 right-6 h-1.5 ltr:bg-[linear-gradient(to_left,#00000000_0%,#44CCFF_50%,#7F4FFF_85%,#00000000_100%)] rtl:bg-[linear-gradient(to_right,#00000000_0%,#44CCFF_50%,#7F4FFF_85%,#00000000_100%)] top-1/2 -translate-y-1/2 rounded"
        ></span>

        <!-- Step items -->
        <div
          v-for="(step, idx) in screenData.timeline"
          :key="idx"
          class="flex flex-col items-center relative z-10 w-1/4"
        >
          <!-- Top element -->
          <div
            class="h-10 flex items-end justify-center pb-2 text-center absolute -top-10 left-1/2 -translate-x-1/2 w-full"
          >
            <span
              v-if="idx % 2 === 0"
              class="text-base md:text-lg font-bold text-theme-text"
            >
              {{ step.value }}
            </span>
            <h4
              v-else
              class="text-xs text-theme-text/70 truncate max-w-[80px] md:max-w-none"
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
              class="text-base md:text-lg font-bold text-theme-text"
            >
              {{ step.value }}
            </span>
            <h4
              v-else
              class="text-xs text-theme-text/70 truncate max-w-[80px] md:max-w-none"
            >
              {{ $t(step.labelKey) }}
            </h4>
          </div>
        </div>
      </div>
    </BaseAnalyticBox>

    <!-- Outcome Summary panel -->
    <BaseAnalyticBox
      :title="$t('analytics.snapshot.outcome_title')"
      class="lg:col-span-4"
    >
      <div class="grid grid-cols-2 gap-3.5">
        <BaseBox
          v-for="(out, idx) in screenData.outcomeSummary"
          :key="idx"
          class="p-4 rounded-xl border border-white/5 bg-white/3 text-right ltr:text-left animate-pulse-subtle"
        >
          <h3 class="text-xs text-theme-text/70 block mb-3">
            {{ out.label }}
          </h3>
          <span class="text-lg font-bold text-theme-text italic">{{
            out.value
          }}</span>
        </BaseBox>
      </div>
    </BaseAnalyticBox>
  </div>
</template>
