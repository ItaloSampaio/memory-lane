const defaultUSDateFormatOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}

export const formatDateToUSLocale = (
  date: Date,
  options: Intl.DateTimeFormatOptions = defaultUSDateFormatOptions
): string => {
  return date.toLocaleDateString('en-US', options)
}
