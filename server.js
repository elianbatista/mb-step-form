import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/registration', (req, res) => {
  const { body } = req

  if (
    !body.email ||
    !body.personType ||
    !body.name ||
    !body.documentation ||
    !body.date ||
    !body.phone ||
    !body.password
  ) {
    res
      .status(400)
      .json({ message: 'Todos os campos devem estar preenchidos!' })
  }

  console.log('Dados recebidos:', req.body)
  res.json({ message: 'Formulário enviado com sucesso!' })
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
