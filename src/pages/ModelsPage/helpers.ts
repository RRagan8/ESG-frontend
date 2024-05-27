import { ChartData } from 'chart.js';
import { IAggregateTextResultItem, IGetTopsisResponseItem } from '../../api/generated/data-contracts';
import { formatDate, groupBy } from '../../lib/helpers';
import { generateColorsFromRGB, generateRGB } from '../../modules/line-chart/helpers';

type Dataset = {
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
};

export const formatChartData = (
  aggregatedData: IGetTopsisResponseItem[],
): ChartData<'line', number[], string> => {
  const labels = [...new Set(aggregatedData.map((item) => item.year.toString()))];

  const datasets: Dataset[] = [];

  const dataGroupedByModelName = groupBy(aggregatedData, 'aggregate_type');

  dataGroupedByModelName.forEach((items, key) => {
    const baseColorRGB = generateRGB();
    const baseColor = generateColorsFromRGB(baseColorRGB.red, baseColorRGB.green, baseColorRGB.blue);
    datasets.push({
      label: key,
      data: items.map((item) => ({ x: item.year.toString(), y: item.value ?? 0 })),
      borderColor: baseColor.borderColor,
      backgroundColor: baseColor.backgroundColor,
    });
  });

  return {
    labels,
    datasets: datasets as any,
  };
};
