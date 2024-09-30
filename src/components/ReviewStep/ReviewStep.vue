<script setup>
  import { computed, reactive } from 'vue'

  import { TextInput, BaseButton } from '@/components'
  import { useValidation } from '@/composables'

  const {
    validator,
    validateRequired,
    validateEmail,
    validateCpf,
    validateCnpj,
    validateMinLength,
    validateDate,
  } = useValidation()

  const form = defineModel()
  const errors = reactive({
    email: '',
    name: '',
    documentation: '',
    date: '',
    phone: '',
    password: '',
  })

  const hasErrors = computed(() =>
    Object.values(errors).some((error) => error !== ''),
  )
  const isPerson = computed(() => form.value.personType === 'person')
  const nameLabel = computed(() => (isPerson.value ? 'Nome' : 'Razão Social'))
  const documentationLabel = computed(() => (isPerson.value ? 'CPF' : 'CNPJ'))
  const dateLabel = computed(() =>
    isPerson.value ? 'Data de nascimento' : 'Data de abertura',
  )

  const validateForm = () => {
    errors.email = validator([
      validateRequired(form.value.email),
      validateEmail(form.value.email),
    ])
    errors.name = validator([validateRequired(form.value.name)])
    errors.documentation = validator([
      validateRequired(form.value.documentation),
      isPerson.value
        ? validateCpf(form.value.documentation)
        : validateCnpj(form.value.documentation),
    ])
    errors.date = validator([
      validateRequired(form.value.date),
      validateDate(form.value.date),
    ])
    errors.phone = validator([validateRequired(form.value.phone)])
    errors.password = validator([
      validateRequired(form.value.password),
      validateMinLength(form.value.password, 8),
    ])
  }

  const handleSubmit = () => {
    validateForm()

    if (hasErrors.value) {
      return
    }

    console.log(form.value)
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      v-model="form.email"
      label="Endereço de e-mail"
      field="email"
      :error="errors.email"
      :class="$style.field"
    />
    <TextInput
      v-model="form.name"
      field="name"
      :class="$style.field"
      :label="nameLabel"
      :error="errors.name"
    />
    <TextInput
      v-model="form.documentation"
      field="documentation"
      :class="$style.field"
      :label="documentationLabel"
      :error="errors.documentation"
    />
    <TextInput
      v-model="form.date"
      field="date"
      :class="$style.field"
      :label="dateLabel"
      type="date"
      :error="errors.date"
    />
    <TextInput
      v-model="form.phone"
      field="phone"
      :class="$style.field"
      label="Telefone"
      :error="errors.phone"
    />
    <TextInput
      v-model="form.password"
      field="password"
      label="Sua senha"
      type="password"
      :error="errors.password"
      :class="$style.field"
    />
    <div :class="$style.actionContainer">
      <BaseButton design="outlined" @click="$emit('prev')"> Voltar </BaseButton>
      <BaseButton type="submit"> Cadastrar </BaseButton>
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
