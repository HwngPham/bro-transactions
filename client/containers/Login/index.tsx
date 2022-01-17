import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LoginFormData } from '../../types/form'

export function Login() {
  const { register, handleSubmit } = useForm()
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (userInfo: LoginFormData) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        ContentType: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userInfo),
    })
    const responseBody = await response.json()
    if (response.ok) {
      // TODO: store current user
      // window.location.href = '/'
    } else {
      setErrorMsg(responseBody.error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(({ email, password }) =>
        handleLogin({
          email,
          password,
        })
      )}
    >
      <input {...register('email')} placeholder="Who are you bro?" />
      <input {...register('password')} placeholder="Tell me your password" />

      <input type="submit" value="Log in" />
      {errorMsg && <strong>{errorMsg}</strong>}
    </form>
  )
}
