<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

import BaseTabs from "@/components/ui/BaseTabs.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseSkeleton from "@/components/ui/BaseSkeleton.vue";

import MainTitle from "@/components/ui/MainTitle.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import MergeConfirmationModal from "@/components/modals/MergeConfirmationModal.vue";
import MergeSuccessModal from "@/components/modals/MergeSuccessModal.vue";
import DuplicateActionModal from "@/components/modals/DuplicateActionModal.vue";
import NotificationModal from "@/components/modals/NotificationModal.vue";
import { useModal } from "@/composables/useModal";
import { useIdeaStore } from "@/stores/ideaStore";

const activeTab = ref("overview");

const route = useRoute();
const router = useRouter();

const { tm, rt } = useI18n();
const store = useIdeaStore();

const loadIdeaDetails = () => {
  const currentId = route.params.id;
  if (currentId) {
    store.fetchIdeaDetails(currentId);
  }
};

onMounted(() => {
  loadIdeaDetails();
});

watch(
  () => route.params.id,
  () => {
    loadIdeaDetails();
  }
);

// Load API response from Pinia store
const ideaDetails = computed(() => {
  return store.ideaDetails[route.params.id] || {};
});

const DEFAULT_RECIPIENTS = [
  "ahmedshahrooj@gmail.com",
  "lutflabusalem@gmail.com",
  "sameerrshams95@gmail.com",
];

const {
  isOpen: isMergeModalOpen,
  data: mergeModalData,
  open: openMergeModal,
  close: closeMergeModal,
} = useModal();

const {
  isOpen: isSuccessModalOpen,
  open: openSuccessModal,
  close: closeSuccessModal,
} = useModal();

const {
  isOpen: isDuplicateModalOpen,
  open: openDuplicateModal,
  close: closeDuplicateModal,
} = useModal();

const {
  isOpen: isNotificationModalOpen,
  open: openNotificationModal,
  close: closeNotificationModal,
} = useModal();

const notificationType = ref("duplicate"); // "duplicate" | "link-project" | "execution-plan"

// Centralized notification input states
const notificationRecipients = ref([...DEFAULT_RECIPIENTS]);
const notificationNotes = ref("");

// Computed localized template content
const currentNotificationContent = computed(() => {
  if (!notificationType.value) return {};
  const formattedType = notificationType.value.replace("-", "_");
  const content = tm(`notifications.${formattedType}`);
  if (!content) return {};

  return {
    title: rt(content.title),
    subject: rt(content.subject),
    paragraphsBefore: Array.isArray(content.paragraphsBefore)
      ? content.paragraphsBefore.map(rt)
      : [],
    bullets: Array.isArray(content.bullets) ? content.bullets.map(rt) : [],
    paragraphsAfter: Array.isArray(content.paragraphsAfter)
      ? content.paragraphsAfter.map(rt)
      : [],
  };
});

const handleMergeRequest = (idea) => {
  openMergeModal(idea);
};

const confirmMerge = () => {
  closeMergeModal();
  openSuccessModal();
};

const handleDuplicateRequest = (idea) => {
  openDuplicateModal(idea);
};

const openNotification = (type, idea = null) => {
  // Reset input states to default on open
  notificationRecipients.value = [...DEFAULT_RECIPIENTS];
  notificationNotes.value = "";
  notificationType.value = type;
  openNotificationModal(idea);
};

const handleSendNotificationFromDuplicate = () => {
  closeDuplicateModal();
  openNotification("duplicate");
};

const handleSendNotification = () => {
  closeNotificationModal();
};

const onDuplicateStatusChange = ({ idea, status }) => {
  if (status === "duplicate") {
    handleDuplicateRequest(idea);
  }
};

const onLinkProject = () => {
  openNotification("link-project");
};

const onExecutionPlanChange = (status) => {
  if (status === "confirmed") {
    openNotification("execution-plan");
  }
};

const onViewIdea = (idea) => {
  router.push({ name: "IdeaDetails", params: { id: idea.id } });
};

// Re-use Badge Styling from Config
const statusConfigs = computed(() => store.statusConfigs);
function getBadgeConfig(statusId) {
  return statusConfigs.value?.[statusId] || statusConfigs.value?.new || { bgClass: "", iconName: "" };
}

// Dynamic Tabs Definition from normalized API response payload
const tabsList = computed(() => {
  return ideaDetails.value?.tabs || [];
});
</script>

<template>
  <div>
    <!-- Loading State -->
    <div v-if="store.detailsLoading" class="space-y-6">
      <BaseSkeleton type="header" />
      <BaseSkeleton type="box" height="h-12" custom-class="!rounded-xl mb-6" />
      <BaseSkeleton type="box" height="h-[500px]" custom-class="!rounded-3xl" />
    </div>

    <!-- Error State -->
    <div v-else-if="store.detailsError" class="mt-6 p-6 bg-red-950/20 border border-red-500/30 rounded-2xl text-center">
      <div class="text-red-400 font-medium mb-3">{{ store.detailsError }}</div>
      <button
        @click="loadIdeaDetails"
        class="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors text-sm border border-red-500/30"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Ready State -->
    <div v-else-if="ideaDetails.id">
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
              {{ $t("actions.invite_evaluator") }}
            </BaseButton>
            <!-- Start Evaluation Button -->
            <BaseButton class="gradient-purple text-white shadow-lg">
              {{ $t("actions.start_evaluation") }}
            </BaseButton>

            <!-- Save Draft Button -->
            <BaseButton
              class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#018AAF]/20 to-[#7F4FFF]/20 text-[#7F4FFF] backdrop-blur-2xl"
            >
              {{ $t("actions.save_draft") }}
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation & Content using unified BaseTabs -->
      <BaseTabs
        v-model:activeTab="activeTab"
        :tabs="tabsList"
        @merge-request="handleMergeRequest"
        @duplicate-status-change="onDuplicateStatusChange"
        @link-project="onLinkProject"
        @execution-plan-change="onExecutionPlanChange"
        @view-idea="onViewIdea"
      />

      <!-- Confirmation Modal (Pop-up 1) -->
      <MergeConfirmationModal
        :is-open="isMergeModalOpen"
        :current-idea-title="ideaDetails?.title || ''"
        :selected-idea-title="mergeModalData?.title || ''"
        @close="closeMergeModal"
        @confirm="confirmMerge"
      />

      <!-- Success Modal (Pop-up 2) -->
      <MergeSuccessModal
        :is-open="isSuccessModalOpen"
        @close="closeSuccessModal"
      />

      <!-- Duplicate Action Modal (Pop-up 3) -->
      <DuplicateActionModal
        :is-open="isDuplicateModalOpen"
        @close="closeDuplicateModal"
        @link-contributor="closeDuplicateModal"
        @close-duplicate="closeDuplicateModal"
        @send-notification="handleSendNotificationFromDuplicate"
      />

      <!-- Action Notification Modal (Pop-up 4) -->
      <NotificationModal
        :is-open="isNotificationModalOpen"
        :content="currentNotificationContent"
        v-model:recipients="notificationRecipients"
        v-model:notes="notificationNotes"
        @close="closeNotificationModal"
        @send="handleSendNotification"
      />
    </div>
  </div>
</template>

<style scoped></style>
