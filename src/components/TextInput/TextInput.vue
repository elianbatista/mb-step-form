<script setup>
  import { InputError } from '@/components'

  defineProps({
    label: {
      type: String,
      default: '',
    },
    field: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  })

  const model = defineModel()
</script>

<template>
  <div :class="$style.inputContainer">
    <label :for="field">{{ label }}</label>
    <input :id="field" v-model="model" :type="type" />
    <InputError v-if="error" :error="error" />
  </div>
</template>

<style lang="scss" module>
  .inputContainer {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 4px;
    }

    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #727272;

      &:focus {
        outline: none;
      }
    }
  }
</style>
