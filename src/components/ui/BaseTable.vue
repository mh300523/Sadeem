<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  tableClass: {
    type: String,
    default: "min-w-[1250px]",
  },
});
</script>

<template>
  <div
    class="w-full overflow-x-auto rounded-[24px] border border-[#1e293b]/30 bg-[#060e1d]/50 p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl custom-scrollbar"
  >
    <table
      class="w-full border-separate border-spacing-y-3 text-start"
      :class="tableClass"
    >
      <thead>
        <tr class="text-slate-400 text-xs font-medium">
          <th
            v-for="header in headers"
            :key="header.key"
            class="pb-2 px-4 font-medium tracking-wide"
            :class="[
              header.align === 'center' ? 'text-center' : 'text-start',
              header.class,
            ]"
          >
            <!-- Slot for custom header rendering -->
            <slot :name="`header(${header.key})`" :header="header">
              {{ header.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="item.id || index"
          class="group transition-all duration-300 hover:translate-y-[-1px]"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="py-4 px-4 bg-[#0d1b34]/35 group-hover:bg-[#122548]/55 border-y border-[#1e293b]/30 group-hover:border-[#334155]/50 first:border-s first:rounded-s-2xl last:border-e last:rounded-e-2xl transition-all duration-300"
            :class="[
              header.align === 'center' ? 'text-center' : 'text-start',
              header.cellClass,
            ]"
          >
            <!-- Slot for custom cell rendering -->
            <slot
              :name="`cell(${header.key})`"
              :item="item"
              :value="item[header.key]"
              :index="index"
            >
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Custom styled premium scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(2, 20, 45, 0.15);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.4);
}
</style>
