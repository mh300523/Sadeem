<script setup>
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";

const modelValue = defineModel({
  type: [String, Number, Boolean],
  default: "",
});

defineProps({
  options: {
    type: Array,
    required: true,
  },
  variant: {
    type: String,
    default: "check",
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
</script>

<template>
  <RadioGroup
    v-model="modelValue"
    class="flex items-center"
    :class="variant === 'pills' ? 'flex-wrap gap-2' : 'gap-4'"
  >
    <!-- Pills Variant -->
    <template v-if="variant === 'pills'">
      <RadioGroupOption
        v-for="opt in options"
        :key="opt[optionValue]"
        :value="opt[optionValue]"
        v-slot="{ checked }"
        as="template"
      >
        <button
          type="button"
          class="px-4.5 py-1.5 rounded-full text-xs md:text-sm font-medium cursor-pointer transition-all duration-300 focus:outline-none"
          :class="
            checked
              ? 'bg-[#018AAF] text-white'
              : 'bg-[#018AAF]/16 text-[#33BCE1]'
          "
        >
          <slot name="label" :option="opt" :checked="checked">
            {{ opt[optionLabel] }}
          </slot>
        </button>
      </RadioGroupOption>
    </template>

    <!-- Check Variant -->
    <template v-else-if="variant === 'check'">
      <RadioGroupOption
        v-for="opt in options"
        :key="opt[optionValue]"
        :value="opt[optionValue]"
        v-slot="{ checked }"
        as="template"
      >
        <div
          class="flex items-center gap-2.5 text-xs text-white cursor-pointer focus:outline-none"
        >
          <span
            class="w-5 h-5 rounded-sm flex items-center justify-center transition-all duration-300 border border-transparent"
            :class="
              checked
                ? `${opt.activeClass} text-white`
                : 'bg-[#D9D9D9]/16 text-transparent border-white/10 hover:border-white/20'
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
          <span>
            <slot name="label" :option="opt" :checked="checked">
              {{ opt[optionLabel] }}
            </slot>
          </span>
        </div>
      </RadioGroupOption>
    </template>
  </RadioGroup>
</template>
