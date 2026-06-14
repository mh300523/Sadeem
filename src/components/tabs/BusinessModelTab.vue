<script setup>
import { computed } from "vue";
import TimelineStepper from "@/components/tabsBlocks/TimelineStepper.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const businessData = computed(() => props.data || {});
const sidebarData = computed(() => businessData.value.sidebar || {});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Sidebar Column (will render on the right in RTL, and left in LTR) -->
    <div class="lg:col-span-3">
      <BaseBox
        class="sidebar-container relative px-[14px] py-5 white-border rounded-2xl"
      >
        <!-- Space Card -->

        <h2 class="sidebar-gradient-title secondery-text-gradient">
          {{ sidebarData.title || "مشروع ابتكاري متقدم..." }}
        </h2>

        <!-- Timeline Stepper -->
        <TimelineStepper
          :title="sidebarData.journey?.title"
          :steps="sidebarData.journey?.steps"
        />
      </BaseBox>
    </div>

    <!-- Main Content Column (will render on the left in RTL, and right in LTR) -->
    <div class="lg:col-span-9">
      <!-- Interactive Experience Card -->
      <div
        class="white-border rounded-2xl p-6 bg-[url('@/assets/images/storytab-side-bg.png')] bg-cover bg-center bg-no-repeat"
      >
        <div class="mb-4">
          <h3
            class="text-white text-base md:text-xl font-bold flex items-center gap-2"
          >
            {{ businessData.interactiveExperience.title }}
            <span class="text-white/50 text-xs font-normal leading-relaxed">
              {{ businessData.interactiveExperience.subtitle }}
            </span>
          </h3>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div
            v-for="(stat, idx) in businessData.interactiveExperience.stats"
            :key="idx"
            class="gradient-border p-4 gradient-sky-blue backdrop-blur-xl"
          >
            <div
              class="text-transparent bg-clip-text gradient-purple text-3xl font-extrabold mb-1 italic"
            >
              {{ stat.value }}
            </div>
            <h4 class="text-white/76 text-xs md:text-sm leading-normal">
              {{ stat.label }}
            </h4>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 justify-end">
          <BaseButton
            class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#FF6B35] to-[#FF8E53] text-white"
          >
            {{ businessData.interactiveExperience.buttons?.brochure }}
          </BaseButton>

          <BaseButton
            class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#018AAF] to-[#7F4FFF] text-white"
          >
            {{ businessData.interactiveExperience.buttons?.details }}
          </BaseButton>
        </div>
      </div>

      <!-- Business Model Canvas Section -->
      <div
        class="white-border rounded-2xl backdrop-blur-xl mt-6 overflow-hidden"
      >
        <!-- Banner Header -->
        <div class="py-4 px-6 gradient-purple text-white">
          <h3 class="text-base md:text-xl font-bold leading-normal mb-2">
            {{ businessData.canvas.title }}
          </h3>
          <p class="text-white/80 text-xs">
            {{ businessData.canvas.subtitle }}
          </p>
        </div>

        <!-- Canvas Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div
            v-for="item in businessData.canvas.sections"
            :key="item.key"
            class="rounded-[16px]! px-4 py-4.5 flex gap-2 gradient-border"
          >
            <div class="flex items-center justify-center w-5 h-5 shrink-0">
              <SvgIcon :name="item.icon" />
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
