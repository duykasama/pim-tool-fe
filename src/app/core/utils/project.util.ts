function resolveProjectStatus(shortStatus: string): string {
  switch (shortStatus.toUpperCase()) {
    case 'NEW':
      return 'NEW';
    case 'PLA':
      return 'PLANNED'
    case 'INP':
      return 'IN_PROGRESS'
    case 'FIN':
      return 'FINISHED'
    default:
      return 'UNKNOWN'
  }
}

export {resolveProjectStatus}
