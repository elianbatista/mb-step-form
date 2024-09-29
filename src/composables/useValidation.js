export const useValidation = () => {
  const validator = (validations) => {
    const errors = validations.filter((validation) => validation !== '')

    if (errors.length > 0) {
      return errors[0]
    }

    return ''
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regex.test(email)) {
      return 'E-mail inválido'
    }

    return ''
  }

  const validateRequired = (field) => {
    if (field === '') {
      return 'Campo obrigatório'
    }

    return ''
  }

  return {
    validator,
    validateEmail,
    validateRequired,
  }
}
