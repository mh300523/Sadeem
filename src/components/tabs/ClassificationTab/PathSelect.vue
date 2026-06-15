<script setup>
import { computed } from "vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
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

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
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

    <BaseSelect
      v-model="model"
      :options="items"
      option-value="key"
      option-label="title"
      button-class="w-full flex items-center justify-between p-4 rounded-xl gradient-border rtl:bg-gradient-to-bl ltr:bg-gradient-to-br from-[#895AF7]/30 via-[#06B6D4]/10 to-[#503591]/0"
      options-class="!absolute w-full rounded-xl border border-[#895AF7]/42 bg-[#1E293B]/70 backdrop-blur-xl overflow-hidden z-50 mt-2"
    >
      <!-- Custom Trigger Slot -->
      <template #trigger="{ selectedOption }">
        <!-- Selected Item content on the right (in RTL) -->
        <div v-if="selectedOption" class="text-right flex-1 pr-2">
          <h4 class="text-white text-sm font-medium">
            {{ selectedOption.title }}
          </h4>
          <p class="text-xs text-white/60 mt-0.5 leading-relaxed">
            {{ selectedOption.subtitle }}
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
      </template>

      <!-- Custom Option Item Slot -->
      <template #option="{ option }">
        <li
          class="cursor-pointer py-5 px-[14px] border-b border-[#A9A9A9] last:border-b-0 overflow-hidden"
        >
          <h4 class="font-semibold text-white text-sm truncate">
            {{ option.title }}
          </h4>
          <p class="text-xs text-white/60 mt-1 truncate">
            {{ option.subtitle }}
          </p>
        </li>
      </template>
    </BaseSelect>
  </BaseBox>
</template>

<style scoped></style>
