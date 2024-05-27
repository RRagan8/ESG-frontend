/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

import { Select } from '../../components/Select';
import { availableYears, topsisFieldItems, topsisIndexItems } from '../../lib/const';
import { LineChart } from '../../modules/line-chart';
import { formatChartData } from './helpers';
import { noop } from '../../lib/helpers';
import { Autocomplete } from '../../components/Autocomplete';
import {
  IGetTopsisCompaniesResponseItem,
  ITopsisAggregateType,
  ITopsisCompanyType,
} from '../../api/generated/data-contracts';
import {
  useGetTopsisRsppCompaniesQuery,
  useGetTopsisQuery, useGetTopsisNotRsppCompaniesQuery,
} from '../../api/queries/topsis';

export const TopsisComparisonPage = () => {
  const [selectedFields, setSelectedFields] = useState<ITopsisCompanyType[]>([]);
  const [selectedRspp, setSelectedRspp] = useState<IGetTopsisCompaniesResponseItem[]>([]);
  const [selectedNotRspp, setSelectedNotRspp] = useState<IGetTopsisCompaniesResponseItem[]>([]);
  const [selectedStartYear, setSelectedStartYear] = useState<string[]>([]);
  const [selectedEndYear, setSelectedEndYear] = useState<string[]>([]);
  const [selectedIndexType, setSelectedIndexType] = useState<string[]>([]);

  const {data: rsppData, isLoading: loadingRspp} = useGetTopsisRsppCompaniesQuery();
  const {data: notRsppData, isLoading: loadingNotRspp} = useGetTopsisNotRsppCompaniesQuery();

  const {
    data: topsisData,
    isLoading: isLoadingTopsisData,
    refetch: refetchTopsisData,
  } = useGetTopsisQuery({
    company_ids: [
      ...(selectedFields[0] === ITopsisCompanyType.Rspp ? selectedRspp.map(({ id }) => id) : []),
      ...(selectedFields[0] === ITopsisCompanyType.NonRspp ? selectedNotRspp.map(({ id }) => id) : []),
    ],
    aggregate_types: [selectedIndexType[0] as ITopsisAggregateType],
    year_start: selectedStartYear[0] ? Number(selectedStartYear[0]) : undefined,
    year_end: selectedEndYear[0] ? Number(selectedEndYear[0]) : undefined,
  });

  const chartData = useMemo(() => {
    if (topsisData) return formatChartData(topsisData.data);
    return null;
  }, [topsisData]);

  const loading =
    loadingRspp ||
    loadingNotRspp ||
    isLoadingTopsisData;

  const buttonDisabled =
    loading ||
    (selectedFields[0] === ITopsisCompanyType.Rspp && selectedRspp.length === 0) ||
    (selectedFields[0] === ITopsisCompanyType.NonRspp && selectedNotRspp.length === 0) ||
    selectedIndexType.length === 0;

  console.log(topsisData);
  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Сравнение компаний</div>
      <div className="flex mt-8 gap-4">
        <Select
          selectedValue={selectedFields}
          onChange={setSelectedFields as any}
          label="Тип отчетов"
          labelId="fields"
          items={topsisFieldItems}
          itemToString={(item) => item.name}
          itemToValue={(item) => item.id}
        />
        {selectedFields.length === 0 && (
          // Mock Select
          <Select
            disabled
            selectedValue={[]}
            onChange={noop}
            label="Компания (выбор до 5 шт.)"
            labelId="mock"
            items={[]}
            itemToString={() => ''}
            itemToValue={() => ''}
          />
        )}
        {selectedFields[0] === ITopsisCompanyType.Rspp && (
          <Autocomplete
            multiple={true}
            id="rspp"
            label="Компания (выбор до 5 шт.)"
            selectedValue={selectedRspp}
            items={rsppData?.data ?? []}
            itemToString={(rspp) => rspp.name}
            onChange={setSelectedRspp}
          />
        )}
        {selectedFields[0] === ITopsisCompanyType.NonRspp && (
          <Autocomplete
            multiple={true}
            id="not_rspp"
            label="Компания (выбор до 5 шт.)"
            selectedValue={selectedNotRspp}
            items={notRsppData?.data ?? []}
            itemToString={(notRspp) => notRspp.name}
            onChange={setSelectedNotRspp}
          />
        )}
        <Select
          multiple={false}
          selectedValue={selectedIndexType}
          onChange={setSelectedIndexType}
          label="Тип индекса"
          labelId="indexType"
          items={topsisIndexItems}
          itemToString={(companyType) => companyType.name}
          itemToValue={(companyType) => companyType.id}
        />
        <Select
          selectedValue={selectedStartYear}
          onChange={setSelectedStartYear}
          label="Первый год"
          labelId="startYear"
          items={availableYears}
          itemToString={(year) => String(year)}
          itemToValue={(year) => String(year)}
        />
        <Select
          selectedValue={selectedEndYear}
          onChange={setSelectedEndYear}
          label="Последний год"
          labelId="endYear"
          items={availableYears}
          itemToString={(year) => String(year)}
          itemToValue={(year) => String(year)}
        />
      </div>
      <div className="mt-4">
        <Button
          disabled={buttonDisabled}
          variant="contained"
          onClick={() => refetchTopsisData()}
        >
          Обновить данные
        </Button>
      </div>
      {loading && (
        <div className="mt-[100px] flex justify-center">
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <div className="w-full mt-4">
          {chartData && chartData.labels?.length === 0 ? (
            <div className="flex justify-center mt-[100px] text-xl">
              Нет данных по выбранным параметрам
            </div>
          ) : (
            <>{chartData && <LineChart title="" chartData={chartData} />}</>
          )}
        </div>
      )}
    </div>
  );
};
