export type Action = { type: string, payload?: {}, error?: {} }
export type Dispatch = (action: Action) => void

type ThunkActionCreator = () => any
type ThunkAction = ({}) => any

type FetchRoundsParams = {
  accountId: number,
  dateFrom: string,
  operatorId: number,
}

type Round = {
  status: string,
  gameName: string,
  id: number,
  operatorId: number,
  gameId: number,
  accountId: number,
  purchaseMode: string,
  clientMode: string,
  currency: string,
  totalBet: number,
  totalWin: number,
  feature: boolean,
  competitionAffected: boolean,
  formated?: {
    created: Date,
  },
}
