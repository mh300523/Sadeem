<script setup>
import { computed } from "vue";
import TimelineStepper from "@/components/tabsBlocks/TimelineStepper.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({
      sidebar: { title: "", journey: { title: "", steps: [] } },
      interactiveExperience: {
        title: "",
        subtitle: "",
        stats: [],
        buttons: {},
      },
      canvas: { title: "", subtitle: "", sections: [] },
    }),
  },
});

const businessData = computed(() => props.data || {});
const sidebarData = computed(() => businessData.value.sidebar || {});
const interactiveData = computed(
  () => businessData.value.interactiveExperience || {},
);
const canvasData = computed(() => businessData.value.canvas || {});
const items = canvasData.value.sections || [];

function getSectionIconColor(key) {
  const colors = {
    resources: "text-blue-400",
    costs: "text-orange-400",
    revenue: "text-yellow-500",
    value_proposition: "text-red-500",
    activities: "text-yellow-400",
    partners: "text-amber-400",
    segments: "text-cyan-400",
    relationships: "text-yellow-400",
    channels: "text-blue-400",
  };
  return colors[key] || "text-white";
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar Column (will render on the right in RTL, and left in LTR) -->
    <div
      class="lg:col-span-3 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30] border border-white/10 rounded-2xl backdrop-blur-xl"
    >
      <div class="sidebar-container relative px-[14px] py-5">
        <!-- Space Card -->

        <h2
          class="text-transparent bg-clip-text rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#06B6D4] via-[#3B82F6] to-[#FF6B35] uppercase tracking-wider font-bold text-xl mb-4"
        >
          {{ sidebarData.title || "مشروع ابتكاري متقدم..." }}
        </h2>

        <!-- Timeline Stepper -->
        <TimelineStepper
          :title="sidebarData.journey?.title"
          :steps="sidebarData.journey?.steps"
        />
      </div>
    </div>

    <!-- Main Content Column (will render on the left in RTL, and right in LTR) -->
    <div class="lg:col-span-9">
      <!-- Interactive Experience Card -->
      <div
        class="border border-white/10 rounded-2xl p-6 bg-[url('@/assets/images/storytab-side-bg.png')] bg-cover bg-center bg-no-repeat"
      >
        <div class="mb-4">
          <h3
            class="text-white text-base md:text-xl font-bold flex items-center gap-2"
          >
            {{ interactiveData.title }}
            <span class="text-white/50 text-xs font-normal leading-relaxed">
              {{ interactiveData.subtitle }}
            </span>
          </h3>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div
            v-for="(stat, idx) in interactiveData.stats"
            :key="idx"
            class="gradient-border rounded-[14px] p-4 backdrop-blur-xl rtl:bg-gradient-to-bl ltr:bg-gradient-to-br from-[#895AF7]/30 via-[#06B6D4]/10 to-[#503591]/1 rtl:before:bg-gradient-to-bl ltr:before:bg-gradient-to-br before:from-[#895AF7]/50 before:to-[#06B6D4]/0"
          >
            <div
              class="text-transparent bg-clip-text rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#06B6D4] via-[#3B82F6] to-[#7F4FFF] text-3xl font-extrabold mb-1 italic"
            >
              {{ stat.value }}
            </div>
            <h5 class="text-white/76 text-xs md:text-sm leading-normal">
              {{ stat.label }}
            </h5>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-end">
          <BaseButton
            class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#FF6B35] to-[#FF8E53] text-white"
          >
            {{ interactiveData.buttons?.brochure }}
          </BaseButton>

          <BaseButton
            class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#018AAF] to-[#7F4FFF] text-white"
          >
            {{ interactiveData.buttons?.details }}
          </BaseButton>
        </div>
      </div>

      <!-- Business Model Canvas Section -->
      <div
        class="border border-white/10 rounded-2xl backdrop-blur-xl mt-6 overflow-hidden"
      >
        <!-- Banner Header -->
        <div
          class="py-4 px-6 rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#06B6D4] via-[#3B82F6] to-[#7F4FFF] text-white"
        >
          <h3 class="text-base md:text-xl font-bold leading-normal mb-2">
            {{ canvasData.title }}
          </h3>
          <p class="text-white/80 text-xs">
            {{ canvasData.subtitle }}
          </p>
        </div>

        <!-- Canvas Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div
            v-for="item in items"
            :key="item.key"
            class="rounded-[16px] px-4 py-4.5 backdrop-blur-xl flex gap-2 gradient-border rtl:before:bg-gradient-to-tr ltr:before:bg-gradient-to-tl before:from-[#06B6D4]/0 via:from-[#06B6D4]/30 before:to-[#895AF7]/40"
          >
            <div class="flex items-center justify-center w-5 h-5 shrink-0">
              <SvgIcon
                :name="item.icon"
                :classes="`${getSectionIconColor(item.key)}`"
              />
            </div>
            <div class="">
              <h4
                class="text-white text-sm md:text-base font-medium leading-none mb-2"
              >
                {{ item.title }}
              </h4>
              <p
                class="text-white/60 text-xs leading-relaxed text-justify whitespace-pre-line"
              >
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
