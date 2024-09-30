<script setup>
  import { computed, reactive } from 'vue'

  import { useValidation } from '@/composables'
  import { TextInput, BaseButton } from '@/components'

  const emit = defineEmits(['next', 'prev'])

  const { validator, validateRequired, validateMinLength } = useValidation()

  const form = defineModel()
  const errors = reactive({
    password: '',
  })

  const hasErrors = computed(() => errors.password !== '')

  const handleSubmit = () => {
    errors.password = validator([
      validateRequired(form.value.password),
      validateMinLength(form.value.password, 8),
    ])

    if (hasErrors.value) {
      return
    }

    emit('next')
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      v-model="form.password"
      label="Sua senha"
      type="password"
      :error="errors.password"
      :class="$style.field"
    />
    <div :class="$style.actionContainer">
      <BaseButton design="outlined" @click="$emit('prev')"> Voltar </BaseButton>
      <BaseButton type="submit"> Continuar </BaseButton>
    </div>
  </form>
</template>

<style lang="scss" module>
  .field {
    margin-bottom: 16px;
  }

  .actionContainer {
    display: flex;
    gap: 8px;
    margin-top: 32px;
  }
</style>
