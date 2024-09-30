<script setup>
  import { computed, reactive } from 'vue'

  import { TextInput, BaseButton } from '@/components'
  import { useValidation } from '@/composables'

  const emit = defineEmits(['prev', 'next'])

  const { validator, validateRequired, validateCnpj, validateDate } =
    useValidation()

  const form = defineModel()
  const errors = reactive({
    name: '',
    documentation: '',
    date: '',
    phone: '',
  })

  const hasErrors = computed(
    () =>
      errors.name !== '' ||
      errors.documentation !== '' ||
      errors.date !== '' ||
      errors.phone !== '',
  )

  const handleSubmit = () => {
    errors.name = validator([validateRequired(form.value.name)])
    errors.documentation = validator([
      validateRequired(form.value.documentation),
      validateCnpj(form.value.documentation),
    ])
    errors.date = validator([
      validateRequired(form.value.date),
      validateDate(form.value.date),
    ])
    errors.phone = validator([validateRequired(form.value.phone)])

    if (hasErrors.value) {
      return
    }

    emit('next')
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      v-model="form.name"
      :class="$style.field"
      label="Razão social"
      :error="errors.name"
    />
    <TextInput
      v-model="form.documentation"
      :class="$style.field"
      label="CNPJ"
      :error="errors.documentation"
    />
    <TextInput
      v-model="form.date"
      :class="$style.field"
      label="Data de abertura"
      type="date"
      :error="errors.date"
    />
    <TextInput
      v-model="form.phone"
      :class="$style.field"
      label="Telefone"
      :error="errors.phone"
    />
    <div :class="$style.actionContainer">
      <BaseButton design="outlined" @click="$emit('prev')"> Voltar </BaseButton>
      <BaseButton type="submit"> Continuar </BaseButton>
    </div>
  </form>
</template>

<style lang="scss" module>
  .actionContainer {
    display: flex;
    gap: 8px;
    margin-top: 32px;
  }

  .field {
    margin-bottom: 16px;
  }
</style>
