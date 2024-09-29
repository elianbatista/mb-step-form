<script setup>
  import { reactive } from 'vue'

  const form = reactive({
    email: '',
    personType: '',
  })

  const handleSubmit = () => {
    console.log(form)
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <span> Etapa 1 de 4 </span>
    <h1>Seja bem vindo(a)</h1>
    <div>
      <label for="email"> Endereço de e-mail </label>
      <input id="email" v-model="form.email" type="text" />
    </div>
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
      <label for="person"> Pessoa jurídica </label>
    </div>
    <button type="submit">Continuar</button>
  </form>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
