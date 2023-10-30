function resolveProjectStatus(shortStatus: string): string {
  switch (shortStatus.toUpperCase()) {
    case 'NEW':
      return 'New';
    case 'PLA':
      return 'Planned'
    case 'INP':
      return 'In progress'
    case 'FIN':
      return 'Finished'
    default:
      return 'Unknown'
  }
}

export {resolveProjectStatus}
