<script setup>
import { ref } from "vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

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

const isExpanded = ref(true);

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

function selectPath(key) {
  emit("update:modelValue", key);
}
</script>

<template>
  <div
    class="border-subtle rounded-[20px] p-4 sm:p-6 rtl:bg-linear-to-l ltr:bg-linear-to-r from-theme-row-start to-theme-row-end backdrop-blur-xl"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-theme-text text-base md:text-lg font-bold">
        {{ label }}
      </h3>
      <!-- Toggle Button -->
      <button
        @click="toggleExpanded"
        class="w-8 h-8 rounded-lg bg-theme-text/5 border border-theme-border/30 flex items-center justify-center text-theme-text/70 hover:text-theme-text hover:bg-theme-text/10 transition-all cursor-pointer focus:outline-none"
      >
        <span
          class="transform transition-transform duration-300"
          :class="{ 'rotate-180': !isExpanded }"
        >
          ▲
        </span>
      </button>
    </div>

    <!-- Paths List -->
    <div
      class="transition-all duration-500 overflow-hidden flex flex-col gap-3"
      :class="
        isExpanded
          ? 'max-h-[800px] opacity-100'
          : 'max-h-0 opacity-0 pointer-events-none'
      "
    >
      <div
        v-for="path in items"
        :key="path.key"
        @click="selectPath(path.key)"
        class="p-4 rounded-xl border transition-all duration-300 cursor-pointer text-right group"
        :class="
          modelValue === path.key
            ? 'border-theme-accent-secondary bg-theme-accent-secondary-bg shadow-[0_0_15px_rgba(2,132,199,0.15)]'
            : 'border-theme-border/20 bg-theme-text/2 hover:border-theme-border/40 hover:bg-theme-text/5'
        "
      >
        <h4
          class="text-sm font-bold transition-colors"
          :class="
            modelValue === path.key
              ? 'text-theme-accent-secondary'
              : 'text-theme-text group-hover:text-theme-accent-secondary'
          "
        >
          {{ path.title }}
        </h4>
        <p class="text-xs text-theme-text/50 mt-1 leading-relaxed">
          {{ path.subtitle }}
        </p>
      </div>
    </div>

    <!-- Collapsed Summary View (shows selected only when collapsed) -->
    <div
      v-if="!isExpanded"
      class="p-4 rounded-xl border border-theme-accent-secondary bg-theme-accent-secondary-bg text-right"
    >
      <div
        v-for="path in items.filter((p) => p.key === modelValue)"
        :key="path.key"
      >
        <h4 class="text-sm font-bold text-theme-accent-secondary">
          {{ path.title }}
        </h4>
        <p class="text-xs text-theme-text/50 mt-1">
          {{ path.subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Standard RTL-friendly alignments are handled via tailwind classes like text-right */
</style>
