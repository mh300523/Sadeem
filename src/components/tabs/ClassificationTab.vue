<script setup>
import { useI18n } from "vue-i18n";
import PlaceholderTab from "./PlaceholderTab.vue";

defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const { t } = useI18n();
</script>

<template>
  <div>this classification tab</div>
</template>
