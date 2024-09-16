const dateConvertor = (dateTime: string) => {
  const time = new Date(dateTime)
  if (isNaN(time.getTime())) {
    return '-'
  }

  const persianTime = time.toLocaleDateString('fa-IR', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'long',
    day: '2-digit',
  })

  return `${persianTime}`
}

export default dateConvertor
