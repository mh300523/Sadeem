<script setup>
import BaseActionModal from "@/components/ui/BaseActionModal.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);
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
    <div class="p-4 sm:p-6">
      <div
        class="flex flex-col items-center justify-center text-center py-6 gap-4"
      >
        <!-- Success Checkmark Circle -->
        <div
          class="w-16 h-16 rounded-full bg-[#32BEA6] flex items-center justify-center text-theme-text"
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
        <h3 class="text-theme-text text-lg font-bold">
          {{ $t("merged_success_title") }}
        </h3>
        <p class="text-theme-text/60 text-xs md:text-sm">
          {{ $t("merged_success_desc") }}
        </p>
      </div>
    </div>
  </BaseActionModal>
</template>
