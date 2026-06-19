<script setup>
import { computed } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import BaseBox from "@/components/ui/BaseBox.vue";

import { getTabComponent, getTabIconPath } from "@/registry/tabRegistry";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },

  activeTab: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  "update:activeTab",
  "merge-request",
  "duplicate-status-change",
  "link-project",
  "execution-plan-change",
  "view-idea",
]);

const activeTabClass = "bg-[#8B5CF6] text-theme-text";

const inactiveTabClass =
  "bg-[#8B5CF6]/10 text-theme-text/70 hover:bg-[#8B5CF6] hover:text-theme-text";

const selectedIndex = computed(() => {
  const index = props.tabs.findIndex((tab) => tab.key === props.activeTab);

  return index !== -1 ? index : 0;
});

const resolvedTabs = computed(() =>
  props.tabs.map((tab) => ({
    ...tab,
    component: getTabComponent(tab.key),
    iconPath: getTabIconPath(tab.icon),
  })),
);

function handleTabChange(index) {
  const targetTab = props.tabs[index];

  if (targetTab) {
    emit("update:activeTab", targetTab.key);
  }
}
</script>

<template>
  <TabGroup
    :selectedIndex="selectedIndex"
    @change="handleTabChange"
    as="div"
    class="flex flex-col"
  >
    <div class="overflow-x-auto custom-scrollbar px-6">
      <TabList class="flex flex-wrap gap-3.5 min-w-max">
        <Tab
          v-for="tab in resolvedTabs"
          :key="tab.key"
          v-slot="{ selected }"
          as="template"
        >
          <button
            class="flex items-center gap-2 px-4 py-2.5 rounded-t-[10px] text-xs md:text-sm transition-all duration-300 cursor-pointer focus:outline-none"
            :class="selected ? activeTabClass : inactiveTabClass"
          >
            <SvgIcon :name="tab.iconPath" classes="text-gray-300" />
            <span>
              {{ $t(tab.label) }}
            </span>
          </button>
        </Tab>
      </TabList>
    </div>

    <TabPanels>
      <BaseBox class="rounded-[20px] p-6 white-border">
        <TabPanel v-for="tab in resolvedTabs" :key="tab.key" :unmount="true">
          <component
            :is="tab.component"
            :data="tab.data"
            @merge-request="emit('merge-request', $event)"
            @duplicate-status-change="emit('duplicate-status-change', $event)"
            @link-project="emit('link-project', $event)"
            @execution-plan-change="emit('execution-plan-change', $event)"
            @view-idea="emit('view-idea', $event)"
          />
        </TabPanel>
      </BaseBox>
    </TabPanels>
  </TabGroup>
</template>

<style scoped>
button:hover :deep(svg [fill]),
button[aria-selected="true"] :deep(svg [fill]) {
  fill: #fff !important;
}

button:hover :deep(svg [stroke]),
button[aria-selected="true"] :deep(svg [stroke]) {
  stroke: #fff !important;
}

button :deep(svg [fill]),
button :deep(svg [stroke]) {
  transition:
    fill 0.25s ease,
    stroke 0.25s ease;
}
</style>
