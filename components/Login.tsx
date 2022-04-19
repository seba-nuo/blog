import { useRouter } from 'next/router'
import React, { SyntheticEvent, useState } from 'react'
import styles from '../styles/Login.module.css'

function Login() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: username,
        contrasena: password
      })
    })
    const auth: boolean = response.status === 200
    if (auth) {
      await router.push('/')
      return
    }

    alert('Nombre o contraseña incorrectos')
  }

  return (
    <div className={styles.login}>
      <h1>Blogo ✍️</h1>
      <form onSubmit={handleSubmit} className={styles.credentials}>
        <input type="text" id='nombre' required placeholder='Nombre' onChange={e => setUsername(e.target.value)} />

        <input type="password" id='contrasena' required placeholder='Contraseña' onChange={e => setPassword(e.target.value)} />

        <button type='button'>Ingresar</button>
        <a href="/registrarse" className={styles.registrarse}>Registrarse</a>
      </form>
    </div>
  )
}

export default Login