<script setup>
import { computed, ref, watch } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import PathSelect from "@/components/tabsBlocks/PathSelect.vue";
import SimilarityCard from "@/components/tabsBlocks/SimilarityCard.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const tabData = computed(() => props.data || {});

// Interactive state management for the pathways (initialized from props.data)
const selectedPathway = ref("");

watch(
  () => tabData.value.innovationPath?.items,
  (items) => {
    const selected = items?.find((item) => item.selected)?.key;
    if (selected) {
      selectedPathway.value = selected;
    }
  },
  { immediate: true },
);

// Interactive state management for classification selections in the sidebar
const activeOptions = ref({});

watch(
  () => tabData.value.sidebar?.sections,
  (sections = []) => {
    const options = {};

    sections.forEach((section) => {
      const selectedOption = section.options?.find((option) => option.selected);

      if (selectedOption) {
        options[section.key] = selectedOption.value;
      }
    });

    activeOptions.value = options;
  },
  { immediate: true },
);

const selectSidebarOption = (sectionKey, optionValue) => {
  activeOptions.value = {
    ...activeOptions.value,
    [sectionKey]: optionValue,
  };
};
</script>

<template>
  <div v-if="tabData.sidebar" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Sidebar Column (First in HTML for RTL float-right layout) -->
    <div class="lg:col-span-3 white-border rounded-2xl">
      <div class="sidebar-container px-[14px] py-5">
        <!-- Sidebar Title with Astronaut background -->
        <h2 class="sidebar-gradient-title text-right leading-snug">
          {{ tabData.sidebar.title }}
        </h2>

        <!-- Sections List -->
        <div class="flex flex-col gap-6">
          <div
            v-for="section in tabData.sidebar.sections"
            :key="section.key"
            class=""
          >
            <!-- Orange header capsule matching screenshots -->
            <h4
              class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
            >
              {{ section.label }}
            </h4>

            <!-- Options Pills -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="option in section.options"
                :key="option.value"
                @click="selectSidebarOption(section.key, option.value)"
                class="px-4.5 py-1.5 rounded-full text-xs md:text-sm font-medium cursor-pointer"
                :class="
                  activeOptions[section.key] === option.value
                    ? 'bg-[#018AAF] text-white '
                    : 'bg-[#018AAF]/16 text-[#33BCE1]'
                "
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Left Main Content Column -->
    <div class="lg:col-span-9">
      <!-- 1. Custom Dropdown Select using Headless UI (Wrapped in relative z-30 to prevent overlay overlap) -->
      <div class="relative z-30">
        <PathSelect
          v-model="selectedPathway"
          :label="tabData.innovationPath?.label"
          :items="tabData.innovationPath?.items"
        />
      </div>

      <!-- 2. Repeated Idea Duplicate Check (Image 3 layout) -->
      <BaseBox
        v-if="tabData.duplicateCheck"
        class="rounded-[20px] p-6 gradient-border flex flex-col gap-4 my-[14px]"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right"
        >
          <!-- Title & Badges -->
          <div class="">
            <h3 class="text-white text-sm md:text-base font-medium mb-3">
              {{ tabData.duplicateCheck.label }}
            </h3>
            <div class="flex items-center gap-2 flex-wrap">
              <span
                v-if="tabData.duplicateCheck.isDuplicate"
                class="px-3 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF8E53] font-medium"
              >
                نعم
              </span>
              <span
                class="px-3 py-1.5 rounded-md bg-[#FFCF08]/10 border border-[#FFCF08]/30 border-dashed text-[#FFCF08]/80 text-xs font-semibold"
              >
                ⚠️ {{ tabData.duplicateCheck.warningText }}
              </span>
            </div>
          </div>
        </div>

        <!-- Similarity rows list -->

        <SimilarityCard
          v-for="(item, idx) in tabData.duplicateCheck.items"
          :key="idx"
          mode="row"
          :idea="item"
        />
      </BaseBox>

      <!-- 3. Implementation Plan Status Check -->
      <BaseBox
        v-if="tabData.executionPlan"
        class="rounded-[20px] p-6 border border-white/10 text-right"
      >
        <h3 class="text-white text-base md:text-lg font-bold mb-4">
          {{ tabData.executionPlan.label }}
        </h3>
        <div
          class="p-4 rounded-xl border border-dashed border-[#FF6B35]/40 bg-[#FF6B35]/5 text-[#FF6B35] text-xs md:text-sm font-semibold inline-block"
        >
          {{ tabData.executionPlan.statusText }}
        </div>
      </BaseBox>

      <!-- 4. Merge Suggestions Row -->
      <BaseBox
        v-if="tabData.mergeSuggestion"
        class="rounded-[20px] p-6 border border-white/10 text-right flex flex-col gap-4"
      >
        <div class="flex items-center gap-3">
          <h3 class="text-white text-base md:text-lg font-bold">
            {{ tabData.mergeSuggestion.label }}
          </h3>
          <span
            v-if="tabData.mergeSuggestion.canMerge"
            class="px-3 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold"
          >
            نعم
          </span>
        </div>
        <p class="text-white/50 text-xs font-medium -mt-1">
          الأفكار المقترحة للدمج:
        </p>

        <!-- Horizontal scrollable/wrapped grid list of cards -->
        <div class="flex flex-wrap md:flex-row gap-4 mt-2">
          <SimilarityCard
            v-for="(item, idx) in tabData.mergeSuggestion.items"
            :key="idx"
            mode="card"
            :idea="item"
          />
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<style scoped></style>
