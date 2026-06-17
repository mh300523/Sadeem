<script setup>
import { ref, computed } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import BaseTextarea from "@/components/ui/BaseTextarea.vue";

// Import local UI Schema Configuration from global config folder
import { decisionSchema } from "@/config/decisionSchema";

// Import custom sub-components
import RecommendationCards from "./RecommendationCards.vue";
import RejectSummary from "./RejectSummary.vue";
import DropdownGroup from "./DropdownGroup.vue";
import ActionChecklist from "./ActionChecklist.vue";
import RecipientsChecklist from "./RecipientsChecklist.vue";
import NotificationPreview from "./NotificationPreview.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

defineEmits([
  "merge-request",
  "duplicate-status-change",
  "link-project",
  "execution-plan-change",
  "view-idea",
]);

// ─── Data resolution (props.data for labels, dynamic dropdown choices) ───────
const tabData = computed(() => props.data || {});
const dropdownOptions = computed(() => tabData.value.dropdownOptions || {});

// ─── Resolve Options array from local decisionSchema ────────────────────────
const options = computed(() => Object.values(decisionSchema));

// ─── Selected option key (default to first option in schema) ─────────────────
const selectedOptionKey = ref(Object.keys(decisionSchema)[0] || "");

const currentOption = computed(
  () => decisionSchema[selectedOptionKey.value] || null
);

const currentSections = computed(() => currentOption.value?.sections || []);

// Dynamic resolved recipients list for the active path
const currentRecipientsList = computed(() => {
  return currentSections.value.find((s) => s.type === "recipients")?.items || [];
});

// ─── Isolated State Management (Keyed by Recommendation Key) ───────────────
const formStates = ref({
  accept: { fields: {}, checklist: {} },
  revise: { fields: {}, checklist: {} },
  accelerate: { fields: {}, checklist: {} },
  escalate: { fields: {}, checklist: {} },
  reject: { fields: {}, checklist: {} },
});

// Seed isolated states from the static schema configuration directly on initialization
Object.entries(decisionSchema).forEach(([key, option]) => {
  option.sections.forEach((section) => {
    const fieldsList = section.fields || section.groups?.flatMap((g) => g.fields) || [];
    fieldsList.forEach((field) => {
      formStates.value[key].fields[field.id] = field.default ?? "";
    });
    (section.items || []).forEach((item) => {
      formStates.value[key].checklist[item.id] = item.checked ?? false;
    });
  });
});

// ─── Notes & Modal ───────────────────────────────────────────────────────────
const feedbackNotes = ref("");
const successModalOpen = ref(false);

const handleAction = (actionKey) => {
  const activeKey = selectedOptionKey.value;
  const activeState = formStates.value[activeKey];

  if (actionKey === "send") {
    // ─── Simple Local Serializer ───
    // Packages only the relevant inputs, filters and structures them cleanly for the API
    const payload = {
      action: "send_decision",
      recommendationKey: activeKey,
      notes: feedbackNotes.value,
      fields: {},
      checklist: {},
      recipients: {},
    };

    // Filter and collect inputs that belong to the active path only
    for (const section of currentSections.value) {
      if (section.type === "dropdowns" || section.type === "conditional-dropdowns") {
        const fieldsList = section.fields || section.groups?.flatMap((g) => g.fields) || [];
        fieldsList.forEach((field) => {
          payload.fields[field.id] = activeState.fields[field.id] ?? "";
        });
      }
      if (section.type === "checklist") {
        for (const item of section.items) {
          payload.checklist[item.id] = activeState.checklist[item.id] ?? false;
        }
      }
      if (section.type === "recipients") {
        for (const item of section.items) {
          // If the item has a condition, check it dynamically
          if (item.condition) {
            const { targetId, expectedValue } = item.condition;
            if (activeState.checklist[targetId] !== expectedValue) {
              continue; // Skip this recipient if its condition is not met
            }
          }
          payload.recipients[item.id] = activeState.checklist[item.id] ?? false;
        }
      }
    }

    console.log("Submitting Clean Serialized Payload:", JSON.stringify(payload, null, 2));
    successModalOpen.value = true;
  } else if (actionKey === "draft") {
    console.log("Saving draft locally for option:", activeKey, JSON.stringify(activeState, null, 2));
  }
};
</script>

<template>
  <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 1 — Option Selection Cards
     ════════════════════════════════════════════════════════════════════════ -->

  <!-- Section header -->
  <div class="mb-5">
    <h2 class="primary-text-gradient text-lg md:text-xl font-medium mb-2">
      {{ tabData.sectionTitle }}
    </h2>
    <p class="text-white/70 text-xs md:text-sm leading-relaxed">
      {{ tabData.sectionDescription }}
    </p>
  </div>

  <!-- Option cards grid -->
  <RecommendationCards
    v-model="selectedOptionKey"
    :options="options"
  />

  <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 2 — Active Path (configuration-driven section rendering)
     ════════════════════════════════════════════════════════════════════════ -->
  <template v-if="currentOption">
    <!-- Path title + description header -->
    <!-- Main config sections box -->
    <BaseBox type="glass" class="p-6 mb-6">
      <div class="mb-5 border-b border-white/5 pb-4">
        <h3 class="primary-text-gradient text-lg md:text-xl font-medium mb-2">
          {{ currentOption.pathTitle }}
        </h3>
        <h4 v-if="currentOption.pathDescription" class="text-white text-xs md:text-sm font-medium mt-3">
          {{ currentOption.pathDescription }}
        </h4>
      </div>

      <!-- Render each non-notification section in order -->
      <template
        v-for="section in currentSections.filter(s => s.type !== 'notification')"
        :key="section.type + (section.title || '')"
      >
        <!-- ── reject-summary: red warning banner + summary cards ─────────── -->
        <RejectSummary
          v-if="section.type === 'reject-summary'"
          :warning-text="section.warningText"
          :summary-items="section.summaryItems"
        />

        <!-- ── dropdowns: labeled groups of fields ────────────────────────── -->
        <template v-else-if="section.type === 'dropdowns'">
          <!-- Handle nested dropdown groups -->
          <template v-if="section.groups">
            <DropdownGroup
              v-for="group in section.groups"
              :key="group.label"
              v-model="formStates[selectedOptionKey].fields"
              :label="group.label"
              :fields="group.fields"
              :dropdown-options="dropdownOptions"
              :cols="group.cols || 2"
            />
          </template>
          <!-- Handle flat fields lists -->
          <template v-else>
            <DropdownGroup
              v-model="formStates[selectedOptionKey].fields"
              :fields="section.fields || []"
              :dropdown-options="dropdownOptions"
            />
          </template>
        </template>

        <!-- ── checklist: titled grid of checkbox items ────────────────────── -->
        <ActionChecklist
          v-else-if="section.type === 'checklist'"
          v-model="formStates[selectedOptionKey].checklist"
          :title="section.title"
          :items="section.items"
        />

        <!-- ── conditional-dropdowns: shown only when trigger checkbox is checked ── -->
        <template
          v-else-if="
            section.type === 'conditional-dropdowns' &&
            formStates[selectedOptionKey].checklist[section.triggerCheckboxId]
          "
        >
          <DropdownGroup
            v-for="group in section.groups"
            :key="group.label"
            v-model="formStates[selectedOptionKey].fields"
            :label="group.label"
            :fields="group.fields"
            :dropdown-options="dropdownOptions"
            :cols="group.cols || 2"
            :is-conditional="true"
          />
        </template>

        <!-- ── recipients: grid of checkable recipient cards with badges ─────── -->
        <RecipientsChecklist
          v-else-if="section.type === 'recipients'"
          v-model="formStates[selectedOptionKey].checklist"
          :title="section.title"
          :description="section.description"
          :items="section.items"
        />
      </template>
    </BaseBox>

    <!-- Separate BaseBox for Notification Preview -->
    <template
      v-for="section in currentSections.filter(s => s.type === 'notification')"
      :key="section.type"
    >
      <BaseBox type="glass" class="p-6 mb-6">
        <NotificationPreview
          :section="section"
          :selected-option-key="selectedOptionKey"
          :checkbox-states="formStates[selectedOptionKey].checklist"
          :recipients-list="currentRecipientsList"
          :idea-title="tabData.ideaTitle"
        />
      </BaseBox>
    </template>
  </template>

  <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 3 — Notes & Action Buttons
     ════════════════════════════════════════════════════════════════════════ -->
  <BaseBox class="gradient-border rounded-2xl p-6 flex flex-col gap-4">
    <h3 class="text-white text-sm md:text-base font-bold">{{ tabData.notesLabel }}</h3>
    <BaseTextarea
      v-model="feedbackNotes"
      :placeholder="tabData.notesPlaceholder"
      :rows="3"
    />

    <!-- Action buttons (rendered from data.actions) -->
    <div class="flex flex-col sm:flex-row justify-end items-center gap-3 mt-1">
      <button
        v-for="action in tabData.actions"
        :key="action.key"
        @click="handleAction(action.key)"
        class="w-full sm:w-auto px-7 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer text-center"
        :class="
          action.variant === 'primary'
            ? 'bg-[#32BEA6] hover:bg-[#28a38e] text-white'
            : 'bg-[#1A2338]/50 border border-white/10 hover:bg-[#1A2338] text-white/80'
        "
      >
        {{ action.label }}
      </button>
    </div>
  </BaseBox>

  <!-- ═══════════════════════════════════════════════════════════════════════
         Success Confirmation Modal
     ════════════════════════════════════════════════════════════════════════ -->
  <BaseActionModal
    :is-open="successModalOpen"
    :title="tabData.modal?.title"
    :has-mascot="true"
    mascot-name="robot"
    @close="successModalOpen = false"
  >
    <div class="p-6">
      <div class="flex flex-col items-center justify-center text-center py-6 gap-4">
        <div
          class="w-16 h-16 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]"
        >
          <svg
            class="w-8 h-8 stroke-[3px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-white text-lg font-bold">
          {{ tabData.modal?.successTitle }}
        </h3>
        <p class="text-white/60 text-xs md:text-sm">
          {{ tabData.modal?.successMessage }}
        </p>
      </div>
    </div>
  </BaseActionModal>
</template>

<style scoped>
:deep(.select-arrow) {
  background-color: rgba(239, 239, 239, 0.2);
  border-radius: 50%;
  width: 38px;
  height: 38px;
}
</style>
