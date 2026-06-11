<script setup>
import ProgressBar from "@/components/dashboard/analytics/ProgressBar.vue";

defineProps({
  screenData: {
    type: Object,
    required: true,
  },
});

function getStatusBadgeClass(type) {
  if (type === "green")
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  if (type === "cyan") return "border-cyan-500/20 bg-cyan-500/10 text-cyan-400";
  return "border-amber-500/20 bg-amber-500/10 text-amber-400";
}
</script>

<template>
  <div class="flex flex-col gap-6">
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
                v-for="(exp, idx) in screenData.expected"
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
                v-for="(meas, idx) in screenData.measured"
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
            v-for="(band, idx) in screenData.bands"
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
                v-for="(theme, idx) in screenData.themes"
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
</template>
