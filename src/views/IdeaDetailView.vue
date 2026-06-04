<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import BaseTabs from "@/components/ui/BaseTabs.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

import mockData from "@/mockData.json";
import MainTitle from "@/components/ui/MainTitle.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const activeTab = ref("overview");

const route = useRoute();
const id = route.params.id;

// Load API response (directly matches mockData.details[id] structure)
const ideaDetails = computed(() => {
  return mockData.details[id] || mockData.details.default;
});

// Re-use Badge Styling from Config
const statusConfigs = computed(() => mockData.dashboard.statusConfigs);
function getBadgeConfig(statusId) {
  return statusConfigs.value[statusId] || statusConfigs.value.new;
}

// Dynamic Tabs Definition from API response payload
const tabsList = computed(() => {
  return ideaDetails.value?.tabs || [];
});
</script>

<template>
  <div>
    <!-- Top Details Header Card (Wrapped in Card Container matching the screens) -->
    <div class="border-b border-white/20 pb-4 mb-8">
      <div class="flex flex-col lg:flex-row justify-between items-start gap-6">
        <!-- Right Side (Back button, Title, Meta info) -->
        <div>
          <!-- ID + Status Pill -->
          <div class="flex items-center gap-3">
            <span class="font-bold text-white text-2xl">
              {{ ideaDetails.id }}
            </span>

            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm text-white shadow-[0_2px_10px_rgba(0,0,0,0.25)] backdrop-blur-sm"
              :class="[getBadgeConfig(ideaDetails.status?.id).bgClass]"
            >
              <SvgIcon
                :name="getBadgeConfig(ideaDetails.status?.id).iconName"
              />
              <span>{{ ideaDetails.status?.name }}</span>
            </span>
          </div>

          <!-- Main Title -->
          <MainTitle :name="ideaDetails.title" classes="my-3!">
            {{ ideaDetails.title }}
          </MainTitle>

          <!-- Header Metadata Row matching screen 100% -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- 1. Submitter -->
            <div class="flex items-center gap-1.5">
              <SvgIcon name="solar_user" />
              <span class="text-white/76">{{ ideaDetails.submitter }}</span>
            </div>

            <span
              class="w-1 h-1 rounded-full bg-slate-700 hidden md:block"
            ></span>

            <!-- 2. Department -->
            <div class="flex items-center gap-1.5">
              <SvgIcon name="solar_pie-chart" />
              <span class="text-white/76">{{ ideaDetails.department }}</span>
            </div>

            <span
              class="w-1 h-1 rounded-full bg-slate-700 hidden md:block"
            ></span>

            <!-- 3. Evaluators Count -->
            <div class="flex items-center gap-1.5">
              <SvgIcon name="solar_users-group" />
              <span class="text-white/76">{{
                ideaDetails.evaluatorsCount
              }}</span>
            </div>

            <span
              class="w-1 h-1 rounded-full bg-slate-700 hidden md:block"
            ></span>

            <!-- 4. Average Rating -->
            <div class="flex items-center gap-1.5">
              <SvgIcon name="solar_star" />
              <span class="text-white/76"
                >{{ ideaDetails.averageRating }} / 100</span
              >
            </div>

            <span
              class="w-1 h-1 rounded-full bg-slate-700 hidden md:block"
            ></span>

            <!-- 5. AI score badge (Cyan border, sparkle icon, text exactly matches screenshot) -->
            <div
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm bg-[#018AAF] text-white backdrop-blur-2xl"
            >
              <SvgIcon name="ai_icon" />
              <span
                >{{ $t("details.average_rating") }}:
                {{ ideaDetails?.aiScore }} / 100</span
              >
            </div>
          </div>
        </div>

        <!-- Left Side (Action Buttons) -->
        <div
          class="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 self-stretch lg:self-center lg:justify-end"
        >
          <!-- Invite Evaluator Button -->
          <BaseButton
            class="gradient-orange text-white shadow-[0_30px_30px_0_rgba(255,107,53,0.3)]"
          >
            {{ $t("details.invite_evaluator") }}
          </BaseButton>
          <!-- Start Evaluation Button -->
          <BaseButton class="gradient-purple text-white shadow-lg">
            {{ $t("details.start_evaluation") }}
          </BaseButton>

          <!-- Save Draft Button -->
          <BaseButton
            class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[rgba(1,138,175,0.2)] to-[rgba(127,79,255,0.2)] text-[#7F4FFF] backdrop-blur-2xl"
          >
            {{ $t("details.save_draft") }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Tabs Navigation & Content using unified BaseTabs -->
    <BaseTabs v-model:activeTab="activeTab" :tabs="tabsList" />
  </div>
</template>

<style scoped></style>
