import dayjs from 'dayjs';

export const generateArrayOfYears = () => {
  const max = new Date().getFullYear();
  const min = 1970;

  const years = Array.from({ length: max - min + 1 })
    .map((_, i) => min + i)
    .reverse();

  return years;
};

export const groupBy = <T>(array: Array<T>, key: keyof T): Map<string, Array<T>> => {
  return array.reduce(
    (acc, element) => acc.set(element[key], [...(acc.get(element[key]) || []), element]),
    new Map(),
  );
};

export const formatDate = (date: Date | string) => {
  if (typeof date === 'string') return date;
  return dayjs(date).format('DD/MM/YYYY');
};

export const generateNumber = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};
