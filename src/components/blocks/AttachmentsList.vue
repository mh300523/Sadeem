<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  files: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <span class="text-slate-400 text-xs font-semibold tracking-wide uppercase">
      {{ label }}
    </span>
    <div class="flex flex-col gap-3">
      <a 
        v-for="(file, idx) in files" 
        :key="idx"
        href="#"
        class="flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-md w-full"
        :class="[
          idx === 0 
            ? 'bg-[#FF6B35] text-white hover:bg-orange-600' 
            : 'bg-[#EEB252] text-white hover:bg-[#dfa140]'
        ]"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <!-- Cloud download icon on left -->
          <svg class="w-5 h-5 text-white/90 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          
          <span class="text-white text-xs font-bold truncate pr-1 pl-1" :title="file.name">
            {{ file.name }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
