export enum Action {
  login,
  logout,
  register,
}

export type Credential = {
  password: string
  salt: string
}
