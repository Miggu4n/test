import { FormulaComfort, Periodicita } from '@prisma/client'

import moment from 'moment'
import { prisma } from '../../prisma'
import { Generatore } from '../types/actual'

function getFormulaComfort(formula_comfort: string): FormulaComfort {
  const fc = formula_comfort.split(' ')
  if (!fc[1]) return null

  switch (fc[1].trim().replace(' ', '')) {
    case '10':
      return FormulaComfort.FC_10
    case '5':
      return FormulaComfort.FC_5
    case '5+3':
      return FormulaComfort.FC_5_3
    case '5+3+2':
      return FormulaComfort.FC_5_3_2
    case '5+5':
      return FormulaComfort.FC_5_5
    case '5+5+5':
      return FormulaComfort.FC_5_5_5
    default:
      return null
  }
}

function getDataCollaudo(collaudo: string): Date {
  const newCollaudo = moment(collaudo, 'DD/MM/YYYY').toDate()
  if (String(newCollaudo) === 'Invalid Date') return null
  return newCollaudo
}

function isMatricolaValid(matricola: string): boolean {
  switch (matricola.trim().replace(' ', '')) {
    case 'X':
    case '-':
    case '':
      return false
    default:
      return true
  }
}
export async function createGeneratori(
  generatore: Generatore,
  impiantoId: string
): Promise<string> {
  const formula_comfort = getFormulaComfort(generatore.formula_comfort)
  const prezzo_manutenzione = Number(
    generatore.formula_comfort.split('EURO')[1]
  )

  const existingGeneratore = await prisma.generatore.findFirst({
    where: {
      matricola: generatore.matricola,
    },
  })

  if (existingGeneratore) {
    return existingGeneratore.id
  }

  const { id: generatoreId } = await prisma.generatore.create({
    data: {
      modello: generatore.modello,
      matricola: isMatricolaValid(generatore.matricola)
        ? generatore.matricola
        : null,
      formula_comfort,
      prezzo_manutenzione,
      impiantoId,
      periodicita: Periodicita.MAI,
      collaudo: getDataCollaudo(generatore.collaudo),
    },
  })
  return generatoreId
}
