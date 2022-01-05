import bycrypt from 'bcrypt'
import type { NextRequest } from 'next/server'
import { Credential } from '../types/auth'

const Hasher = () => {
  const hash = (plainPassword: string, salt: string, callback: Function): any => {
    bycrypt.hash(plainPassword, salt, (_err, encodedPassword) => {
      const credential: Credential = {
        password: encodedPassword,
        salt: salt
      }
      return callback(credential)
    })
  }

  const genSalt = (callback: Function) => {
    const saltRounds = 10
    bycrypt.genSalt(saltRounds, (_err, salt) => {
      callback(salt)
    })
  }

  const verify = (credential: Credential, encodedPassword: string, callback: Function) => {
    const { password, salt } = credential
    hash(password, salt, (credential: Credential) => {
      const { password } = credential

      return callback(password === encodedPassword)
    })
  }

  const digest = (plainPassword: string, callback: Function) => {
    genSalt((salt: string) => {
      hash(plainPassword, salt, callback)
    })
  }

  return { hash, verify, digest }
}

const Authorizer = () => {
  const getCurrentUser = () => {
    // TODO
  }

  const validateRequest = (req: NextRequest): boolean => {
    // TODO
    return true
  }

  return { validateRequest, getCurrentUser }
}

export const hasher = Hasher()
export const authorizer = Authorizer()
