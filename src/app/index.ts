import { cleanDb } from '../utils/cleanDb'

import { importAppuntamenti } from './importAppuntamenti'
import { importUtenti } from './importUtenti'
import { importImpianti } from './importImpianti'

const impianti: Impianto[] = require('../../data/impiantos.json')
const appuntamenti = require('../../data/appuntamentos.json')
const utenti = require('../../data/users.json')

import { Impianto } from '../types/impianto'

async function main() {
  console.time('import totale')

  await cleanDb()

  await importUtenti(utenti)
  await importAppuntamenti(appuntamenti)
  await importImpianti(impianti)

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
