<script setup>
  import { computed, reactive } from 'vue'

  import { TextInput, BaseButton } from '@/components'
  import { useValidation } from '@/composables'

  const emit = defineEmits(['prev', 'next'])

  const { validator, validateRequired, validateCpf, validateDate } =
    useValidation()

  const form = defineModel()
  const errors = reactive({
    name: '',
    cpf: '',
    birthdate: '',
    phone: '',
  })

  const hasErrors = computed(
    () =>
      errors.name !== '' ||
      errors.cpf !== '' ||
      errors.birthdate !== '' ||
      errors.phone !== '',
  )

  const handleSubmit = () => {
    errors.name = validator([validateRequired(form.value.name)])
    errors.cpf = validator([
      validateRequired(form.value.cpf),
      validateCpf(form.value.cpf),
    ])
    errors.birthdate = validator([
      validateRequired(form.value.birthdate),
      validateDate(form.value.birthdate),
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
      label="Nome"
      :error="errors.name"
    />
    <TextInput
      v-model="form.cpf"
      :class="$style.field"
      label="CPF"
      :error="errors.cpf"
    />
    <TextInput
      v-model="form.birthdate"
      :class="$style.field"
      label="Data de nascimento"
      type="date"
      :error="errors.birthdate"
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
