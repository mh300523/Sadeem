<script setup>
import { ref } from "vue";
import BaseActionModal from "@/components/ui/BaseActionModal.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

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
    <div class="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div class="flex flex-col gap-4 text-right">
        <!-- Paper Airplane Center Icon -->
        <div class="flex justify-center py-2">
          <div
            class="w-[70px] h-[55px] text-[#A855F7] flex items-center justify-center"
          >
            <SvgIcon name="modal-handle" classes="w-full h-full" />
          </div>
        </div>

        <!-- Recipient field -->
        <div>
          <h4 class="text-white/60 text-xs font-semibold mb-2">المرسل إليه:</h4>
          <div
            class="flex flex-wrap gap-2 p-2.5 rounded-xl bg-[#161F30] border border-white/5 min-h-[48px] items-center"
          >
            <!-- Tags -->
            <div
              v-for="(email, idx) in recipients"
              :key="idx"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#252E46] text-white/90 text-xs border border-white/10"
            >
              <span>{{ email }}</span>
              <button
                @click="removeRecipient(idx)"
                class="text-white/40 hover:text-white transition-colors focus:outline-none cursor-pointer text-sm font-bold"
              >
                &times;
              </button>
            </div>

            <!-- Input area for adding more -->
            <input
              type="text"
              v-model="newRecipient"
              @keydown.enter.prevent="addRecipient"
              @blur="addRecipient"
              placeholder="إضافة مستفيدين آخرين..."
              class="flex-1 min-w-[150px] bg-transparent border-none text-xs text-white placeholder-white/30 focus:outline-none focus:ring-0 py-0.5"
            />
          </div>
        </div>

        <!-- Styled message block -->
        <div>
          <div
            class="p-4 rounded-xl bg-[#161F30]/80 border border-white/5 text-xs text-white/80 leading-relaxed font-sans select-none max-h-[220px] overflow-y-auto custom-scrollbar"
          >
            <p class="font-bold text-white text-sm mb-3">
              {{ content.subject }}
            </p>
            <p
              v-for="(p, idx) in content.paragraphsBefore"
              :key="'pb-' + idx"
              class="mb-2"
            >
              {{ p }}
            </p>
            <ul class="list-disc list-inside pr-3 mb-3 flex flex-col gap-1">
              <li v-for="(b, idx) in content.bullets" :key="'b-' + idx">
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
            <p class="text-white/60 text-xs mt-4">
              مع خالص التقدير،<br />
              <span class="text-[#32BEA6] font-bold">فريق منصة سديم</span>
            </p>
          </div>
        </div>

        <!-- Additional Notes Input -->
        <div>
          <textarea
            :value="notes"
            @input="emit('update:notes', $event.target.value)"
            placeholder="إضافة ملاحظات أخرى..."
            rows="2"
            class="w-full p-3.5 rounded-xl bg-[#161F30] border border-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#32BEA6]/50 resize-none transition-colors"
          ></textarea>
        </div>

        <!-- Action Button -->
        <div class="mt-2">
          <BaseButton
            @click="handleSend"
            class="w-full py-3.5 font-bold text-white bg-[#32BEA6] hover:bg-[#28a791] hover:shadow-[0_4px_20px_rgba(50,190,166,0.3)] transition-all"
          >
            {{ $t("actions.send_notification") }}
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseActionModal>
</template>
