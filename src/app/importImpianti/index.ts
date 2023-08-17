import { createGeneratori } from './createGeneratori'
import { createImpianto } from './createImpianto'
import { createInterventi } from './createInterventi'
import { createResponsabile } from './createResponsabile'
import { createUbicazione } from './createUbicazione'

import { Impianto } from '../../types/actual'

export async function importImpianti(impianti: Impianto[]) {
  console.time('import impianti')
  for (const impianto of impianti) {
    const responsabileId = await createResponsabile(
      impianto.responsabile,
      impianto.contatti
    )

    const impiantoId = await createImpianto(impianto.curit, responsabileId)
    await createUbicazione(impianto.ubicazione, impiantoId)

    const generatoreId = await createGeneratori(impianto.generatore, impiantoId)
    await createInterventi(
      impianto.manutenzioni,
      impianto.generatore,
      generatoreId
    )
  }
  console.timeEnd('import impianti')
}
