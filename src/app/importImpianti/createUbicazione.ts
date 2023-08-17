import { prisma } from '../../prisma'
import { Ubicazione } from '../../types/impianto'

export async function createUbicazione(
  ubicazione: Ubicazione,
  impiantoId: string
) {
  const existingUbicazione = await prisma.ubicazione.findFirst({
    where: { impiantoId },
    select: { impianto: true, id: true },
  })

  if (existingUbicazione) {
    return existingUbicazione.id
  }

  const { id: ubicazioneId } = await prisma.ubicazione.create({
    data: {
      provincia: ubicazione.provincia,
      comune: ubicazione.comune,
      cap: ubicazione.cap,
      indirizzo: ubicazione.indirizzo,
      civico: ubicazione.civico,
      piano: ubicazione.piano,
      interno: ubicazione.interno,
      scala: ubicazione.scala,
      note: ubicazione.annotazioni,
      impiantoId,
    },
  })
  return ubicazioneId
}
