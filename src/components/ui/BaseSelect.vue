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
  <div class="flex items-center gap-2 w-full md:w-auto">
    <span v-if="label" class="text-gray-400 text-sm whitespace-nowrap">
      {{ label }}
    </span>

    <Listbox v-model="model" as="div" class="relative w-full">
      <ListboxButton
        class="flex items-center justify-between cursor-pointer min-w-25 w-full md:w-auto"
        :class="
          buttonClass
            ? buttonClass
            : ' bg-[#162239] border border-white/10 px-4 py-2 rounded-full'
        "
      >
        <slot
          name="trigger"
          :selected-option="selectedOption"
          :display-value="displayValue"
        >
          <span class="font-normal text-[#F0F9FF] truncate">
            {{ displayValue }}
          </span>

          <svg
            class="w-4 h-4 ms-2 text-white shrink-0"
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
        </slot>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="
            optionsClass ||
            'absolute z-50 mt-2 max-h-60 min-w-full overflow-auto rounded-xl bg-[#0c1427] border border-gray-700 py-1 shadow-lg shadow-black/50 focus:outline-none backdrop-blur-md'
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
                  active ? 'bg-blue-600/30 text-blue-400' : 'text-gray-300',
                  'cursor-pointer select-none py-2 px-4 rtl:text-right transition-colors whitespace-nowrap',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-bold text-white' : 'font-normal',
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
