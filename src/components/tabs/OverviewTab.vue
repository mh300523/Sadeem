<script setup>
import { computed } from "vue";
import OwnerCard from "@/components/tabsBlocks/OwnerCard.vue";
import BaseTagList from "@/components/ui/BaseTagList.vue";
import AttachmentsList from "@/components/tabsBlocks/AttachmentsList.vue";
import DetailsGrid from "@/components/tabsBlocks/DetailsGrid.vue";
import BaseBox from "@/components/ui/BaseBox.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

// Local fallback computation for the owner details card (removing mapper coupling)
const ownerData = computed(() => {
  const owner = props.data?.sidebar?.owner || {};
  return {
    ...owner,
    name: owner.name || props.data?.ideaSubmitter || "",
  };
});
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Right Content Area -->
    <div class="lg:col-span-9">
      <!-- Idea Explanation Card -->
      <BaseBox class="rounded-[20px] p-6 mb-6 white-border">
        <h3 class="text-xs text-white-50 uppercase tracking-wider mb-1">
          {{ data?.overview?.explanation?.label }}
        </h3>
        <p
          class="text-white text-xs md:text-sm leading-relaxed text-justify font-normal"
        >
          {{ data?.overview?.explanation?.text }}
        </p>
      </BaseBox>

      <!-- Idea Details Grid -->
      <DetailsGrid :data="data?.overview?.details" />
    </div>
    <!-- Left Sidebar (Presenter and Team Details) -->
    <div class="lg:col-span-3">
      <BaseBox class="rounded-[20px] p-3 white-border">
        <OwnerCard :data="ownerData" />

        <!-- Team Members Section -->
        <div class="border-b border-[#A9A9A9]/40 border-dashed">
          <h4 class="text-white/50 text-xs tracking-wide uppercase mb-3">
            {{ data?.sidebar?.team?.label }}
          </h4>

          <div
            v-for="(member, idx) in data?.sidebar?.team?.members"
            :key="idx"
            class="flex items-center justify-between border border-white/6 rounded-xl p-[10px] text-white text-sm backdrop-blur-xl mb-3"
          >
            <span>{{ member }}</span>
            <span
              class="w-5 h-5 flex items-center justify-center text-white text-xs border border-white rounded-full p-1.5 shrink-0"
            >
              {{ idx + 1 }}
            </span>
          </div>
        </div>

        <BaseTagList
          :label="data?.sidebar?.targetAudience?.label || ''"
          :items="data?.sidebar?.targetAudience?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#FF6B35]/10 text-white/76',
            icon: 'border-[#FF6B35] text-[#FF6B35]',
          }"
        />

        <BaseTagList
          :label="data?.sidebar?.sector?.label || ''"
          :items="data?.sidebar?.sector?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#3B82F6]/10 text-white/76',
            icon: 'border-[#3B82F6] text-[#3B82F6]',
          }"
        />

        <BaseTagList
          :label="data?.sidebar?.technologies?.label || ''"
          :items="data?.sidebar?.technologies?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#8B5CF6]/10 text-white/76',
            icon: 'border-[#8B5CF6] text-[#8B5CF6]',
          }"
        />

        <BaseTagList
          :label="data?.sidebar?.impact?.label || ''"
          :items="data?.sidebar?.impact?.items"
          class="border-b border-[#A9A9A9]/40 border-dashed"
          :classes="{
            pill: 'bg-[#06B6D4]/10 text-white/76',
            icon: 'border-[#06B6D4] text-[#06B6D4]',
          }"
        />

        <!-- Readiness Level Section -->
        <div class="flex items-center justify-between py-3">
          <span class="text-white/50 text-xs tracking-wide uppercase">
            {{ data?.sidebar?.readiness?.label }}
          </span>
          <span
            class="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#FF6B35] text-white"
          >
            {{ data?.sidebar?.readiness?.value }}
          </span>
        </div>
      </BaseBox>

      <AttachmentsList
        :label="data?.sidebar?.attachments?.label || ''"
        :files="data?.sidebar?.attachments?.files"
      />
    </div>
  </div>
</template>

<style scoped></style>
