export default (...dateList: Array<Date | undefined>) => {
  const sanitizedDateList = dateList.filter(Boolean) as Date[]
  return sanitizedDateList.sort((a, b) => a.getTime() - b.getTime())
}
