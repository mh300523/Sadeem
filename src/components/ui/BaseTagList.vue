<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },

  items: {
    type: Array,
    default: () => [],
  },

  classes: {
    type: Object,
    default: () => ({
      pill: "",
      icon: "",
    }),
  },
});
</script>

<template>
  <div class="py-3">
    <h4 v-if="label" class="text-white-50 text-xs tracking-wide uppercase mb-3">
      {{ label }}
    </h4>

    <ul class="flex flex-wrap gap-2">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm"
        :class="classes.pill"
      >
        <span
          class="w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0"
          :class="classes.icon"
        >
          <svg
            class="w-2.5 h-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>

        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
