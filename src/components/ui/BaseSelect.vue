<script setup>
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const model = defineModel();

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },

  label: {
    type: String,
    default: "",
  },

  placeholder: {
    type: String,
    default: "Select...",
  },

  optionLabel: {
    type: String,
    default: "label",
  },

  optionValue: {
    type: String,
    default: "value",
  },
  classes: {
    type: String,
    default: "",
  },

  labelClasses: {
    type: String,
    default: "",
  },

  buttonClass: {
    type: String,
    default: "",
  },

  optionsClass: {
    type: String,
    default: "",
  },
});

const selectedOption = computed(() => {
  return props.options.find((opt) => opt[props.optionValue] === model.value);
});

const displayValue = computed(() => {
  return selectedOption.value?.[props.optionLabel] ?? props.placeholder;
});
</script>

<template>
  <div
    class="w-full md:w-auto flex gap-3"
    :class="classes ? classes : 'items-center '"
  >
    <label
      v-if="label"
      class="text-theme-text/76 uppercase whitespace-nowrap"
      :class="labelClasses"
    >
      {{ label }}
    </label>

    <Listbox v-model="model" as="div" class="relative w-full">
      <ListboxButton
        class="flex items-center justify-between cursor-pointer min-w-25 w-full"
        :class="
          buttonClass
            ? buttonClass
            : ' bg-theme-input border border-theme-input-border text-theme-input-text px-4 py-2 rounded-full'
        "
      >
        <slot
          name="trigger"
          :selected-option="selectedOption"
          :display-value="displayValue"
        >
          <span class="font-normal text-theme-input-placeholder truncate">
            {{ displayValue }}
          </span>

          <!-- Arrow toggle button on the left (in RTL) -->
          <span
            class="select-arrow flex items-center justify-center text-theme-text"
          >
            <svg
              class="w-4 h-4 text-theme-text shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </slot>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-200 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-50 mt-2 max-h-100 min-w-full overflow-auto backdrop-blur-xl rounded-xl border"
          :class="
            optionsClass
              ? optionsClass
              : 'rounded-xl bg-theme-card border-theme-card-border'
          "
        >
          <ListboxOption
            v-for="option in options"
            :key="option[optionValue]"
            :value="option[optionValue]"
            v-slot="{ active, selected }"
            as="template"
          >
            <slot
              name="option"
              :option="option"
              :active="active"
              :selected="selected"
            >
              <li
                :class="[
                  active
                    ? 'bg-[#FF6B35]/70 text-theme-text'
                    : 'text-theme-text/80',
                  'cursor-pointer select-none py-2 px-4  transition-colors whitespace-nowrap',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-meduim text-theme-text' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option[optionLabel] }}
                </span>
              </li>
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>
