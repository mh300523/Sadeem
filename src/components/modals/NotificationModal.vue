<script setup>
import { ref } from "vue";
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseTextarea from "@/components/ui/BaseTextarea.vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  content: {
    type: Object,
    required: true,
  },
  recipients: {
    type: Array,
    default: () => [],
  },
  notes: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "close",
  "send",
  "update:recipients",
  "update:notes",
]);

const newRecipient = ref("");

const removeRecipient = (index) => {
  const updated = [...props.recipients];
  updated.splice(index, 1);
  emit("update:recipients", updated);
};

const addRecipient = () => {
  if (newRecipient.value.trim() && newRecipient.value.includes("@")) {
    const updated = [...props.recipients, newRecipient.value.trim()];
    emit("update:recipients", updated);
    newRecipient.value = "";
  }
};

const handleSend = () => {
  emit("send");
};
</script>

<template>
  <BaseActionModal
    :is-open="isOpen"
    :title="content.title"
    :has-mascot="false"
    @close="emit('close')"
  >
    <!-- Modal Body Content -->
    <div class="p-4 sm:p-6">
      <!-- Paper Airplane Center Icon -->
      <div class="flex justify-center py-2">
        <SvgIcon name="send" />
      </div>

      <!-- Recipient field -->
      <div>
        <h4 class="text-theme-text font-medium mb-1.5">المرسل إليه:</h4>

        <!-- Tags -->
        <div class="flex items-center flex-wrap gap-2 mb-3">
          <div
            v-for="(email, idx) in recipients"
            :key="idx"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF6B35]/14 text-theme-text/90 text-xs border border-theme-border/30"
          >
            <span>{{ email }}</span>
            <button
              @click="removeRecipient(idx)"
              class="text-theme-text/40 hover:text-theme-text transition-colors focus:outline-none cursor-pointer text-sm font-bold"
            >
              &times;
            </button>
          </div>
        </div>

        <!-- Input area for adding more -->
        <div class="">
          <BaseInput
            type="text"
            v-model="newRecipient"
            @keydown.enter.prevent="addRecipient"
            @blur="addRecipient"
            :placeholder="$t('placeholders.add_another_recipient')"
            size="lg"
          />
        </div>
      </div>

      <!-- Styled message block -->
      <div>
        <div class="text-theme-text/70 leading-relaxed my-3">
          <h4 class="font-medium text-theme-text text-2xl mb-3">
            {{ content.subject }}
          </h4>
          <p
            v-for="(p, idx) in content.paragraphsBefore"
            :key="'pb-' + idx"
            class="mb-2"
          >
            {{ p }}
          </p>
          <ul class="list-disc list-inside ps-3 mb-3">
            <li
              class="mb-2 last:mb-0"
              v-for="(b, idx) in content.bullets"
              :key="'b-' + idx"
            >
              {{ b }}
            </li>
          </ul>
          <p
            v-for="(p, idx) in content.paragraphsAfter"
            :key="'pa-' + idx"
            class="mb-2"
          >
            {{ p }}
          </p>
        </div>
      </div>

      <!-- Additional Notes Input -->
      <div>
        <BaseTextarea
          :model-value="notes"
          @update:model-value="emit('update:notes', $event)"
          :placeholder="$t('placeholders.add_notes')"
          :rows="1.5"
          size="lg"
        />
      </div>

      <p class="text-theme-text/60 text-xs my-4">
        مع خالص التقدير،<br />
        <span class="text-[#05D989] inline-block font-medium mt-2"
          >فريق منصة سديم</span
        >
      </p>

      <!-- Action Button -->
      <div class="mt-2">
        <BaseButton
          @click="handleSend"
          class="w-full py-3.5 font-bold text-theme-text rtl:bg-linear-to-r ltr:bg-linear-to-l from-[#05D989] to-[#018AAF]"
        >
          {{ $t("actions.send_notification") }}
        </BaseButton>
      </div>
    </div>
  </BaseActionModal>
</template>
