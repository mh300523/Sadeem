<script setup>
const props = defineProps({
  series: {
    type: Array,
    required: true,
  },
});

const data = props.series?.[0]?.data ?? [];
</script>

<template>
  <div class="grid grid-cols-3 h-85 gap-4">
    <div
      v-for="(item, index) in data"
      :key="item.x"
      class="rounded-lg p-4 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
      :style="{
        backgroundColor: item.fillColor,
        gridRow: index === 0 ? '1 / 3' : index === 3 ? '2 / 4' : 'auto',
      }"
    >
      <span class="text-[10px] text-white">
        {{ item.x }}
      </span>

      <span class="text-base font-bold text-white">
        {{ item.y }}
      </span>
    </div>
  </div>
</template>
