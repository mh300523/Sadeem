<template>
  <div class="w-full" :class="attrs.class" :style="attrs.style">
    <label
      v-if="label"
      :for="inputId"
      class="block text-xs font-bold mb-1.5 text-theme-text/95 transition-colors duration-300 text-right"
    >
      <span v-if="required" class="text-red-500">*</span>
      {{ label }}
    </label>
    <div class="relative overflow-hidden w-full">
      <!-- Prefix Slot -->
      <div
        v-if="$slots.prefix"
        class="absolute inset-s-3 top-1/2 -translate-y-1/2 text-theme-text/40 z-10 flex items-center justify-center"
        :class="{
          'pointer-events-none': [
            'date',
            'time',
            'datetime-local',
            'month',
            'week',
          ].includes(type),
        }"
      >
        <slot name="prefix" />
      </div>

      <!-- Main Input element -->
      <input
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        v-bind="inputAttrs"
        :class="[
          inputClasses,
          $slots.prefix ? 'ps-10' : '',
          $slots.suffix ? 'pe-10' : '',
        ]"
        @input="handleInput"
        @keydown="handleKeydown"
        @blur="handleBlur"
        @focus="handleFocus"
        @click="handleInputClick"
      />

      <!-- Suffix Slot -->
      <div
        v-if="$slots.suffix"
        class="absolute inset-e-3 top-1/2 -translate-y-1/2 text-theme-text/40 z-10 flex items-center justify-center"
        :class="{
          'pointer-events-none': [
            'date',
            'time',
            'datetime-local',
            'month',
            'week',
          ].includes(type),
        }"
      >
        <slot name="suffix" />
      </div>
    </div>

    <!-- Error Text -->
    <p v-if="error" class="mt-1 text-xs font-semibold text-red-500 text-right">
      {{ error }}
    </p>
    <!-- Hint Text -->
    <p
      v-if="hint && !error"
      class="mt-1 text-[11px] text-theme-text/40 text-right"
    >
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
  type: {
    type: String,
    default: "text",
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
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  phoneField: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const isFocused = ref(false);

const generatedId = `input-${Math.random().toString(36).slice(2, 11)}`;
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
    "w-full block bg-theme-input text-theme-input-text placeholder-theme-input-placeholder focus:outline-none transition-all duration-300 disabled:cursor-not-allowed peer border";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-4 py-2.5 text-xs rounded-xl",
    lg: "px-5 py-3.5  rounded-xl",
  };

  const stateClasses = props.error
    ? "border-red-500/30 focus:border-red-500"
    : "border-theme-input-border focus:border-[#05D989]/50";

  const phoneFieldClasses = props.phoneField ? "rounded-r-none" : "";
  const placeholderClasses = "placeholder:text-right";

  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    phoneFieldClasses,
    placeholderClasses,
  ]
    .filter(Boolean)
    .join(" ");
});

const handleInput = (event) => {
  let value = event.target.value;

  if (props.type === "tel") {
    const numericValue = value.replace(/\D/g, "");

    if (numericValue !== value) {
      value = numericValue;
      event.target.value = numericValue;
    }
  }

  if (props.type === "number") {
    // Allow only digits and optional decimal point
    value = value.replace(/[^0-9.]/g, "");

    // Prevent multiple dots
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    event.target.value = value;

    // Handle min constraint
    const rawMin = attrs.min;
    const hasMin = rawMin !== undefined && rawMin !== null && rawMin !== "";
    const min = hasMin ? Number(rawMin) : null;

    const num = Number(value);
    if (value !== "" && !Number.isNaN(num) && min !== null && num < min) {
      value = String(min);
      event.target.value = value;
    }
  }

  emit("update:modelValue", value);
};

const handleKeydown = (event) => {
  if (props.type !== "number") return;

  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
  ];

  // Allow control/navigation keys
  if (allowedKeys.includes(event.key)) return;

  // Allow: numbers
  if (/^[0-9]$/.test(event.key)) return;

  // Allow one decimal point
  if (event.key === "." && !event.target.value.includes(".")) return;

  // Handle negative numbers based on min
  const rawMin = attrs.min;
  const hasMin = rawMin !== undefined && rawMin !== null && rawMin !== "";
  const min = hasMin ? Number(rawMin) : null;

  if (
    event.key === "-" &&
    (!hasMin || (min !== null && min < 0)) &&
    event.target.selectionStart === 0 &&
    !event.target.value.includes("-")
  ) {
    return;
  }

  // Block everything else
  event.preventDefault();
};

const handleInputClick = (event) => {
  if (
    ["date", "time", "datetime-local", "month", "week"].includes(props.type)
  ) {
    try {
      if (typeof event.target.showPicker === "function") {
        event.target.showPicker();
      }
    } catch (e) {
      console.warn("showPicker is not supported or failed:", e);
    }
  }
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

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator,
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="datetime-local"]::-webkit-calendar-picker-indicator,
input[type="month"]::-webkit-calendar-picker-indicator,
input[type="week"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  z-index: 1;
  opacity: 0;
}
</style>
