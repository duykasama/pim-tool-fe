export interface Project {
  id: string
  projectNumber: number
  name: string
  status: string
  customer: string
  startDate: string
}

export interface ProjectToDelete {
  id: string,
  name: string
}

export interface Group {
  id: string,
  name: string,
  leaderId: string
}
