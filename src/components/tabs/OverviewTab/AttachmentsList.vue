<script setup>
import SvgIcon from "@/components/ui/SvgIcon.vue";
defineProps({
  label: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#FF8E53] to-[#FF6B35] p-[14px] rounded-[20px] mt-6"
  >
    <h4 class="text-theme-text/50 text-xs tracking-wide uppercase mb-1">
      {{ label }}
    </h4>

    <a
      v-for="(file, idx) in files"
      :key="idx"
      :href="file.url"
      :download="file.name"
      target="_blank"
      class="flex items-center justify-between px-3 py-1 rounded-full bg-white/10 mb-[14px] last:mb-0"
    >
      <div class="flex items-center justify-between w-100">
        <h4
          class="text-theme-text text-base font-medium truncate"
          :title="file.name"
        >
          {{ file.name }}
        </h4>
        <!-- Cloud download icon on left -->
        <SvgIcon name="solar_cloud-download-outline" />
      </div>
    </a>
  </div>
</template>
