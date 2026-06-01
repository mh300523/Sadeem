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
      class="w-full border-separate border-spacing-y-3"
      :class="tableClass"
    >
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="pb-2 px-4 font-normal text-xs text-gray-400 text-start w-[150px]"
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
          class="group rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#1E293B]/60 to-[#1E293B]/30 backdrop-blur-xl"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="p-3 border-y border-white/10 group-hover:border-white/20 first:border-s first:rounded-s-[20px] last:border-e last:rounded-e-[20px] transition-all duration-300"
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
