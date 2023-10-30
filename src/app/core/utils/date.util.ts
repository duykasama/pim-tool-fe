function formatUtcDate(date: string){
  const dateFormat = 'yyyy-mm-dd'
  const slicedDate = date.slice(0, dateFormat.length + 1)
  return `${slicedDate.slice(5, 7)}.${slicedDate.slice(8, 10)}.${slicedDate.slice(0, 4)}`
}

export {formatUtcDate}
