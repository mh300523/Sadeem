<script setup>
const modelValue = defineModel({
  type: Array,
  default: () => [],
});

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    default: "pills",
  },
  optionLabel: {
    type: String,
    default: "label",
  },
  optionValue: {
    type: String,
    default: "value",
  },
});

const toggleOption = (val) => {
  if (modelValue.value.includes(val)) {
    modelValue.value = modelValue.value.filter((v) => v !== val);
  } else {
    modelValue.value = [...modelValue.value, val];
  }
};
</script>

<template>
  <div class="flex items-center" :class="variant === 'pills' ? 'flex-wrap gap-2' : 'gap-4'">
    <!-- Pills Variant -->
    <template v-if="variant === 'pills'">
      <button
        v-for="opt in options"
        :key="opt[optionValue]"
        type="button"
        @click="toggleOption(opt[optionValue])"
        class="px-4.5 py-1.5 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all duration-300 focus:outline-none"
        :class="
          modelValue.includes(opt[optionValue])
            ? 'bg-[#018AAF] text-white'
            : 'bg-[#018AAF]/16 text-[#33BCE1]'
        "
      >
        <slot name="label" :option="opt" :checked="modelValue.includes(opt[optionValue])">
          {{ opt[optionLabel] }}
        </slot>
      </button>
    </template>

    <!-- Check Variant -->
    <template v-else-if="variant === 'check'">
      <div
        v-for="opt in options"
        :key="opt[optionValue]"
        @click="toggleOption(opt[optionValue])"
        class="flex items-center gap-2.5 text-xs text-white cursor-pointer focus:outline-none"
      >
        <span
          class="w-5 h-5 rounded-sm flex items-center justify-center transition-all duration-300 border border-transparent"
          :class="
            modelValue.includes(opt[optionValue])
              ? `${opt.activeClass || 'bg-[#10B981]'} text-white`
              : 'bg-[#D9D9D9]/16 text-transparent border-white/10 hover:border-white/20'
          "
        >
          <svg class="w-4 h-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span>
          <slot name="label" :option="opt" :checked="modelValue.includes(opt[optionValue])">
            {{ opt[optionLabel] }}
          </slot>
        </span>
      </div>
    </template>
  </div>
</template>
