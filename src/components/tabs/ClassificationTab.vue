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
  (sections) => {
    if (!sections) return;
    sections.forEach((section) => {
      const selectedOpt = section.options?.find((opt) => opt.selected);
      if (selectedOpt) {
        activeOptions.value[section.key] = selectedOpt.value;
      }
    });
  },
  { immediate: true, deep: true },
);

function selectSidebarOption(sectionKey, optionVal) {
  activeOptions.value[sectionKey] = optionVal;
}
</script>

<template>
  <div v-if="tabData.sidebar" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Sidebar Column (First in HTML for RTL float-right layout) -->
    <div
      class="lg:col-span-3 bg-[url('@/assets/images/storytab-side-bg.png')] bg-cover bg-center bg-no-repeat rounded-[16px] px-4 py-5"
    >
      <div class="sidebar-container relative">
        <!-- Sidebar Title with Astronaut background -->
        <h2 class="sidebar-gradient-title text-right leading-snug">
          {{ tabData.sidebar.title }}
        </h2>

        <!-- Sections List -->
        <div class="flex flex-col gap-6 mt-20">
          <div
            v-for="section in tabData.sidebar.sections"
            :key="section.key"
            class="text-right"
          >
            <!-- Orange header capsule matching screenshots -->
            <div
              class="inline-block py-2 px-5 rounded-full bg-gradient-to-l from-[#FF8E53] to-[#FF6B35] text-white text-xs md:text-sm font-bold shadow-md mb-3"
            >
              {{ section.label }}
            </div>

            <!-- Options Pills -->
            <div class="flex flex-wrap gap-2 justify-start rtl:justify-end">
              <button
                v-for="opt in section.options"
                :key="opt.value"
                @click="selectSidebarOption(section.key, opt.value)"
                class="px-4.5 py-2 rounded-full text-xs font-semibold border transition-all duration-300 cursor-pointer focus:outline-none"
                :class="
                  activeOptions[section.key] === opt.value
                    ? 'bg-[#009DFE] border-[#009DFE] text-white shadow-[0_0_12px_rgba(0,157,254,0.4)]'
                    : opt.value === 'improvement' &&
                        section.key === 'basic_classification'
                      ? 'border-[#009DFE]/40 text-[#009DFE] bg-[#009DFE]/5 hover:bg-[#009DFE]/15'
                      : 'border-white/5 bg-white/2 text-white/50 hover:border-white/20 hover:text-white/80'
                "
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Left Main Content Column -->
    <div class="lg:col-span-9 flex flex-col gap-6">
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
        class="rounded-[20px] p-6 border border-white/10 flex flex-col gap-4"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right"
        >
          <!-- Title & Badges -->
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-white text-base md:text-lg font-bold">
              {{ tabData.duplicateCheck.label }}
            </h3>
            <span
              v-if="tabData.duplicateCheck.isDuplicate"
              class="px-3 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold"
            >
              نعم
            </span>
            <span
              class="px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-semibold"
            >
              ⚠️ {{ tabData.duplicateCheck.warningText }}
            </span>
          </div>
        </div>

        <!-- Similarity rows list -->
        <div class="flex flex-col gap-3.5 mt-2">
          <SimilarityCard
            v-for="(item, idx) in tabData.duplicateCheck.items"
            :key="idx"
            mode="row"
            :idea="item"
          />
        </div>
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
