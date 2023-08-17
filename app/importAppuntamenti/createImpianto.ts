import { prisma } from '../../prisma'
import { Curit } from '../types/actual'

export async function createImpianto(curit: Curit, responsabileId: string) {
  const targa =
    curit.targa.trim().replace(' ', '').length !== 16 ? null : curit.targa
  const codice_impianto =
    curit.codice_impianto === '' ? null : curit.codice_impianto

  const filters = {
    OR: [
      {
        AND: [
          {
            targa: {
              not: null,
            },
          },
          {
            targa,
          },
        ],
      },
      {
        AND: [
          {
            codice_impianto: {
              not: null,
            },
          },
          {
            codice_impianto,
          },
        ],
      },
    ],
  }

  const existingImpianto = await prisma.impianto.findFirst({ where: filters })
  if (existingImpianto) {
    return existingImpianto.id
  }

  const { id: impiantoId } = await prisma.impianto.create({
    data: {
      targa,
      codice_impianto,
      responsabileId,
    },
  })

  return impiantoId
}
