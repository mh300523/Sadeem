<template>
  <div class="w-full" :class="attrs.class" :style="attrs.style">
    <label
      v-if="label"
      :for="inputId"
      class="block text-xs font-bold mb-1.5 text-white/95 transition-colors duration-300"
    >
      <span v-if="required" class="text-red-500">*</span>
      {{ label }}
    </label>
    <div class="relative overflow-hidden">
      <textarea
        :id="inputId"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :rows="rows"
        v-bind="inputAttrs"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      ></textarea>

      <!-- Premium focus animation line (expanding from center) -->
    </div>

    <!-- Error Text -->
    <p v-if="error" class="mt-1 text-xs font-semibold text-red-500">
      {{ error }}
    </p>
    <!-- Hint Text -->
    <p v-if="hint && !error" class="mt-1 text-[11px] text-white/40">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, useAttrs } from "vue";
import { useI18n } from "vue-i18n";

defineOptions({ inheritAttrs: false });

const { locale } = useI18n();
const attrs = useAttrs();

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 4,
  },
  inputClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const isFocused = ref(false);

const generatedId = `textarea-${Math.random().toString(36).slice(2, 11)}`;
const inputId = computed(() => (attrs.id ? String(attrs.id) : generatedId));

const inputAttrs = computed(() => {
  const a = { ...attrs };
  delete a.class;
  delete a.style;
  return a;
});

const inputClasses = computed(() => {
  if (props.inputClass) {
    return props.inputClass;
  }

  const baseClasses =
    "w-full block bg-[#051E2E] text-[#858585] placeholder-[#858585] focus:outline-none transition-all duration-300 disabled:cursor-not-allowed peer border resize-y";

  const stateClasses = props.error
    ? "border-red-500/30 focus:border-red-500"
    : "border-white/10 focus:border-[#05D989]/50";

  return [baseClasses, "px-4 py-3 text-sm rounded-lg", stateClasses]
    .filter(Boolean)
    .join(" ");
});

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleFocus = (event) => {
  isFocused.value = true;
  emit("focus", event);
};

const handleBlur = (event) => {
  isFocused.value = false;
  emit("blur", event);
};
</script>

<style scoped></style>
