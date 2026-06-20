<script setup>
import { computed, ref } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import IpSummaryRow from "./IpSummaryRow.vue";
import TimelineStepper from "@/components/tabs/_shared/TimelineStepper.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const tabData = computed(() => props.data || {});
</script>

<template>
  <div v-if="tabData.sidebar" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Main Column (First in HTML so it floats right on RTL) -->
    <div class="lg:col-span-9">
      <!-- 1. Degree of IP Card -->
      <BaseBox
        v-if="tabData.scoreCard"
        class="gradient-border mb-[14px] py-6 px-10"
      >
        <!-- Title and Icon Badge -->
        <div class="flex items-center gap-3">
          <h3 class="text-theme-text md:text-base font-medium">
            {{ tabData.scoreCard.title }}
          </h3>
          <!-- Glow Score Badge -->
          <span class="badge-gradient">
            {{ tabData.scoreCard.maxScore }} / {{ tabData.scoreCard.score }}
          </span>
        </div>
        <div
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#018AAF] text-theme-text text-xs md:text-sm mt-[14px]"
        >
          <span>{{ tabData.scoreCard.scoreLabel }} ⭐</span>
        </div>
      </BaseBox>

      <!-- 2. IP Analysis Summary Box -->
      <div
        v-if="tabData.summaryCard"
        class="rounded-[20px] border border-theme-accent-primary/42 overflow-hidden rtl:bg-linear-to-l ltr:bg-linear-to-r from-theme-row-start to-theme-row-end backdrop-blur-xl"
      >
        <!-- Banner Header (Cyan to Purple Gradient) -->
        <div class="bg-gradient-primary py-8 px-7 text-theme-text text-right">
          <h3 class="text-base md:text-xl font-bold leading-normal">
            {{ tabData.summaryCard.title }}
          </h3>
        </div>

        <!-- Summary rows list -->
        <div class="p-4 sm:p-6">
          <IpSummaryRow
            v-for="(row, idx) in tabData.summaryCard.rows"
            :key="idx"
            :row="row"
          />
        </div>
      </div>
    </div>

    <!-- Left Sidebar Column (Second in HTML for RTL float-left layout) -->
    <div class="lg:col-span-3">
      <BaseBox
        class="sidebar-robot-panel px-[14px] py-5 border-subtle rounded-2xl"
      >
        <!-- Sidebar Title with Astronaut background -->
        <h4 class="panel-title text-gradient-secondary">
          {{ tabData.sidebar.title }}
        </h4>

        <!-- Recommendation Stepper -->
        <TimelineStepper
          v-if="tabData.sidebar.recommendations"
          :title="tabData.sidebar.recommendations.label"
          :steps="tabData.sidebar.recommendations.steps || []"
          variant="dot"
        >
          <template #card="{ step }">
            <div
              class="gradient-border p-4.5 flex-1 bg-gradient-surface backdrop-blur-xl rounded-xl"
            >
              <span
                class="text-xs md:text-sm font-semibold leading-none text-theme-text"
                >{{ step.title }}</span
              >
            </div>
          </template>
        </TimelineStepper>

        <!-- Legal Disclaimer Block -->
        <div class="">
          <h2
            class="bg-gradient-accent py-4 px-5 rounded-2xl text-theme-text font-medium mb-4"
          >
            <span>{{ tabData.sidebar.disclaimer.title }}</span>
          </h2>

          <BaseBox class="gradient-border p-4">
            <p
              class="text-theme-text md:text-base font-medium leading-relaxed text-justify"
            >
              {{ tabData.sidebar.disclaimer.description }}
            </p>

            <!-- Download & Review Action Buttons -->
            <div
              v-if="tabData.sidebar.actions"
              class="flex flex-col gap-3 mt-2"
            >
              <!-- Download PDF -->
              <BaseButton class="bg-gradient-accent text-theme-text">
                {{ tabData.sidebar.actions.downloadReport }}
              </BaseButton>
              <!-- Request Review -->
              <BaseButton class="bg-gradient-primary text-theme-text">
                {{ tabData.sidebar.actions.requestReview }}
              </BaseButton>
            </div>
          </BaseBox>
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<style scoped></style>
