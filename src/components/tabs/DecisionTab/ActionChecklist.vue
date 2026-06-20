<script setup>
import BaseCheckableCard from "@/components/ui/BaseCheckableCard.vue";

const modelValue = defineModel({
  type: Object,
  required: true,
});

defineProps({
  title: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  groups: {
    type: Array,
    default: () => [],
  },
});

const handleGroupUpdate = (group, val) => {
  group.items.forEach((item) => {
    modelValue.value[item.id] = val;
  });
};

const toggleItem = (group, item) => {
  const nextValue = !modelValue.value[item.id];
  modelValue.value[item.id] = nextValue;

  const anyChecked = group.items.some((child) => modelValue.value[child.id]);
  modelValue.value[group.id] = anyChecked;
};
</script>

<template>
  <div class="mb-6">
    <h4
      v-if="title"
      class="text-theme-text text-xs md:text-sm font-medium mb-3.5"
    >
      {{ title }}
    </h4>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Standard Items (rendered if props.items exists) -->
      <BaseCheckableCard
        v-for="item in items"
        :key="item.id"
        v-model="modelValue[item.id]"
        :title="item.label"
        :subtitle="item.desc"
      />

      <!-- Groups / Hierarchical Items (rendered if props.groups exists) -->
      <BaseCheckableCard
        v-for="group in groups"
        :key="group.id"
        v-model="modelValue[group.id]"
        :title="group.label"
        @update:modelValue="(val) => handleGroupUpdate(group, val)"
      >
        <!-- Indented List of Child Checkboxes inside default slot -->
        <div class="flex flex-col gap-2 ps-6 sm:ps-10 mt-3">
          <div
            v-for="item in group.items"
            :key="item.id"
            @click="toggleItem(group, item)"
            class="flex items-center gap-3 cursor-pointer select-none group/item"
          >
            <!-- Sub-Checkbox Square -->
            <span
              class="w-4 h-4 sm:w-5 sm:h-5 shrink-0 rounded-[4px] flex items-center justify-center transition-all duration-300"
              :class="
                modelValue[item.id]
                  ? 'bg-[#10B981] text-theme-text'
                  : 'bg-white/5 text-transparent border border-white/10 group-hover/item:border-white/20'
              "
            >
              <svg
                class="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span
              class="text-theme-text/80 transition-colors group-hover/item:text-theme-text"
            >
              {{ item.label }}
            </span>
          </div>
        </div>
      </BaseCheckableCard>
    </div>
  </div>
</template>
