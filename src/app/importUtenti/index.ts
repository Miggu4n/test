import { UserRole } from '@prisma/client'
import { prisma } from '../../../prisma'
import { User } from '../../types/user'

function parseRuolo(ruolo: string): UserRole {
  switch (ruolo) {
    case 'TECNICO':
      return UserRole.TECNICO
    case 'IMPIEGATO':
      return UserRole.IMPIEGATO
    case 'ADMIN':
      return UserRole.ADMIN
  }
}
export async function importUtenti(utenti: User[]) {
  console.time('import utenti')
  for (const user of utenti) {
    await prisma.user.create({
      data: {
        id_old: String(user._id.$oid),
        nome: user.nome,
        cognome: user.cognome,
        isActive: user.isActive,
        codiceConferma: null,
        email: user.email,
        ruolo: UserRole.ADMIN,
        password:
          '$2b$10$/ihrsVO2oiKZv8n/xDBGNOzlTmOxX2YoKzUgwC454Lzc99OKtik9q',
      },
    })
  }
  console.timeEnd('import utenti')
}
