import { IGetTopsisResponseItem } from '../../api/generated/data-contracts';
import { groupBy } from '../../lib/helpers';

type TableData = {
  companyName: string;
  year: number;
  allLetters: string;
  allTopics: string;
  average: string;
  environmental: string;
  social: string;
  governance: string;
}[];

export const formatTableData = (aggregatedData: IGetTopsisResponseItem[]): TableData => {
  const dataGroupedByModelName = groupBy(aggregatedData, 'company_name');
  const tableData: TableData = [];

  dataGroupedByModelName.forEach((items, companyName) => {
    const dataByYear = groupBy(items, 'year');
    dataByYear.forEach((yearData, year) => {
      const yearEntry = {
        companyName,
        year: parseInt(year, 10),
        allLetters: 'None',
        allTopics: 'None',
        average: 'None',
        environmental: 'None',
        social: 'None',
        governance: 'None'
      };

      yearData.forEach(item => {
        const valueFormatted = item.value ? item.value.toFixed(3) : 'None';
        switch (item.aggregate_type) {
          case 'all_letters':
            yearEntry.allLetters = valueFormatted;
            break;
          case 'all_topics':
            yearEntry.allTopics = valueFormatted;
            break;
          case 'average':
            yearEntry.average = valueFormatted;
            break;
        }

        if (item.environmental) yearEntry.environmental = item.environmental.toFixed(3);
        if (item.social) yearEntry.social = item.social.toFixed(3);
        if (item.governance) yearEntry.governance = item.governance.toFixed(3);
      });

      tableData.push(yearEntry);
    });
  });

  return tableData;
};
