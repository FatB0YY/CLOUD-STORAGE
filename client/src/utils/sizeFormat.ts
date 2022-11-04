export default (size: number): string => {
  if (size > 1024 * 1024 * 1024) {
    return (size / (1024 * 1024 * 1024)).toFixed(1) + 'ГБ'
  }
  if (size > 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(1) + 'МБ'
  }
  if (size > 1024) {
    return (size / 1024).toFixed(1) + 'КБ'
  }
  return size + 'Б'
}
