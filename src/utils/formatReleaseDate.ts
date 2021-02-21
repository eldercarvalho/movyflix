import { format } from 'date-fns';

export const formatReleaseDate = (date: string, pattern: string): string => {
  if (!date) return '';

  const dateArr = date.split('-');
  const year = dateArr ? parseInt(dateArr[0]) : 0;
  const month = dateArr ? parseInt(dateArr[1]) - 1 : 0;
  const day = dateArr ? parseInt(dateArr[2]) : 0;

  return format(new Date(year, month, day), pattern);
};
