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

  const validateCpf = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return 'CPF Inválido'
    }

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf[i]) * (10 - i)
    }
    let firstVerifier = 11 - (sum % 11)
    firstVerifier = firstVerifier >= 10 ? 0 : firstVerifier

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf[i]) * (11 - i)
    }
    let secondVerifier = 11 - (sum % 11)
    secondVerifier = secondVerifier >= 10 ? 0 : secondVerifier

    if (
      firstVerifier !== parseInt(cpf[9]) ||
      secondVerifier !== parseInt(cpf[10])
    ) {
      return 'CPF Inválido'
    }

    return ''
  }

  const validateCnpj = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '')

    if (cnpj.length !== 14) return 'CNPJ Inválido'

    return ''
  }

  const validateDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateString)) {
      return 'Data Inválida'
    }

    const [year, month, day] = dateString.split('-').map(Number)

    const date = new Date(year, month - 1, day)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return 'Data Inválida'
    }

    return ''
  }

  const validateMinLength = (string, length) => {
    if (string.length < length) {
      return `O campo tem que ter no mínimo ${length} caracteres`
    }

    return ''
  }

  return {
    validator,
    validateEmail,
    validateRequired,
    validateCpf,
    validateDate,
    validateMinLength,
    validateCnpj,
  }
}
