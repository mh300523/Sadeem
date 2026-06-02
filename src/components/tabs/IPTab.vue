<script setup>
import { useI18n } from "vue-i18n";

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
  <div>this ip tab</div>
</template>
