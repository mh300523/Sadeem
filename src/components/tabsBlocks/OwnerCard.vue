<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({ label: "", name: "" }),
  },
});
</script>

<template>
  <div
    class="bg-[url('@/assets/images/presenter-idea.bg.png')] bg-cover bg-center bg-no-repeat h-[180px] rounded-2xl overflow-hidden mb-3 flex items-center p-[34px]"
  >
    <!-- Presenter Info text on the Right -->
    <div class="">
      <h4 class="text-white-50 text-xs mb-0.5">
        {{ data.label }}
      </h4>
      <p class="text-white text-xl font-bold">
        {{ data.name }}
      </p>
    </div>
  </div>
</template>
