<script setup>
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const props = defineProps({
  label: {
    type: String,
    default: "مسار الابتكار",
  },
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "pathway1",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedItem = computed(() => {
  return (
    props.items.find((item) => item.key === props.modelValue) || props.items[0]
  );
});
</script>

<template>
  <div
    class="border border-white/10 rounded-[20px] p-6 bg-[#1E293B]/40 backdrop-blur-xl text-right"
  >
    <!-- Header Title -->
    <h3
      class="text-white text-xs md:text-sm text-white/50 uppercase tracking-wider mb-3"
    >
      {{ label }}
    </h3>

    <!-- Headless UI Listbox -->
    <Listbox
      :modelValue="modelValue"
      @update:modelValue="(val) => emit('update:modelValue', val)"
      as="div"
      class="relative"
    >
      <ListboxButton
        class="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-[#1E293B]/60 hover:bg-[#1E293B]/80 hover:border-white/20 transition-all duration-300 cursor-pointer focus:outline-none"
      >
        <!-- Arrow toggle button on the left (in RTL) -->
        <span
          class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg
            class="w-4 h-4 text-white/70"
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

        <!-- Selected Item content on the right (in RTL) -->
        <div v-if="selectedItem" class="text-right flex-1 pr-2">
          <h4 class="text-white text-sm font-bold">
            {{ selectedItem.title }}
          </h4>
          <p class="text-xs text-white/50 mt-0.5 leading-relaxed">
            {{ selectedItem.subtitle }}
          </p>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-50 mt-2 max-h-[400px] w-full overflow-auto rounded-xl bg-[#0c1427]/95 border border-white/10 py-1 shadow-2xl shadow-black focus:outline-none backdrop-blur-md custom-scrollbar"
        >
          <ListboxOption
            v-for="item in items"
            :key="item.key"
            :value="item.key"
            v-slot="{ active, selected }"
            as="template"
          >
            <li
              :class="[
                active || selected
                  ? 'bg-[#009DFE]/15 text-[#009DFE]'
                  : 'text-white/80',
                'cursor-pointer select-none py-3 px-5 text-right transition-colors border-b border-white/5 last:border-b-0',
              ]"
            >
              <h4
                :class="[
                  selected
                    ? 'font-bold text-[#009DFE]'
                    : 'font-semibold text-white',
                  'text-sm truncate',
                ]"
              >
                {{ item.title }}
              </h4>
              <p class="text-xs text-white/50 mt-1 truncate">
                {{ item.subtitle }}
              </p>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
