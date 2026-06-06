<script setup>
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
  <div
    @click="toggleSelection"
    class="p-4 rounded-xl border border-white/10 bg-transparent flex items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-white/5"
  >
    <!-- Checkbox and Text Container -->
    <div class="flex items-start gap-4">
      <!-- Checkbox Square -->
      <span
        class="w-5 h-5 mt-0.5 shrink-0 rounded-sm flex items-center justify-center transition-all duration-300 border"
        :class="
          modelValue
            ? 'bg-[#10B981] border-transparent text-white'
            : 'bg-[#161F30] border-white/20 text-transparent'
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
        <span class="text-white text-xs md:text-sm font-bold">{{ title }}</span>
        <span
          v-if="subtitle"
          class="text-white/50 text-[10px] md:text-xs leading-relaxed"
        >
          {{ subtitle }}
        </span>
      </div>
    </div>

    <!-- Optional Left Badge -->
    <div v-if="badgeText" class="shrink-0">
      <span
        class="px-3 py-1 rounded-md text-[10px] font-bold"
        :class="{
          'bg-[#018AAF]/20 border border-[#018AAF]/30 text-[#33BCE1]':
            badgeType === 'primary',
          'bg-white/5 border border-white/10 text-white/50':
            badgeType === 'outline',
          'bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]':
            badgeType === 'success',
          'bg-[#FFB017]/10 border border-[#FFB017]/20 text-[#FFB017]':
            badgeType === 'warning',
        }"
      >
        {{ badgeText }}
      </span>
    </div>
  </div>
</template>
