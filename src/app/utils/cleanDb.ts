import { prisma } from '../../prisma'

export async function cleanDb() {
  console.time('clean db')

  await prisma.contatto.deleteMany()
  await prisma.ubicazione.deleteMany()
  await prisma.intervento.deleteMany()
  await prisma.generatore.deleteMany()
  await prisma.impianto.deleteMany()
  await prisma.responsabile.deleteMany()
  await prisma.appuntamento.deleteMany()
  await prisma.user.deleteMany()

  console.timeEnd('clean db')
}
