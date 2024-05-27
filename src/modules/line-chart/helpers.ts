import { generateNumber } from '../../lib/helpers';

export const getLineChartOptions = (title: string) => ({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
});

export const generateRGB = () : { red: number, green: number, blue: number } => {
  const r = generateNumber(25, 230);
  const g = generateNumber(25, 230);
  const b = generateNumber(25, 230);

  return {
    red: r,
    green: g,
    blue: b,
  };
};

export const generateColorsFromRGB = (red: number, green: number, blue: number): {
  borderColor: string,
  backgroundColor: string
} => {
  return {
    borderColor: `rgb(${red}, ${green}, ${blue})`,
    backgroundColor: `rgba(${red}, ${green}, ${blue}, 0.5)`,
  };
};

export const generateColors = () : { borderColor: string, backgroundColor: string } => {
  const { red, green, blue } = generateRGB();
  return generateColorsFromRGB(red, green, blue);
};