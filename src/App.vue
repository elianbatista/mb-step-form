<script setup>
  import { computed, reactive, ref } from 'vue'

  import {
    WelcomeStep,
    PersonStep,
    EnterpriseStep,
    PasswordStep,
    ReviewStep,
  } from '@/components'

  const form = reactive({
    email: '',
    personType: '',
    name: '',
    documentation: '',
    date: '',
    phone: '',
    password: '',
  })
  const currentStepIndex = ref(0)

  const personStep = {
    component: PersonStep,
    title: 'Pessoa Física',
  }

  const enterpriseStep = {
    component: EnterpriseStep,
    title: 'Pessoa Jurídica',
  }

  const steps = [
    {
      component: WelcomeStep,
      title: 'Seja bem vindo(a)',
    },
    personStep,
    {
      component: PasswordStep,
      title: 'Senha de acesso',
    },
    {
      component: ReviewStep,
      title: 'Revise suas informações',
    },
  ]

  const currentStep = computed(() => steps[currentStepIndex.value].component)

  const goToNextStep = () => {
    if (currentStepIndex.value === 0) {
      steps[1] = form.personType === 'person' ? personStep : enterpriseStep
    }

    currentStepIndex.value++
  }

  const goToPreviousStep = () => {
    currentStepIndex.value--
  }
</script>

<template>
  <div :class="$style.container">
    <span :class="$style.stepper">
      Etapa <span>{{ currentStepIndex + 1 }}</span> de {{ steps.length }}
    </span>
    <h1 :class="$style.title">{{ steps[currentStepIndex].title }}</h1>
    <component
      :is="currentStep"
      v-model="form"
      @next="goToNextStep"
      @prev="goToPreviousStep"
    />
  </div>
</template>

<style lang="scss" module>
  .container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding-top: 60px;

    .stepper {
      span {
        color: var(--primary-color);
      }
    }

    .title {
      margin-bottom: 24px;
    }
  }
</style>
