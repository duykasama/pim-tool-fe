export interface SearchInfo {
  fieldName: string,
  value: string,
}

export interface SortInfo {
  fieldName: string,
  ascending: boolean
}

export interface SearchCriteria {
  ConjunctionSearchInfos: SearchInfo[],
  DisjunctionSearchInfos: SearchInfo[]
}

export interface PaginationStatus {
  pageIndex: number,
  pageSize: number,
  lastPage: number,
  isLastPage: boolean
}
