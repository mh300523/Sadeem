<script setup>
import BaseModal from "@/components/ui/BaseModal.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  hasMascot: {
    type: Boolean,
    default: false,
  },
  mascotName: {
    type: String,
    default: "robot",
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <BaseModal :is-open="isOpen" @close="emit('close')">
    <!-- Mascot positioned on top border (e.g., Astronaut/Robot) -->
    <div
      v-if="hasMascot"
      class="absolute bottom-[calc(100%-65px)] z-[-1] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <SvgIcon name="modal-handle" classes="w-full h-full" />
    </div>

    <!-- Header Gradient capsule -->
    <div
      class="gradient-purple flex items-center justify-between px-4 py-4.5 rounded-t-[20px]"
    >
      <!--  Title -->
      <h3 class="text-white text-sm font-bold">
        {{ title }}
      </h3>
      <!-- Close Button on the left in RTL / right in LTR -->
      <button
        @click="emit('close')"
        class="text-white hover:text-[#FF705D] cursor-pointer"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Modal Body Content Slot -->
    <slot />
  </BaseModal>
</template>
