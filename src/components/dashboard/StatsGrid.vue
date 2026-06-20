<script setup>
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

defineProps({
  stats: {
    type: Array,
    required: true,
  },
});

const statColors = {
  new: "#FF6B35",
  waiting: "#895AF7",
  evaluated: "#32BEA6",
  team_review: "#009DFE",
  feasible: "#EEB252",
  infeasible: "#EA0000",
  converted: "#00E2FF",
  late: "#FFD215",
};
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
    <BaseBox
      v-for="stat in stats"
      :key="stat.id"
      :style="{
        '--stat-color': statColors[stat.status],
        '--gradient-border-from': statColors[stat.status] + '80',
        '--gradient-border-to': 'transparent',
      }"
      class="stat-item flex flex-col gap-2 py-[18px] px-3 gradient-border"
      gradientbg="rtl:bg-linear-to-bl ltr:bg-linear-to-br from-(--stat-color)/20 to-[#999999]/0"
    >
      <div class="flex items-center gap-2">
        <div class="stat-icon">
          <SvgIcon :name="stat.icon" />
        </div>

        <h3
          class="font-bold text-2xl"
          :style="{ color: statColors[stat.status] }"
        >
          {{ stat.value }}
        </h3>
      </div>

      <h4 class="font-medium text-theme-text/50">
        {{ stat.title }}
      </h4>
    </BaseBox>
  </div>
</template>
