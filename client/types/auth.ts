export enum Action {
  login,
  logout,
  register,
}

export interface Credential {
  password: string
  salt: string
}
