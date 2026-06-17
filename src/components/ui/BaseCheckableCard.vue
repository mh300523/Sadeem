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
  <baseBox
    @click="toggleSelection"
    class="py-4.5 px-5 rounded-[20px] border border-[#06B6D4]/32 bg-transparent flex items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-white/5"
  >
    <!-- Checkbox and Text Container -->
    <div class="flex items-start gap-4">
      <!-- Checkbox Square -->
      <span
        class="w-6 h-6 mt-1.5 shrink-0 rounded-sm flex items-center justify-center transition-all duration-300"
        :class="
          modelValue
            ? 'bg-[#10B981] text-white'
            : 'bg-[#D9D9D9]/20 text-transparent'
        "
      >
        <svg
          class="w-4 h-4 stroke-[3px]"
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

      <!-- Title & Subtitle -->
      <div class="flex flex-col gap-1 text-right">
        <h4 class="text-white md:text-base font-bold">
          {{ title }}
        </h4>
        <p v-if="subtitle" class="text-white/70 leading-relaxed">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <!-- Optional Left Badge -->
    <div v-if="badgeText" class="shrink-0">
      <span
        class="px-5 py-2.5 rounded-full bg-[#7DD3FC]/10 text-[#7DD3FC] font-medium"
      >
        {{ badgeText }}
      </span>
    </div>
  </baseBox>
</template>
