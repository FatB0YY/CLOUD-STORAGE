export default function sizeFormat(size: number): string {
  const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ']
  let unitIndex = 0
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  const formattedSize = size.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  return formattedSize + ' ' + units[unitIndex]
}
