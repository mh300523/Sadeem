<script setup>
import { computed, ref } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import IpSummaryRow from "@/components/tabsBlocks/IpSummaryRow.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const tabData = computed(() => props.data || {});

// Interactive state to check off recommendation steps or view them
const activeRecommendation = ref(1);

function selectRecommendation(stepId) {
  activeRecommendation.value = stepId;
}
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
          <h3 class="text-white text-sm md:text-base font-medium">
            {{ tabData.scoreCard.title }}
          </h3>
          <!-- Glow Score Badge -->
          <span class="badge-percentage">
            {{ tabData.scoreCard.maxScore }} / {{ tabData.scoreCard.score }}
          </span>
        </div>
        <div
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#018AAF] text-white text-xs md:text-sm mt-[14px]"
        >
          <span>{{ tabData.scoreCard.scoreLabel }} ⭐</span>
        </div>
      </BaseBox>

      <!-- 2. IP Analysis Summary Box -->
      <div
        v-if="tabData.summaryCard"
        class="rounded-[20px] border border-[#06B6D4]/42 overflow-hidden bg-[#1E293B]/40 backdrop-blur-xl"
      >
        <!-- Banner Header (Cyan to Purple Gradient) -->
        <div class="gradient-purple py-8 px-7 text-white text-right">
          <h3 class="text-base md:text-xl font-bold leading-normal">
            {{ tabData.summaryCard.title }}
          </h3>
        </div>

        <!-- Summary rows list -->
        <div class="p-6">
          <IpSummaryRow
            v-for="(row, idx) in tabData.summaryCard.rows"
            :key="idx"
            :row="row"
          />
        </div>
      </div>
    </div>

    <!-- Left Sidebar Column (Second in HTML for RTL float-left layout) -->
    <div
      class="lg:col-span-3 bg-[url('@/assets/images/storytab-side-bg.png')] bg-cover bg-center bg-no-repeat rounded-[16px] px-4 py-5"
    >
      <div class="sidebar-container relative flex flex-col gap-6">
        <!-- Sidebar Title with Astronaut background -->
        <h2 class="sidebar-gradient-title text-right leading-snug">
          {{ tabData.sidebar.title }}
        </h2>

        <!-- Recommendation Stepper -->
        <div v-if="tabData.sidebar.recommendations" class="text-right mt-16">
          <div
            class="inline-block py-2 px-5 rounded-full bg-gradient-to-l from-[#FF8E53] to-[#FF6B35] text-white text-xs md:text-sm font-bold shadow-md mb-4 w-full"
          >
            {{ tabData.sidebar.recommendations.label }}
          </div>

          <!-- Stepper timeline layout -->
          <div class="relative flex flex-col gap-3 pr-2.5 mt-2">
            <!-- Dotted connector line -->
            <div
              class="absolute right-[19px] top-4 bottom-4 w-0.5 border-r-2 border-dashed border-white/20"
            ></div>

            <div
              v-for="step in tabData.sidebar.recommendations.steps"
              :key="step.id"
              @click="selectRecommendation(step.id)"
              class="relative flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-300 cursor-pointer"
              :class="
                activeRecommendation === step.id
                  ? 'bg-white/5 border-white/10 text-white shadow-sm'
                  : 'bg-transparent border-transparent text-white/50 hover:text-white/80'
              "
            >
              <!-- Small yellow bullet dot -->
              <span
                class="w-3.5 h-3.5 rounded-full border-2 border-[#FF6B35] shrink-0 z-10"
                :class="
                  activeRecommendation === step.id
                    ? 'bg-[#FF6B35]'
                    : 'bg-transparent'
                "
              ></span>
              <span class="text-xs md:text-sm font-semibold leading-none">{{
                step.title
              }}</span>
            </div>
          </div>
        </div>

        <!-- Legal Disclaimer Block -->
        <div
          v-if="tabData.sidebar.disclaimer"
          class="p-4 rounded-xl bg-gradient-to-r from-[#018AAF]/20 to-[#FF6B35]/25 border border-white/5 text-right flex flex-col gap-2"
        >
          <h4
            class="text-white text-xs md:text-sm font-bold flex items-center justify-end gap-1.5"
          >
            <span>⚠️</span>
            <span>{{ tabData.sidebar.disclaimer.title }}</span>
          </h4>
          <p class="text-white/60 text-[11px] leading-relaxed text-justify">
            {{ tabData.sidebar.disclaimer.description }}
          </p>
        </div>

        <!-- Download & Review Action Buttons -->
        <div v-if="tabData.sidebar.actions" class="flex flex-col gap-3 mt-2">
          <!-- Download PDF -->
          <button
            class="w-full py-2.5 px-4 rounded-full bg-gradient-to-l from-[#FF8E53] to-[#FF6B35] text-white text-xs md:text-sm font-bold shadow-[0_15px_15px_0_rgba(255,107,53,0.15)] hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none text-center"
          >
            {{ tabData.sidebar.actions.downloadReport }}
          </button>
          <!-- Request Review -->
          <button
            class="w-full py-2.5 px-4 rounded-full bg-gradient-to-l from-[#018AAF] to-[#7F4FFF] text-white text-xs md:text-sm font-bold shadow-[0_10px_15px_0_rgba(1,138,175,0.15)] hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-none text-center"
          >
            {{ tabData.sidebar.actions.requestReview }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
