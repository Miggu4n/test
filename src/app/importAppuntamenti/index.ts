import moment from 'moment'
import { prisma } from '../../../prisma'
import { Appuntamento } from '../../types/appuntamento'

export async function importAppuntamenti(appuntamenti: Appuntamento[]) {
  console.time('import appuntamenti')

  for (const appuntamento of appuntamenti) {
    if (!appuntamento.resourceId.$oid) {
      continue
    }
    await prisma.appuntamento.create({
      data: {
        startDate: moment(appuntamento.startDate.$date).toDate(),
        durata: Number(appuntamento.duration),
        note: appuntamento.notes !== '' ? appuntamento.notes : null,
        tipo: appuntamento.type,
        titolo: appuntamento.title,
        user: {
          connect: {
            id_old: appuntamento.resourceId.$oid,
          },
        },
      },
    })
  }
  console.timeEnd('import appuntamenti')
}
