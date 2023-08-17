import { Curit } from './curit'
import { Ubicazione } from './ubicazione'
import { Contatti } from './contatti'
import { Generatore } from './generatore'
import { Manutenzioni } from './manutenzioni'
import { Responsabile } from './responsabile'

export interface Impianto {
  _id: string
  responsabile: Responsabile
  ubicazione: Ubicazione
  contatti: Contatti
  curit: Curit
  generatore: Generatore
  manutenzioni: Manutenzioni
}
