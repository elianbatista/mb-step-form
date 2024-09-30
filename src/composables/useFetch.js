import { ref } from 'vue'

export function useFetch() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const post = async (url, payload) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        error.value = await response.json()
      } else {
        data.value = await response.json()
      }
    } catch (err) {
      if (!error.value) {
        error.value = {
          message: 'Ocorreu um erro, tente novamente mais tarde',
        }
      }

      throw err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, post }
}
