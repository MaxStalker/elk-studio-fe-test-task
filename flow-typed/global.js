//@flow

declare type FetchRoundsParams = {
  accountId: number,
  dateFrom: string,
  operatorId: number,
}

declare type Round = {
  status: string,
  gameName: string,
  id: number,
  operatorId: number,
  gameId: number,
  created: string,
  accountId: number,
  purchaseMode: string,
  clientMode: string,
  create: string,
  currency: string,
  totalBet: number,
  totalWin: number,
  feature: boolean,
  competitionAffected: boolean,
  formated: {
    created: Date,
  },
}

declare type Theme = {
  spacing?: {
    unit?: number,
  },
  palette?: {
    background?: {
      default: string,
    },
  },
}
