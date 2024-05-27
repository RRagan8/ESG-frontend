import { ChartData } from 'chart.js';
import { IReviewsCountItem } from '../../api/generated/data-contracts';
import { formatDate, groupBy } from '../../lib/helpers';
import { generateColors } from '../../modules/line-chart/helpers';

type Dataset = {
  label: string;
  data: { x: string; y: number }[];
  borderColor: string;
  backgroundColor: string;
};

export const formatChartData = (
  aggregatedData: IReviewsCountItem[],
): ChartData<'line', number[], string> => {
  const sortedData = aggregatedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const labels = [...new Set(sortedData.map((item) => formatDate(item.date)))];

  const datasets: Dataset[] = [];

  const dataGroupedByName = groupBy(sortedData, 'source_site');

  dataGroupedByName.forEach((items, key) => {
    const { borderColor, backgroundColor } = generateColors();

    datasets.push({
      label: key,
      data: items.map((item) => ({ x: formatDate(item.date), y: item.count ?? 0 })),
      borderColor,
      backgroundColor,
    });
  });

  return {
    labels,
    datasets: datasets as any,
  };
};
