<script setup>
import BaseBox from "@/components/ui/BaseBox.vue";
const modelValue = defineModel({
  type: Boolean,
  default: false,
});

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  badgeText: {
    type: String,
    default: "",
  },
  badgeType: {
    type: String,
    default: "primary", // 'primary', 'secondary', 'outline'
  },
});

const toggleSelection = () => {
  modelValue.value = !modelValue.value;
};
</script>

<template>
  <BaseBox
    @click="toggleSelection"
    class="py-3 px-3 sm:py-4.5 sm:px-5 rounded-[20px] border border-theme-accent-primary/32 gap-4 cursor-pointer"
  >
    <!-- Checkbox and Text Container -->

    <div class="flex items-start justify-between gap-2 sm:gap-4">
      <div class="flex items-center gap-2 sm:gap-4">
        <!-- Checkbox Square -->
        <span
          class="w-4 h-4 sm:w-6 sm:h-6 mt-1 shrink-0 rounded-sm flex items-center justify-center transition-all duration-300"
          :class="
            modelValue
              ? 'bg-[#10B981] text-white'
              : 'bg-theme-text/10 text-transparent border border-theme-border/30'
          "
        >
          <svg
            class="w-3 h-3 sm:w-4 sm:h-4 stroke-[3px]"
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
        </span>

        <h4 class="text-theme-text text-xs sm:text-base font-bold">
          {{ title }}
        </h4>
      </div>

      <!-- Optional Left Badge -->
      <span
        v-if="badgeText"
        class="px-2 sm:px-5 py-2 rounded-full bg-theme-accent-secondary-bg text-theme-accent-secondary text-[10px] md:text-sm sm:font-medium shrink-0"
      >
        {{ badgeText }}
      </span>
    </div>
    <p
      v-if="subtitle"
      class="text-theme-text/70 leading-relaxed mt-0.5 ms-6 sm:ms-10 text-xs sm:text-sm"
    >
      {{ subtitle }}
    </p>
    <!-- Slot for nested content (e.g. sub-checklists) -->
    <div @click.stop>
      <slot />
    </div>
  </BaseBox>
</template>
