<script setup>
import SvgIcon from "@/components/ui/SvgIcon.vue";

defineProps({
  stats: {
    type: Array,
    required: true,
  },
});

const statStyles = {
  new: {
    color: "text-[#FF6B35]",
    angle: "135deg",
    borderStops: "#FF6B35 0%, rgba(255,107,53,0) 100%",
    bgStops: "rgba(255,107,53,0.2) 0%, rgba(255,107,53,0) 100%",
  },

  waiting: {
    color: "text-[#895AF7]",
    angle: "135deg",
    borderStops: "#895AF7 0%, rgba(137,90,247,0) 100%",
    bgStops: "rgba(137,90,247,0.2) 0%, rgba(137,90,247,0) 100%",
  },

  evaluated: {
    color: "text-[#32BEA6]",
    angle: "135deg",
    borderStops: "#32BEA6 0%, rgba(50,190,166,0) 100%",
    bgStops: "rgba(50,190,166,0.2) 0%, rgba(50,190,166,0) 100%",
  },

  team_review: {
    color: "text-[#009DFE]",
    angle: "135deg",
    borderStops: "#009DFE 0%, rgba(0,157,254,0) 100%",
    bgStops: "rgba(0,157,254,0.2) 0%, rgba(0,157,254,0) 100%",
  },

  feasible: {
    color: "text-[#EEB252]",
    angle: "135deg",
    borderStops: "#EEB252 0%, rgba(238,178,82,0) 100%",
    bgStops: "rgba(238,178,82,0.2) 0%, rgba(238,178,82,0) 100%",
  },

  infeasible: {
    color: "text-[#EA0000]",
    angle: "135deg",
    borderStops: "#EA0000 0%, rgba(234,0,0,0) 100%",
    bgStops: "rgba(234,0,0,0.2) 0%, rgba(234,0,0,0) 100%",
  },

  converted: {
    color: "text-[#00E2FF]",
    angle: "135deg",
    borderStops: "#00E2FF 0%, rgba(0,226,255,0) 100%",
    bgStops: "rgba(0,226,255,0.2) 0%, rgba(0,226,255,0) 100%",
  },

  late: {
    color: "text-[#FFD215]",
    angle: "135deg",
    borderStops: "#FFD215 0%, rgba(255,210,21,0) 100%",
    bgStops: "rgba(255,210,21,0.2) 0%, rgba(255,210,21,0) 100%",
  },
};
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.id"
      class="dynamic-gradient-angle stat-item flex flex-col gap-2 py-[18px] px-3 rounded-2xl backdrop-blur-2xl border border-transparent"
      :style="{
        '--gradient-angle': statStyles[stat.status].angle,

        background: `
          linear-gradient(
            var(--resolved-angle),
            ${statStyles[stat.status].bgStops}
          ) padding-box,

          linear-gradient(
            rgba(17,24,39,0.9),
            rgba(17,24,39,0.9)
          ) padding-box,

          linear-gradient(
            var(--resolved-angle),
            ${statStyles[stat.status].borderStops}
          ) border-box
        `,
      }"
    >
      <div class="flex items-center gap-2">
        <div class="stat-icon">
          <SvgIcon :name="stat.icon" />
        </div>

        <h3 class="font-bold text-2xl" :class="statStyles[stat.status].color">
          {{ stat.value }}
        </h3>
      </div>

      <h4 class="font-medium text-sm text-gray-400">
        {{ stat.title }}
      </h4>
    </div>
  </div>
</template>
