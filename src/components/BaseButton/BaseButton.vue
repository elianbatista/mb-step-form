<script setup>
  defineProps({
    type: {
      type: String,
      default: 'button',
      validator: (value) => {
        return ['button', 'submit'].includes(value)
      },
    },
    design: {
      type: String,
      default: 'solid',
      validator: (value) => {
        return ['solid', 'outlined'].includes(value)
      },
    },
  })
</script>

<template>
  <button
    :class="[$style.button, design === 'outlined' && $style.outlined]"
    :type="type"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
  .button {
    background-color: var(--primary-color);
    border: none;
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    border: 1px solid var(--primary-color);
    cursor: pointer;

    &.outlined {
      background-color: #fff;
      color: var(--primary-color);
    }
  }
</style>
