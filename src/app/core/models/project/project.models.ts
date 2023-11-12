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
