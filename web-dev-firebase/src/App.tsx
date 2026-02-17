import { useState } from 'react'
import './App.css'
import { createUser } from './services'

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    createUser({name, email, password})
  }

  return (
    <>
    <h1>Заполните данные</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder='Имя' />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder='Пароль' />
        <button type="submit">Отправить</button>
      </form>
    </>
  )
}

export default App
