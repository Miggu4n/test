import { createGeneratori } from './importAppuntamenti/createGeneratori'
import { createImpianto } from './importAppuntamenti/createImpianto'
import { createInterventi } from './importAppuntamenti/createInterventi'
import { createResponsabile } from './importAppuntamenti/createResponsabile'
import { createUbicazione } from './importAppuntamenti/createUbicazione'

import { Impianto } from './types/actual'

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
