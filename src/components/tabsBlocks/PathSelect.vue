<script setup>
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import BaseBox from "@/components/ui/BaseBox.vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "",
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
  <!-- Content padding container -->
  <BaseBox class="gradient-border p-6 !backdrop-blur-none">
    <!-- Header Title -->
    <h4
      class="text-white text-xs md:text-sm font-medium uppercase tracking-wider mb-3"
    >
      {{ label }}
    </h4>

    <!-- Headless UI Listbox -->
    <Listbox
      :modelValue="modelValue"
      @update:modelValue="(val) => emit('update:modelValue', val)"
      as="div"
      class="relative"
    >
      <ListboxButton
        class="w-full flex items-center justify-between p-4 rounded-xl gradient-border rtl:bg-gradient-to-bl ltr:bg-gradient-to-br from-[#895AF7]/30 via-[#06B6D4]/10 to-[#503591]/0"
      >
        <!-- Selected Item content on the right (in RTL) -->
        <div v-if="selectedItem" class="text-right flex-1 pr-2">
          <h4 class="text-white text-sm font-medium">
            {{ selectedItem.title }}
          </h4>
          <p class="text-xs text-white/60 mt-0.5 leading-relaxed">
            {{ selectedItem.subtitle }}
          </p>
        </div>

        <!-- Arrow toggle button on the left (in RTL) -->
        <span
          class="w-6 h-6 rounded-md bg-[#D9D9D9]/16 flex items-center justify-center text-white"
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
      </ListboxButton>

      <transition
        leave-active-class="transition duration-150 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="!absolute w-full rounded-xl border border-[#895AF7]/42 bg-[#1E293B]/70 backdrop-blur-xl overflow-hidden z-50 mt-2"
        >
          <div class="max-h-90 overflow-y-auto custom-scrollbar">
            <ListboxOption
              v-for="item in items"
              :key="item.key"
              :value="item.key"
              v-slot="{ active, selected }"
              as="template"
            >
              <li
                class="cursor-pointer py-5 px-[14px] border-b border-[#A9A9A9] last:border-b-0 overflow-hidden"
              >
                <h4 class="font-semibold text-white text-sm truncate">
                  {{ item.title }}
                </h4>
                <p class="text-xs text-white/60 mt-1 truncate">
                  {{ item.subtitle }}
                </p>
              </li>
            </ListboxOption>
          </div>
        </ListboxOptions>
      </transition>
    </Listbox>
  </BaseBox>
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
