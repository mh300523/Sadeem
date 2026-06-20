<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { notificationTemplates } from "@/services/notificationTemplates";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  selectedOptionKey: {
    type: String,
    required: true,
  },
  checkboxStates: {
    type: Object,
    required: true,
  },
  recipientsList: {
    type: Array,
    required: true,
  },
  ideaTitle: {
    type: String,
    required: false,
    default: "",
  },
});

const { t } = useI18n();

// Get list of currently active (checked) recipients for this path
const activeRecipients = computed(() => {
  return props.recipientsList.filter((item) => !!props.checkboxStates[item.id]);
});

const selectedRecipientId = ref("");

// Watch active recipients: automatically select the first active one
watch(
  activeRecipients,
  (list) => {
    if (!list.some((r) => r.id === selectedRecipientId.value)) {
      selectedRecipientId.value = list[0]?.id || "";
    }
  },
  { immediate: true },
);

// Resolve subject and body for the selected recipient
const resolvedNotification = computed(() => {
  const pathTemplates = notificationTemplates[props.selectedOptionKey] || {};
  const recipientTemplate = pathTemplates[selectedRecipientId.value] || {};
  const defaultTemplate = pathTemplates.default || {};

  const rawSubject = recipientTemplate.subject || defaultTemplate.subject || "";
  const rawBody = recipientTemplate.body || defaultTemplate.body || "";

  // Replace {title} placeholder dynamically
  const title =
    props.ideaTitle || "نظام تحسين استهلاك الطاقة باستخدام الذكاء الاصطناعي";

  return {
    subject: rawSubject.replace(/{title}/g, title),
    body: rawBody.replace(/{title}/g, title),
    buttonLabel:
      recipientTemplate.buttonLabel ||
      defaultTemplate.buttonLabel ||
      t("notifications.button_label"),
  };
});
</script>

<template>
  <!-- Section Header -->
  <div class="mb-4">
    <h2 class="primary-text-gradient text-lg md:text-xl font-medium mb-2">
      {{ section.title }}
    </h2>
    <p
      v-if="section.description"
      class="text-theme-text/70 text-xs md:text-sm leading-relaxed"
    >
      {{ section.description }}
    </p>
  </div>

  <!-- Main Dynamic Section Layout -->
  <div
    v-if="activeRecipients.length"
    class="grid grid-cols-1 lg:grid-cols-12 gap-6"
  >
    <!-- Left side: Recipient Tabs Stack -->
    <div class="lg:col-span-3">
      <BaseButton
        v-for="recipient in activeRecipients"
        :key="recipient.id"
        @click="selectedRecipientId = recipient.id"
        class="w-full border rounded-2xl! mb-2.5 last:mb-0 recipient-btn"
        :class="
          selectedRecipientId === recipient.id
            ? 'bg-theme-accent-primary-bg border-theme-accent-primary text-theme-accent-primary font-bold recipient-btn-active'
            : 'bg-theme-inactive-bg border-theme-inactive-border hover:border-theme-accent-primary text-theme-accent-primary recipient-btn-inactive'
        "
      >
        {{ recipient.label }}
      </BaseButton>
    </div>

    <!-- Right side: Notification Preview Card -->
    <div class="lg:col-span-9">
      <div
        class="px-6 py-8 rounded-3xl bg-theme-preview-bg border border-theme-preview-border flex flex-col gap-4 preview-card"
      >
        <!-- Subject -->

        <h3 class="font-medium text-theme-text text-base md:text-2xl">
          {{ resolvedNotification.subject }}
        </h3>

        <!-- Body -->
        <div
          class="text-theme-text/80 text-xs md:text-sm leading-relaxed whitespace-pre-line"
        >
          {{ resolvedNotification.body }}
        </div>

        <!-- CTA Button -->

        <BaseButton
          class="bg-theme-accent-secondary-bg border border-theme-accent-secondary text-theme-accent-secondary w-fit cta-btn"
        >
          {{ resolvedNotification.buttonLabel }}
        </BaseButton>

        <!-- Signature -->
        <div
          class="pt-2.5 pb-3.5 border-t border-[#A9A9A9]/30 flex flex-col gap-1"
        >
          <span class="text-theme-text text-[11px]">
            {{ t("notifications.signature_greeting") }}
          </span>
          <span class="text-[#05D989] font-medium">
            {{ t("notifications.signature_platform") }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- Empty State if no recipients selected -->
  <div
    v-else
    class="border border-dashed border-theme-preview-border rounded-2xl bg-theme-empty-bg p-8 text-center text-theme-text/40 text-xs md:text-sm empty-state"
  >
    {{ t("notifications.empty_state_select_recipient") }}
  </div>
</template>

<style scoped></style>
