<script setup>
import { computed } from "vue";
import OwnerCard from "@/components/blocks/OwnerCard.vue";
import TagList from "@/components/blocks/TagList.vue";
import AttachmentsList from "@/components/blocks/AttachmentsList.vue";
import DetailsGrid from "@/components/blocks/DetailsGrid.vue";

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
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
    <!-- Right Content Area -->
    <div class="lg:col-span-9">
      <!-- Idea Explanation Card -->
      <div
        class="border border-white/10 rounded-[20px] p-6 bg-gradient-to-l from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl mb-6"
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
        class="border border-white/10 rounded-[20px] p-3 bg-gradient-to-l from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl"
      >
        <OwnerCard :data="sidebarData.owner" />

        <!-- Team Members Section -->
        <div class="flex flex-col gap-3 mb-4">
          <h4 class="text-white-50 text-xs tracking-wide uppercase">
            {{ sidebarData.team?.label }}
          </h4>
          <div class="flex flex-col gap-2.5">
            <div
              v-for="(member, idx) in sidebarData.team?.members"
              :key="idx"
              class="flex items-center justify-between border border-white/6 rounded-xl p-[10px] text-white text-sm backdrop-blur-xl"
            >
              <span>{{ member }}</span>
              <span
                class="w-5 h-5 flex items-center justify-center text-white text-xs border border-white rounded-full p-1.5 shrink-0"
              >
                {{ idx === 0 ? "1" : idx === 1 ? "2" : "3" }}
              </span>
            </div>
          </div>
        </div>

        <TagList
          :label="sidebarData.targetAudience?.label || ''"
          :items="sidebarData.targetAudience?.items"
          theme="orange"
        />

        <hr class="border-[#1e293b]/25 mb-4" />

        <TagList
          :label="sidebarData.sector?.label || ''"
          :items="sidebarData.sector?.items"
          theme="blue"
        />

        <hr class="border-[#1e293b]/25 mb-4" />

        <TagList
          :label="sidebarData.technologies?.label || ''"
          :items="sidebarData.technologies?.items"
          theme="purple"
        />

        <hr class="border-[#1e293b]/25 mb-4" />

        <TagList
          :label="sidebarData.impact?.label || ''"
          :items="sidebarData.impact?.items"
          theme="teal"
        />

        <hr class="border-[#1e293b]/25 mb-4" />

        <!-- Readiness Level Section -->
        <div class="flex items-center justify-between mb-4">
          <span
            class="text-slate-400 text-xs font-semibold tracking-wide uppercase"
          >
            {{ sidebarData.readiness?.label }}
          </span>
          <span
            class="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6B35] text-white shadow-md shadow-orange-500/20"
          >
            {{ sidebarData.readiness?.value }}
          </span>
        </div>

        <hr class="border-[#1e293b]/25 mb-4" />

        <AttachmentsList
          :label="sidebarData.attachments?.label || ''"
          :files="sidebarData.attachments?.files"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
