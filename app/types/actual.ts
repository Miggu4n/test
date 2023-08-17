export interface Contatti {
  casa: string
  mobile: string
  email: string
  chiamate: string
}

export interface Responsabile {
  cognome: string
  nome: string
  codice_fiscale: string
  partita_iva: string
  ragione_sociale: string
  codice_univoco: string
  annotazioni: string
}

export interface Ubicazione {
  provincia: string
  comune: string
  cap: string
  localita: string
  indirizzo: string
  civico: string
  piano: string
  interno: string
  scala: string
  maps: string
  annotazioni: string
}

export interface Curit {
  targa: string
  codice_impianto: string
}

export interface Generatore {
  modello: string
  matricola: string
  formula_comfort: string
  scadenza_garanzia: string
  collaudo: string
  idraulico: string
  dico: string
  causale_installazione: string
  storico: string
  annotazioni: string
}

export interface Manutenzioni {
  interventi: string
  ultimo_controllo: string
  ultimo_fumi: string
  prossimo_controllo: string
  mese_controllo: string
  periodicita: string
  annotazioni: string
}

export interface Impianto {
  _id: string
  responsabile: Responsabile
  ubicazione: Ubicazione
  contatti: Contatti
  curit: Curit
  generatore: Generatore
  manutenzioni: Manutenzioni
}
