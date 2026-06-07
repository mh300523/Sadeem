<script setup>
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "close",
  "link-contributor",
  "close-duplicate",
  "send-notification",
]);
</script>

<template>
  <BaseActionModal
    :is-open="isOpen"
    title="تأكيد إجراء التكرار"
    :has-mascot="true"
    mascot-name="robot"
    @close="emit('close')"
  >
    <!-- Modal Body Content -->
    <div class="p-6">
      <div
        class="flex flex-col items-center justify-center text-center py-4 gap-6"
      >
        <h3 class="text-white text-sm md:text-base font-medium leading-relaxed">
          {{ $t("duplicate_modal_intro") }}
        </h3>

        <div class="flex flex-col gap-3.5 w-full">
          <!-- Button 1 -->
          <BaseButton
            @click="emit('link-contributor')"
            class="!py-3.5 font-bold text-white rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#05D989] to-[#018AAF]"
          >
            {{ $t("actions.link_idea_contributor") }}
          </BaseButton>

          <!-- Button 2   -->
          <BaseButton
            @click="emit('close-duplicate')"
            class="!py-3.5 font-bold text-[#32BEA6] bg-[#32BEA6]/10 border border-[#32BEA6]"
          >
            {{ $t("actions.close_duplicate") }}
          </BaseButton>

          <!-- Button 3 -->
          <BaseButton
            @click="emit('send-notification')"
            class="!py-3.5 font-bold text-[#94A3B8] bg-white/10 border border-white/20"
          >
            {{ $t("actions.send_notification") }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseActionModal>
</template>
