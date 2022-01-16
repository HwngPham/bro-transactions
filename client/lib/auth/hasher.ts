import { sha256 } from 'js-sha256'

const Hasher = () => {
  const digest = (plainPassword: string): any => {
    return sha256(plainPassword)
  }

  const verify = (plainPassword: string, encodedPassword: string) => {
    return digest(plainPassword) === encodedPassword
  }

  return { verify, digest }
}

export const hasher = Hasher()
