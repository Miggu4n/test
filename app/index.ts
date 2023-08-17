import { Impianto } from './types/actual'
import { cleanDb } from './cleanDb'
import { importAppuntamenti } from './importAppuntamenti'
import { importUtenti } from './importUtenti'
import { importImpianti } from './importImpianti'

const impianti: Impianto[] = require('./data/impianti.json')
const appuntamenti = require('./data/appuntamenti.json')
const utenti = require('./data/utenti.json')

async function main() {
  console.time('import totale')

  await cleanDb()

  await importImpianti(impianti)
  await importUtenti(utenti)
  await importAppuntamenti(appuntamenti)

  console.timeEnd('import totale')
}

main()

// execution times

// clean db: 120.627ms
// import impianti: 2:13.276 (m:ss.mmm)
// import utenti: 5.382ms
// import appuntamenti: 745.364ms
// import totale: 2:14.151 (m:ss.mmm)
// righe create: 49675
