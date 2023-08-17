import { prisma } from '../prisma'

export async function importUtenti(utenti: any[]) {
  console.time('import utenti')

  await prisma.user.createMany({
    data: utenti.map((utente) => ({
      nome: utente.nome,
      cognome: utente.cognome,
    })),
  })
  console.timeEnd('import utenti')
}
