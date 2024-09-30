<script setup>
  import { computed, reactive } from 'vue'

  import { useValidation } from '@/composables'
  import { TextInput, InputError, BaseButton } from '@/components'

  const emit = defineEmits(['next'])

  const { validator, validateEmail, validateRequired } = useValidation()

  const form = defineModel()
  const errors = reactive({
    email: '',
    personType: '',
  })

  const hasErrors = computed(
    () => errors.email !== '' || errors.personType !== '',
  )

  const handleSubmit = () => {
    errors.email = validator([
      validateRequired(form.value.email),
      validateEmail(form.value.email),
    ])
    errors.personType = validator([validateRequired(form.value.personType)])

    if (hasErrors.value) {
      return
    }

    emit('next')
  }
</script>

<template>
  <form :class="$style.container" @submit.prevent="handleSubmit">
    <TextInput
      v-model="form.email"
      label="Endereço de e-mail"
      :error="errors.email"
      :class="$style.field"
    />
    <div :class="$style.field">
      <div :class="$style.radioContainer">
        <div>
          <input
            id="person"
            v-model="form.personType"
            type="radio"
            value="person"
            name="person-type"
          />
          <label for="person"> Pessoa física </label>
        </div>
        <div>
          <input
            id="enterprise"
            v-model="form.personType"
            type="radio"
            value="enterprise"
            name="person-type"
          />
          <label for="enterprise"> Pessoa jurídica </label>
        </div>
      </div>
      <InputError v-if="errors.personType" :error="errors.personType" />
    </div>

    <BaseButton design="solid" type="submit"> Continuar </BaseButton>
  </form>
</template>

<style lang="scss" module>
  .container {
    .field {
      margin-bottom: 16px;
    }

    .radioContainer {
      display: flex;
      gap: 16px;
    }
  }
</style>
