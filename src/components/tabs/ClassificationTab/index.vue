<script setup>
import { computed, ref, watch } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseRadioGroup from "@/components/ui/BaseRadioGroup.vue";
import PathSelect from "./PathSelect.vue";
import DuplicateIdeaCard from "./DuplicateIdeaCard.vue";
import MergeSuggestionCard from "./MergeSuggestionCard.vue";
import ExecutionPlanCard from "./ExecutionPlanCard.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  "merge-request",
  "duplicate-status-change",
  "link-project",
  "execution-plan-change",
  "view-idea",
]);

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
      // Single selection per section
      const selectedOption =
        section.options?.find((option) => option.selected)?.value || "";
      options[section.key] = selectedOption;
    });

    activeOptions.value = options;
  },
  { immediate: true },
);

// Interactive state for duplicate checks
const duplicateStatuses = ref({});

const getDuplicateStatusKey = (idea) => {
  if (idea?.isDuplicate) return "duplicate";
  if (idea?.isNotDuplicate) return "not_duplicate";
  return null;
};

watch(
  () => tabData.value.duplicateCheck?.items,
  (items = []) => {
    const statuses = {};
    items.forEach((item) => {
      statuses[item.id] = getDuplicateStatusKey(item);
    });
    duplicateStatuses.value = statuses;
  },
  { immediate: true },
);

const handleDuplicateStatusChange = ({ idea, status }) => {
  duplicateStatuses.value[idea.id] = status;
  emit("duplicate-status-change", { idea, status });
};

// Interactive state for execution plan status
const executionPlanStatus = ref(null);

const getExecutionPlanStatusKey = (project) => {
  if (project?.confirmed) return "confirmed";
  if (project?.not_confirmed) return "not_confirmed";
  return null;
};

watch(
  () => tabData.value.executionPlan?.project,
  (project) => {
    if (project) {
      executionPlanStatus.value = getExecutionPlanStatusKey(project);
    } else {
      executionPlanStatus.value = null;
    }
  },
  { immediate: true },
);

const handleExecutionPlanChange = (status) => {
  executionPlanStatus.value = status;
  emit("execution-plan-change", status);
};
</script>

<template>
  <div v-if="tabData.sidebar" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Sidebar Column (First in HTML for RTL float-right layout) -->
    <div class="lg:col-span-3">
      <BaseBox
        class="sidebar-container relative px-[14px] py-5 white-border rounded-2xl"
      >
        <!-- Sidebar Title with Astronaut background -->
        <h2 class="sidebar-gradient-title secondery-text-gradient">
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
            <h2
              class="gradient-orange py-4 px-5 rounded-2xl text-white font-medium mb-4"
            >
              {{ section.label }}
            </h2>

            <BaseRadioGroup
              v-model="activeOptions[section.key]"
              :options="section.options"
              variant="pills"
            />
          </div>
        </div>
      </BaseBox>
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
        class="rounded-[20px] p-6 gradient-border my-[14px]"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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

        <DuplicateIdeaCard
          v-for="(item, idx) in tabData.duplicateCheck.items"
          :key="idx"
          :idea="item"
          :status="duplicateStatuses[item.id]"
          @duplicate-status-change="handleDuplicateStatusChange"
          @view-idea="emit('view-idea', $event)"
        />
      </BaseBox>

      <!-- 3. Implementation Plan Status Check (Screen 1 Layout) -->
      <BaseBox
        v-if="tabData.executionPlan"
        class="rounded-[20px] p-6 gradient-border mb-[14px]"
      >
        <!-- Card Header -->
        <div class="">
          <h3 class="text-white text-sm md:text-base font-medium mb-3">
            {{ tabData.executionPlan.label }}
          </h3>
          <span
            class="px-4 py-1.5 rounded-full bg-[#FF6B35]/10 text-[#FF8E53] text-xs font-semibold"
          >
            {{ $t("details.yes_this_idea_is_included_in_the_project_plan") }}
          </span>
        </div>

        <!-- Card Body -->
        <ExecutionPlanCard
          v-if="tabData.executionPlan.project"
          :project="tabData.executionPlan.project"
          :status="executionPlanStatus"
          @link-project="emit('link-project', $event)"
          @execution-plan-change="handleExecutionPlanChange"
        />
      </BaseBox>

      <!-- 4. Merge Suggestions Row -->
      <BaseBox
        v-if="tabData.mergeSuggestion"
        class="rounded-[20px] p-6 gradient-border"
      >
        <div class="border-b border-[#A9A9A9]/30 pb-4 mb-4">
          <h3 class="text-white text-sm md:text-base font-medium mb-3">
            {{ tabData.mergeSuggestion.label }}
          </h3>
          <span
            v-if="tabData.mergeSuggestion.canMerge"
            class="px-5 py-2 inline-block rounded-full bg-[#FF6B35]/10 text-[#FF6B35] font-medium mb-3"
          >
            نعم
          </span>

          <p class="text-white/50 text-xs">الأفكار المقترحة للدمج:</p>
        </div>
        <!-- Horizontal scrollable/wrapped grid list of cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MergeSuggestionCard
            v-for="(item, idx) in tabData.mergeSuggestion.items"
            :key="idx"
            :idea="item"
            @merge-request="emit('merge-request', $event)"
            @view-idea="emit('view-idea', $event)"
          />
        </div>
      </BaseBox>
    </div>
  </div>
</template>

<style scoped></style>
