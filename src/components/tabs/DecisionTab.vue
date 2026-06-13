<script setup>
import { ref, computed, watch } from "vue";
import BaseBox from "@/components/ui/BaseBox.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseCheckableCard from "@/components/ui/BaseCheckableCard.vue";
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import BaseTextarea from "@/components/ui/BaseTextarea.vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

// ─── Data resolution (props.data or fallback empty structure) ────────────────
const tabData = computed(() => props.data || {});
const options = computed(() => tabData.value.options || []);
const dropdownOptions = computed(() => tabData.value.dropdownOptions || {});

// ─── Selected option key ─────────────────────────────────────────────────────
const selectedOptionKey = ref("");

// Initialize to first option key once data is available
watch(
  options,
  (opts) => {
    if (opts.length && !selectedOptionKey.value) {
      selectedOptionKey.value = opts[1]?.key || opts[0]?.key || "";
    }
  },
  { immediate: true },
);

const currentOption = computed(
  () => options.value.find((o) => o.key === selectedOptionKey.value) || null,
);

const currentSections = computed(() => currentOption.value?.sections || []);

// ─── Shared reactive state (flat maps, keyed by field/item id) ───────────────

// fieldModels: one v-model per dropdown field id, initialized from defaults
const fieldModels = ref({});

// checkboxStates: one boolean per checkbox/recipient id, initialized from checked
const checkboxStates = ref({});

// Seed states from all options' sections whenever data changes
const seedState = () => {
  const fields = {};
  const checks = {};
  for (const option of options.value) {
    for (const section of option.sections || []) {
      // Dropdown fields
      if (section.type === "dropdowns" || section.type === "conditional-dropdowns") {
        for (const group of section.groups || []) {
          for (const field of group.fields || []) {
            if (!(field.id in fields)) {
              fields[field.id] = field.default ?? "";
            }
          }
        }
      }
      // Checklist + recipient items
      if (section.type === "checklist" || section.type === "recipients") {
        for (const item of section.items || []) {
          if (!(item.id in checks)) {
            checks[item.id] = item.checked ?? false;
          }
        }
      }
    }
  }
  fieldModels.value = fields;
  checkboxStates.value = checks;
};

watch(options, seedState, { immediate: true });

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Lookup whether a checkbox/recipient is currently checked
const isChecked = (id) => !!checkboxStates.value[id];

// Resolve the dropdown options array for a given field optionsKey
const resolveOptions = (optionsKey) => dropdownOptions.value[optionsKey] || [];

// ─── Notes & Modal ───────────────────────────────────────────────────────────
const feedbackNotes = ref("");
const successModalOpen = ref(false);

const handleAction = (actionKey) => {
  if (actionKey === "send") successModalOpen.value = true;
};
</script>

<template>
  <div class="flex flex-col gap-6 text-right" dir="rtl">

    <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 1 — Option Selection Cards
    ════════════════════════════════════════════════════════════════════════ -->
    <BaseBox class="gradient-border rounded-2xl p-6 flex flex-col gap-4">
      <!-- Section header -->
      <div class="border-b border-white/10 pb-3">
        <h3 class="text-white text-sm md:text-base font-bold">
          {{ tabData.sectionTitle }}
        </h3>
      </div>
      <p class="text-white/60 text-xs leading-relaxed">
        {{ tabData.sectionDescription }}
      </p>

      <!-- Option cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-1">
        <div
          v-for="option in options"
          :key="option.key"
          @click="selectedOptionKey = option.key"
          class="p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2 min-h-[100px] select-none"
          :class="
            selectedOptionKey === option.key
              ? 'bg-[#018AAF]/10 border-[#018AAF] shadow-[0_0_16px_rgba(1,138,175,0.15)]'
              : 'bg-[#161F30]/40 border-white/5 hover:border-white/15 hover:bg-[#161F30]/60'
          "
        >
          <h4
            class="text-xs md:text-sm font-bold transition-colors duration-300"
            :class="selectedOptionKey === option.key ? 'text-[#33BCE1]' : 'text-white'"
          >
            {{ option.label }}
          </h4>
          <p class="text-[10px] text-white/50 leading-normal">
            {{ option.description }}
          </p>
        </div>
      </div>
    </BaseBox>

    <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 2 — Active Path (configuration-driven section rendering)
    ════════════════════════════════════════════════════════════════════════ -->
    <template v-if="currentOption">
      <!-- Path title + description header -->
      <BaseBox class="gradient-border rounded-2xl p-6 flex flex-col gap-5">
        <div class="border-b border-white/10 pb-3">
          <h3 class="text-white text-sm md:text-base font-bold">
            {{ currentOption.pathTitle }}
          </h3>
          <p class="text-white/60 text-xs mt-1.5 leading-relaxed">
            {{ currentOption.pathDescription }}
          </p>
        </div>

        <!-- Render each section in order -->
        <template v-for="section in currentSections" :key="section.type + (section.title || '')">

          <!-- ── reject-summary: red warning banner + summary cards ─────────── -->
          <template v-if="section.type === 'reject-summary'">
            <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs leading-relaxed">
              {{ section.warningText }}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="item in section.summaryItems"
                :key="item.label"
                class="p-4 rounded-xl bg-[#161F30] border border-white/5 flex flex-col gap-1.5"
              >
                <span class="text-white/40 text-[10px] font-bold">{{ item.label }}</span>
                <p class="text-white/70 text-xs leading-relaxed">{{ item.text }}</p>
              </div>
            </div>
          </template>

          <!-- ── dropdowns: labeled groups of BaseSelect fields ────────────── -->
          <template v-else-if="section.type === 'dropdowns'">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 border border-white/5 p-4 rounded-xl bg-[#161F30]/30">
              <div
                v-for="group in section.groups"
                :key="group.label"
                class="flex flex-col gap-3"
              >
                <h4 class="text-white/60 text-[10px] font-bold uppercase tracking-wide mb-0.5">
                  {{ group.label }}
                </h4>
                <div
                  class="grid gap-3"
                  :class="`grid-cols-${Math.min(group.cols, 3)}`"
                >
                  <BaseSelect
                    v-for="field in group.fields"
                    :key="field.id"
                    v-model="fieldModels[field.id]"
                    :options="resolveOptions(field.optionsKey)"
                    :placeholder="field.placeholder"
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- ── checklist: titled grid of BaseCheckableCard items ─────────── -->
          <template v-else-if="section.type === 'checklist'">
            <div>
              <h4 class="text-white text-xs font-bold mb-3">{{ section.title }}</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <BaseCheckableCard
                  v-for="item in section.items"
                  :key="item.id"
                  v-model="checkboxStates[item.id]"
                  :title="item.label"
                  :subtitle="item.desc"
                />
              </div>
            </div>
          </template>

          <!-- ── conditional-dropdowns: shown only when trigger checkbox is checked ── -->
          <template
            v-else-if="
              section.type === 'conditional-dropdowns' &&
              isChecked(section.triggerCheckboxId)
            "
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 border border-white/5 p-4 rounded-xl bg-[#161F30]/30">
              <div
                v-for="group in section.groups"
                :key="group.label"
                class="flex flex-col gap-3"
              >
                <h4 class="text-white/60 text-[10px] font-bold uppercase tracking-wide mb-0.5">
                  {{ group.label }}
                </h4>
                <div
                  class="grid gap-3"
                  :class="`grid-cols-${Math.min(group.cols, 2)}`"
                >
                  <BaseSelect
                    v-for="field in group.fields"
                    :key="field.id"
                    v-model="fieldModels[field.id]"
                    :options="resolveOptions(field.optionsKey)"
                    :placeholder="field.placeholder"
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- ── recipients: 4-col grid of BaseCheckableCard with badges ─────── -->
          <template v-else-if="section.type === 'recipients'">
            <div class="border-t border-white/10 pt-4">
              <div class="mb-3">
                <h3 class="text-white text-sm font-bold">{{ section.title }}</h3>
                <p v-if="section.description" class="text-white/50 text-xs mt-1">
                  {{ section.description }}
                </p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <BaseCheckableCard
                  v-for="item in section.items"
                  :key="item.id"
                  v-model="checkboxStates[item.id]"
                  :title="item.label"
                  :subtitle="item.desc"
                  :badge-text="item.badge"
                  :badge-type="item.badgeType"
                />
              </div>
            </div>
          </template>

          <!-- ── notification: email preview card ───────────────────────────── -->
          <template v-else-if="section.type === 'notification'">
            <div class="border-t border-white/10 pt-4 flex flex-col gap-3">
              <div>
                <h3 class="text-white text-sm font-bold">{{ section.title }}</h3>
                <p v-if="section.description" class="text-white/60 text-xs mt-1">
                  {{ section.description }}
                </p>
              </div>
              <div class="border border-white/5 rounded-2xl bg-[#161F30]/30 p-4">
                <div class="p-4 rounded-xl bg-[#161F30]/80 border border-white/5 flex flex-col gap-3">
                  <!-- Subject line -->
                  <p class="font-bold text-white text-xs md:text-sm">
                    {{ section.subject }}
                  </p>
                  <!-- Body -->
                  <div class="border-t border-white/5 pt-3 text-white/80 text-xs leading-relaxed">
                    <p class="font-semibold text-white mb-2">عزيزي مستلم البريد،</p>
                    <p class="whitespace-pre-line">{{ section.body }}</p>
                    <!-- CTA button mockup -->
                    <div class="my-4">
                      <button
                        class="px-5 py-2.5 rounded-lg bg-[#018AAF] text-white text-xs font-bold pointer-events-none"
                      >
                        {{ section.buttonLabel }}
                      </button>
                    </div>
                    <!-- Signature -->
                    <p class="text-white/40 text-[10px] mt-4 whitespace-pre-line">
                      {{ section.signature }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>

        </template>
      </BaseBox>
    </template>

    <!-- ═══════════════════════════════════════════════════════════════════════
         SECTION 3 — Notes & Action Buttons
    ════════════════════════════════════════════════════════════════════════ -->
    <BaseBox class="gradient-border rounded-2xl p-6 flex flex-col gap-4">
      <h3 class="text-white text-sm font-bold">{{ tabData.notesLabel }}</h3>
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
            <svg class="w-8 h-8 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
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

  </div>
</template>
