<script setup>
import { computed } from "vue";
import OwnerCard from "@/components/tabsBlocks/OwnerCard.vue";
import BaseTagList from "@/components/ui/BaseTagList.vue";
import AttachmentsList from "@/components/tabsBlocks/AttachmentsList.vue";
import DetailsGrid from "@/components/tabsBlocks/DetailsGrid.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ sidebar: {}, overview: {} }),
  },
});

const sidebarData = computed(() => props.data?.sidebar ?? {});
const overviewData = computed(() => props.data?.overview ?? {});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Content Area -->
    <div class="lg:col-span-9">
      <!-- Idea Explanation Card -->
      <div
        class="border border-white/10 rounded-[20px] p-6 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl mb-6"
      >
        <h3 class="text-xs text-white-50 uppercase tracking-wider mb-1">
          {{ overviewData.explanation?.label }}
        </h3>
        <p
          class="text-white text-xs md:text-sm leading-relaxed text-justify font-normal"
        >
          {{ overviewData.explanation?.text }}
        </p>
      </div>

      <!-- Idea Details Grid -->
      <DetailsGrid :data="overviewData.details" />
    </div>
    <!-- Left Sidebar (Presenter and Team Details) -->
    <div class="lg:col-span-3">
      <div
        class="border border-white/10 rounded-[20px] p-3 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl"
      >
        <OwnerCard :data="sidebarData.owner" />

        <!-- Team Members Section -->
        <div class="border-b border-[#A9A9A9]/40 border-dashed">
          <h4 class="text-white/50 text-xs tracking-wide uppercase mb-3">
            {{ sidebarData.team?.label }}
          </h4>

          <div
            v-for="(member, idx) in sidebarData.team?.members"
            :key="idx"
            class="flex items-center justify-between border border-white/6 rounded-xl p-[10px] text-white text-sm backdrop-blur-xl mb-3"
          >
            <span>{{ member }}</span>
            <span
              class="w-5 h-5 flex items-center justify-center text-white text-xs border border-white rounded-full p-1.5 shrink-0"
            >
              {{ idx === 0 ? "1" : idx === 1 ? "2" : "3" }}
            </span>
          </div>
        </div>

        <BaseTagList
          :label="sidebarData.targetAudience?.label || ''"
          :items="sidebarData.targetAudience?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#FF6B35]/10 text-white/76',
            icon: 'border-[#FF6B35] text-[#FF6B35]',
          }"
        />

        <BaseTagList
          :label="sidebarData.sector?.label || ''"
          :items="sidebarData.sector?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#3B82F6]/10 text-white/76',
            icon: 'border-[#3B82F6] text-[#3B82F6]',
          }"
        />

        <BaseTagList
          :label="sidebarData.technologies?.label || ''"
          :items="sidebarData.technologies?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#8B5CF6]/10 text-white/76',
            icon: 'border-[#8B5CF6] text-[#8B5CF6]',
          }"
        />

        <BaseTagList
          :label="sidebarData.impact?.label || ''"
          :items="sidebarData.impact?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#06B6D4]/10 text-white/76',
            icon: 'border-[#06B6D4] text-[#06B6D4]',
          }"
        />

        <!-- Readiness Level Section -->
        <div class="flex items-center justify-between py-3">
          <span class="text-white/50 text-xs tracking-wide uppercase mb-3">
            {{ sidebarData.readiness?.label }}
          </span>
          <span
            class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FF6B35] text-white"
          >
            {{ sidebarData.readiness?.value }}
          </span>
        </div>
      </div>

      <AttachmentsList
        :label="sidebarData.attachments?.label || ''"
        :files="sidebarData.attachments?.files"
      />
    </div>
  </div>
</template>

<style scoped></style>
