import moment from 'moment'
import { prisma } from '../../prisma'

export async function importAppuntamenti(appuntamenti: any[]) {
  console.time('import appuntamenti')

  for (const appuntamento of appuntamenti) {
    await prisma.appuntamento.create({
      data: {
        startDate: moment(appuntamento.startDate).toDate(),
        durata: Number(appuntamento.duration),
        note: appuntamento.note !== '' ? appuntamento.note : null,
        tipo: appuntamento.type,
        titolo: appuntamento.title,
        user: {
          connect: {
            nome: appuntamento.resourceId.nome,
          },
        },
      },
    })
  }
  console.timeEnd('import appuntamenti')
}
