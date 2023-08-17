import moment from 'moment'
import { Generatore, Manutenzioni } from '../../types/impianto'
import { prisma } from '../../prisma'
import { Azioni, Periodicita } from '@prisma/client'
function parseMonth(mese: string): number {
  switch (mese.trim()) {
    case 'GENNAIO':
      return 0
    case 'FEBBRAIO':
      return 1
    case 'MARZO':
      return 2
    case 'APRILE':
      return 3
    case 'MAGGIO':
      return 4
    case 'GIUGNO':
      return 5
    case 'LUGLIO':
      return 6
    case 'AGOSTO':
      return 7
    case 'SETTEMBRE':
      return 8
    case 'OTTOBRE':
      return 9
    case 'NOVEMBRE':
      return 10
    case 'DICEMBRE':
      return 11
  }
}

export async function createInterventi(
  manutenzioni: Manutenzioni,
  generatore: Generatore,
  generatoreId: string
) {
  const ultimo_controllo = moment(manutenzioni.ultimo_controllo, 'DD/MM/YYYY')
  const ultimo_fumi = moment(manutenzioni.ultimo_fumi, 'DD/MM/YYYY')

  if (String(Number(manutenzioni.prossimo_controllo)) !== 'Nan') {
    const prossimo_controllo = new Date(
      Number(manutenzioni.prossimo_controllo),
      ultimo_fumi.toDate().getMonth()
    )

    if (
      String(prossimo_controllo) === 'Invalid Date' ||
      !manutenzioni.prossimo_controllo.match(/\d{4}/)
    ) {
      await prisma.generatore.update({
        where: { id: generatoreId },
        data: {
          periodicita: Periodicita.MAI,
        },
      })
    } else if (ultimo_controllo.isAfter(ultimo_fumi)) {
      await prisma.generatore.update({
        where: { id: generatoreId },
        data: {
          periodicita: Periodicita.OGNI_ANNO,
          prossimo_controllo: moment({
            month: parseMonth(manutenzioni.mese_controllo),
            year: Number(manutenzioni.prossimo_controllo),
          }).toDate(),
        },
      })
    } else if (
      ultimo_fumi.get('year') + 1 ===
      prossimo_controllo.getFullYear()
    ) {
      await prisma.generatore.update({
        where: { id: generatoreId },
        data: {
          periodicita: Periodicita.OGNI_ANNO,
          prossimo_controllo: moment({
            month: parseMonth(manutenzioni.mese_controllo),
            year: Number(manutenzioni.prossimo_controllo),
          }).toDate(),
        },
      })
    } else if (
      ultimo_fumi.get('year') + 2 ===
      prossimo_controllo.getFullYear()
    ) {
      await prisma.generatore.update({
        where: { id: generatoreId },
        data: {
          periodicita: Periodicita.OGNI_DUE_ANNI,
          prossimo_controllo: moment({
            month: parseMonth(manutenzioni.mese_controllo),
            year: Number(manutenzioni.prossimo_controllo),
          }).toDate(),
        },
      })
    } else {
      await prisma.generatore.update({
        where: { id: generatoreId },
        data: {
          periodicita: Periodicita.MAI,
        },
      })
    }

    if (
      (String(ultimo_controllo.toDate()) !== 'Invalid Date' ||
        String(ultimo_fumi.toDate()) !== 'Invalid Date') &&
      ultimo_controllo.isSame(ultimo_fumi)
    ) {
      await prisma.intervento.create({
        data: {
          azioni: [Azioni.PULIZIA, Azioni.ANALISI_FUMI],
          data_intervento: ultimo_controllo.toISOString(),

          Generatore: {
            connect: {
              id: generatoreId,
            },
          },
        },
      })
    } else {
      if (String(ultimo_controllo.toDate()) !== 'Invalid Date') {
        await prisma.intervento.create({
          data: {
            azioni: [Azioni.PULIZIA],
            data_intervento: ultimo_controllo.toISOString(),

            Generatore: {
              connect: {
                id: generatoreId,
              },
            },
          },
        })
      }

      if (String(ultimo_fumi.toDate()) !== 'Invalid Date') {
        await prisma.intervento.create({
          data: {
            azioni: [Azioni.ANALISI_FUMI],
            data_intervento: ultimo_fumi.toISOString(),

            Generatore: {
              connect: {
                id: generatoreId,
              },
            },
          },
        })
      }
    }
  }
}
