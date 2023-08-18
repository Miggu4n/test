export interface User {
  _id: { $oid: string }
  nome: string
  cognome: string
  email: string
  password: string
  ruolo: string
  isActive: boolean
  codiceConferma: string
  azienda: string
  resetCode: string
}
