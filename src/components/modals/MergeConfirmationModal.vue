<script setup>
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  currentIdeaTitle: {
    type: String,
    default: "",
  },
  selectedIdeaTitle: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <BaseActionModal
    :is-open="isOpen"
    :title="$t('create_merge_state')"
    :has-mascot="true"
    mascot-name="robot"
    @close="emit('close')"
  >
    <!-- Modal Body Content -->
    <div class="p-6">
      <div class="pb-4">
        <div class="mb-4">
          <h4 class="text-white text-base font-medium mb-2">
            {{ $t("current_idea") }}
          </h4>
          <p
            class="primary-text-gradient text-sm md:text-base font-bold leading-relaxed"
          >
            {{ currentIdeaTitle }}
          </p>
        </div>

        <div>
          <h4 class="text-white text-base font-medium mb-2">
            {{ $t("selected_idea") }}
          </h4>
          <p
            class="text-[#33BCE1] text-sm md:text-base font-bold leading-relaxed"
          >
            {{ selectedIdeaTitle }}
          </p>
        </div>

        <!-- Buttons Row -->
        <div class="flex flex-col sm:flex-row gap-3 mt-10">
          <BaseButton
            @click="emit('confirm')"
            class="flex-1 font-bold text-white rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#05D989] to-[#018AAF]"
          >
            {{ $t("actions.confirm_merge") }}
          </BaseButton>
          <BaseButton
            @click="emit('close')"
            class="flex-1 font-bold text-[#94A3B8] bg-white/10 border border-white/20"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            إلغاء
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseActionModal>
</template>
