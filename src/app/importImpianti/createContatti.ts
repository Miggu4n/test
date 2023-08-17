import { prisma } from '../../prisma'
import { Contatti } from '../../types/actual'

export async function createContatti(
  contatti: Contatti,
  responsabileId: string
) {
  for (const tipo in contatti) {
    if (tipo === 'chiamate') continue

    const contattiRefactorati = contatti[tipo]
      .split(' - ')
      .map((valoreNota) => {
        if (contatti[tipo] === '') {
          return
        }
        const valore = valoreNota.split('(')[0].trim()
        const nota = valoreNota.split('(')[1]?.replace(')', '').trim()
        return {
          tipo: tipo.toUpperCase() === 'CASA' ? 'FISSO' : tipo.toUpperCase(),
          valore,
          note: nota,
        }
      })

    for (const contatto of contattiRefactorati) {
      if (!contatto) continue
      await prisma.contatto.create({
        data: { ...contatto, responsabileId },
      })
    }
  }
}
