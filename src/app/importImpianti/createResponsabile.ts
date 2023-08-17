import { prisma } from '../../prisma'
import { createContatti } from './createContatti'
import { Contatti, Responsabile } from '../../types/impianto'

export async function createResponsabile(
  responsabile: Responsabile,
  contatti: Contatti
): Promise<string> {
  const codice_fiscale =
    responsabile.codice_fiscale === '' ? null : responsabile.codice_fiscale

  const codice_univoco =
    responsabile.codice_univoco === '' ? null : responsabile.codice_univoco

  const partita_iva =
    responsabile.partita_iva === '' ? null : responsabile.partita_iva

  const filters = {
    OR: [
      {
        AND: [
          {
            codice_fiscale: {
              not: null,
            },
          },
          {
            codice_fiscale,
          },
        ],
      },
      {
        AND: [
          {
            partita_iva: {
              not: null,
            },
          },
          {
            partita_iva,
          },
        ],
      },
      {
        AND: [
          {
            codice_univoco: {
              not: null,
            },
          },
          {
            codice_univoco,
          },
        ],
      },
    ],
  }

  const existingResponsabile = await prisma.responsabile.findFirst({
    where: filters,
  })

  if (!existingResponsabile) {
    const { id: responsabileId } = await prisma.responsabile.create({
      data: {
        cognome: responsabile.cognome,
        nome: responsabile.nome,
        annotazioni: responsabile.annotazioni || '',
        codice_fiscale,
        partita_iva,
        codice_univoco,
      },
    })

    await createContatti(contatti, responsabileId)

    return responsabileId
  }

  await prisma.responsabile.update({
    data: {
      codice_fiscale: existingResponsabile.codice_fiscale
        ? existingResponsabile.codice_fiscale
        : codice_fiscale,
      partita_iva: existingResponsabile.partita_iva
        ? existingResponsabile.partita_iva
        : partita_iva,
      codice_univoco: existingResponsabile.codice_univoco
        ? existingResponsabile.codice_univoco
        : codice_univoco,
    },
    where: { id: existingResponsabile.id },
  })

  return existingResponsabile.id
}
