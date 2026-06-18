<script setup>
import { ref, computed } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import BaseTextarea from "@/components/ui/BaseTextarea.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

// Import local UI Schema Configuration from global config folder
import { decisionSchema } from "@/config/decisionSchema";

// Import custom sub-components
import RecommendationCards from "./RecommendationCards.vue";
import RejectSummary from "./RejectSummary.vue";
import DropdownGroup from "./DropdownGroup.vue";
import ActionChecklist from "./ActionChecklist.vue";
import RecipientsChecklist from "./RecipientsChecklist.vue";
import NotificationPreview from "./NotificationPreview.vue";
import EscalationSummary from "./EscalationSummary.vue";

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
  () => decisionSchema[selectedOptionKey.value] || null,
);

const currentSections = computed(() => currentOption.value?.sections || []);

// Dynamic resolved recipients list for the active path
const currentRecipientsList = computed(() => {
  return (
    currentSections.value.find((s) => s.type === "recipients")?.items || []
  );
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
    if (section.type === "textarea") {
      formStates.value[key].fields[section.id] = section.default ?? "";
    } else if (section.type === "sub-checklists") {
      (section.groups || []).forEach((group) => {
        formStates.value[key].checklist[group.id] = group.checked ?? false;
        (group.items || []).forEach((item) => {
          formStates.value[key].checklist[item.id] = item.checked ?? false;
        });
      });
    } else {
      const fieldsList =
        section.fields || section.groups?.flatMap((g) => g.fields) || [];
      fieldsList.forEach((field) => {
        formStates.value[key].fields[field.id] = field.default ?? "";
      });
    }
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
      if (section.type === "dropdowns") {
        const fieldsList =
          section.fields || section.groups?.flatMap((g) => g.fields) || [];
        fieldsList.forEach((field) => {
          payload.fields[field.id] = activeState.fields[field.id] ?? "";
        });
      } else if (section.type === "textarea") {
        payload.fields[section.id] = activeState.fields[section.id] ?? "";
      }
      if (section.type === "checklist") {
        for (const item of section.items) {
          payload.checklist[item.id] = activeState.checklist[item.id] ?? false;
        }
      }
      if (section.type === "sub-checklists") {
        for (const group of section.groups) {
          payload.checklist[group.id] =
            activeState.checklist[group.id] ?? false;
          for (const item of group.items) {
            payload.checklist[item.id] =
              activeState.checklist[item.id] ?? false;
          }
        }
      }
      if (section.type === "recipients") {
        for (const item of section.items) {
          payload.recipients[item.id] = activeState.checklist[item.id] ?? false;
        }
      }
    }

    console.log(
      "Submitting Clean Serialized Payload:",
      JSON.stringify(payload, null, 2),
    );
    successModalOpen.value = true;
  } else if (actionKey === "draft") {
    console.log(
      "Saving draft locally for option:",
      activeKey,
      JSON.stringify(activeState, null, 2),
    );
  } else if (actionKey === "preview-all") {
    console.log("Previewing all notifications locally");
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
  <RecommendationCards v-model="selectedOptionKey" :options="options" />

  <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 2 — Active Path (configuration-driven section rendering)
     ════════════════════════════════════════════════════════════════════════ -->
  <template v-if="currentOption">
    <!-- Path title + description header -->
    <!-- Main config sections box -->
    <BaseBox type="glass" class="p-6 mb-6">
      <div class="mb-5">
        <h3 class="primary-text-gradient text-lg md:text-xl font-medium mb-2">
          {{ currentOption.pathTitle }}
        </h3>
        <div
          v-if="currentOption.pathmessage"
          class="bg-[#06B6D4]/10 border border-dashed border-[#06B6D4] p-5 rounded-2xl mt-3 w-fit"
        >
          <p class="text-[#06B6D4]">
            {{ currentOption.pathmessage }}
          </p>
          <div
            class="bg-[#FB3748]/10 border border-[#FB3748] text-[#FB3748] px-3 py-1 rounded-full mt-3 w-fit"
            v-if="currentOption.pathmessageBadge"
          >
            {{ currentOption.pathmessageBadge }}
          </div>
        </div>
      </div>

      <!-- Render each non-notification section in order -->
      <template
        v-for="section in currentSections.filter(
          (s) => s.type !== 'notification',
        )"
        :key="section.type + (section.title || '')"
      >
        <!-- ── reject-summary: red warning banner + summary cards ─────────── -->
        <RejectSummary
          v-if="section.type === 'reject-summary'"
          :title="section.title"
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
            />
          </template>
          <!-- Handle flat fields lists -->
          <template v-else>
            <DropdownGroup
              v-model="formStates[selectedOptionKey].fields"
              :label="section.title"
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

        <!-- ── board-info: Information card about the Strategic Board ────── -->
        <div v-else-if="section.type === 'board-info'" class="mb-6">
          <h4
            v-if="section.title"
            class="text-white text-xs md:text-sm font-medium mb-3"
          >
            {{ section.title }}
          </h4>
          <BaseBox class="border border-[#06B6D4]/32 px-6 py-5 rounded-[20px]">
            <p class="text-white text-base leading-relaxed font-light">
              {{ section.text }}
            </p>
            <div
              v-if="section.badge"
              class="px-5 py-2 mt-3 rounded-full bg-[#7DD3FC]/10 border border-[#7DD3FC] text-[#7DD3FC] w-fit"
            >
              {{ section.badge }}
            </div>
          </BaseBox>
        </div>

        <!-- ── sub-checklists: multi-column hierarchical checklists ────────── -->
        <ActionChecklist
          v-else-if="section.type === 'sub-checklists'"
          v-model="formStates[selectedOptionKey].checklist"
          :title="section.title"
          :groups="section.groups"
        />

        <!-- ── escalation-summary: AI Escalation Summary cards ────────────── -->
        <EscalationSummary
          v-else-if="section.type === 'escalation-summary'"
          :title="section.title"
          :info-text="section.infoText"
          :cards="section.cards"
          :rec-title="section.recTitle"
          :rec-card="section.recCard"
        />

        <!-- ── textarea: dynamic textarea field ────────────────────────────── -->
        <div v-else-if="section.type === 'textarea'" class="mb-6">
          <BaseTextarea
            v-model="formStates[selectedOptionKey].fields[section.id]"
            :placeholder="section.placeholder"
            :rows="section.rows || 4"
            :label="section.label"
            labelClass="font-medium mb-2"
          />
        </div>

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
      v-for="section in currentSections.filter(
        (s) => s.type === 'notification',
      )"
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
  <BaseBox
    type="glass"
    class="gradient-border rounded-2xl p-6 flex flex-col gap-4"
  >
    <BaseTextarea
      v-model="feedbackNotes"
      :placeholder="tabData.notesPlaceholder"
      :rows="6"
      :label="tabData.notesLabel"
      labelClass="primary-text-gradient text-lg md:text-xl font-medium mb-2"
    />

    <!-- Action buttons -->
    <div class="flex flex-col sm:flex-row items-center gap-3 mt-1">
      <BaseButton
        @click="handleAction('send')"
        class="w-full sm:w-auto min-w-[180px] rounded-xl rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#05D989] to-[#018AAF] text-white font-bold"
      >
        {{ $t("actions.send_decision") }}
      </BaseButton>
      <BaseButton
        @click="handleAction('draft')"
        class="w-full ] sm:w-auto min-w-[180px] rounded-xl text-center bg-[#32BEA6]/10 border border-[#32BEA6]/10 text-[#32BEA6] font-bold"
      >
        {{ $t("actions.save_draft") }}
      </BaseButton>
      <BaseButton
        @click="handleAction('preview-all')"
        class="w-full sm:w-auto min-w-[180px] rounded-xl text-center bg-white/10 border border-white/20 text-[#94A3B8] font-bold"
      >
        {{ $t("actions.preview_all_notifications") }}
      </BaseButton>
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
      <div
        class="flex flex-col items-center justify-center text-center py-6 gap-4"
      >
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
