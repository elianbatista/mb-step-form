<script setup>
  defineProps({
    error: {
      type: String,
      default: '',
    },
  })
</script>

<template>
  <div :class="$style.error">
    {{ error }}
  </div>
</template>

<style lang="scss" module>
  .error {
    color: var(--error);
    font-size: 14px;
    margin-top: 4px;
  }
</style>
