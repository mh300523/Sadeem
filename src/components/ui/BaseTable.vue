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
    default: "",
  },
  headerClass: {
    type: String,
    default: "border-b border-theme-border",
  },
  rowClass: {
    type: String,
    default: "border-b border-theme-border/30 last:border-b-0",
  },
  cellClass: {
    type: String,
    default: " ",
  },
});
</script>

<template>
  <div class="w-full overflow-x-auto rounded-[24px]">
    <table class="w-full" :class="tableClass">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            class="p-3 font-normal text-xs text-theme-text/70 text-start whitespace-nowrap min-w-[110px]"
            :class="headerClass"
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
          class="group"
          :class="rowClass"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            class="p-3 transition-all duration-300"
            :class="cellClass"
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
