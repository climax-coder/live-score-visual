export type GameData = {
  id: string,
  competition: string,
  country: string,
  timestamp: number,
  status: StatusObj,
  homeTeam: {
    name: string,
    score: number
  },
  awayTeam: {
    name: string,
    score: number
  },
  homeScore: {
    current: number,
    period1: number,
    normaltime: number
  },
  awayScore: {
    current: number,
    period1: number,
    normaltime: number
  },
  liveStatus: string,
}

export enum StatusType {
  Finished = "finished",
  Inprogress = "inprogress",
  NotStarted = "notstarted",
  Canceled = "canceled",
}

export type StatusObj = {
  type: StatusType,
  label: string,
}

export type CounterType = {
  all: number,
  result: number,
  live: number,
  upcoming: number,
}

export enum FilterType {
  All = "all",
  Result = "result",
  Live = "live",
  Upcoming = "upcoming",
}

export type InitialFilterState = {
  counters: CounterType,
  selectedFilter: FilterType,
}

export type PaginationState = {
  currentPage: number,
  totalPages: number,
}

