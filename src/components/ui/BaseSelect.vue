<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const model = defineModel();

const { locale } = useI18n();

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
});

const displayValue = computed(() => {
  const selected = props.options.find(
    (opt) => opt[props.optionValue] === model.value,
  );

  return selected?.[props.optionLabel]?.[locale.value] ?? props.placeholder;
});
</script>

<template>
  <div class="flex items-center gap-2">
    <span v-if="label" class="text-gray-400 text-sm whitespace-nowrap">
      {{ label }}
    </span>

    <Listbox v-model="model" as="div" class="relative">
      <ListboxButton
        class="flex items-center justify-between text-sm bg-[#141b2e]/60 border border-gray-700/50 rounded-full px-4 py-2 hover:bg-[#1c253d] transition-colors w-full min-w-[100px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
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
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-50 mt-2 max-h-60 min-w-full overflow-auto rounded-xl bg-[#0c1427] border border-gray-700 py-1 shadow-lg shadow-black/50 focus:outline-none backdrop-blur-md"
        >
          <ListboxOption
            v-for="option in options"
            :key="option[optionValue]"
            :value="option[optionValue]"
            v-slot="{ active, selected }"
            as="template"
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
                {{ option[optionLabel]?.[locale] }}
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>
