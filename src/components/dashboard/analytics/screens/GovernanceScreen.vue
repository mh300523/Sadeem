<script setup>
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

function getGovernanceHeatClass(level) {
  if (level === "h1")
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10";
  if (level === "h2")
    return "bg-[#22d3ee]/20 text-[#22d3ee] border border-[#22d3ee]/10";
  return "bg-violet-500/20 text-violet-400 border border-violet-500/10";
}
</script>

<template>
  <div class="flex flex-col gap-6">
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
                v-for="(gov, idx) in screenData.indicators"
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
                  v-for="xCat in screenData.heatmap.xCategories"
                  :key="xCat"
                  class="pb-3 text-xs font-bold text-white/70 text-center"
                >
                  {{ xCat }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in screenData.heatmap.data"
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
</template>
