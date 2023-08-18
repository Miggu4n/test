import { TipoAppuntamento } from '@prisma/client'

export interface Appuntamento {
  _id: {
    $oid: string
  }
  notes: string
  type: TipoAppuntamento
  resourceId: {
    $oid: string
  }
  startDate: {
    $date: string
  }
  duration: 60
  title: string
}
