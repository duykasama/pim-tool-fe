function formatUtcDate(date: string){
  const dateFormat = 'yyyy-mm-dd'
  const slicedDate = date.slice(0, dateFormat.length + 1)
  // format from yyyy-mm-dd => mm.dd.yyyy
  return `${slicedDate.slice(5, 7)}.${slicedDate.slice(8, 10)}.${slicedDate.slice(0, 4)}`
}

function formatDateTime(dateTime: string): string {
  const dateFormat = 'yyyy-mm-dd'
  return dateTime.slice(0, dateFormat.length)
}

export {
  formatUtcDate,
  formatDateTime
}
