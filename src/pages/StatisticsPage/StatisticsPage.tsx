/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import {
  Button,
  CircularProgress,
  InputLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { LineChart } from '../../modules/line-chart';
import { formatChartData } from './helpers';
import { Autocomplete } from '../../components/Autocomplete';
import { sitesItems } from './const';
import { useGetAggregateReviewsCountQuery } from '../../api/queries/aggregate';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ISentenceCountAggregate, ISourceSitesEnum } from '../../api/generated/data-contracts';

export const StatisticsPage = () => {
  const [selectedSites, setSelectedSites] = useState<ISourceSitesEnum[]>([]);
  const [aggregationType, setAggregationType] = useState<ISentenceCountAggregate>(
    ISentenceCountAggregate.Quarter,
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const {
    data: reviewsCountData,
    isLoading: isLoadingReviewsCount,
    refetch: refetchReviewsCount,
  } = useGetAggregateReviewsCountQuery({
    source_sites: selectedSites,
    aggregate_by: aggregationType,
    start_date: startDate?.isValid() ? startDate.format('YYYY-MM-DD') : undefined,
    end_date: endDate?.isValid() ? endDate.format('YYYY-MM-DD') : undefined,
  });

  const chartData = useMemo(() => {
    if (reviewsCountData) return formatChartData(reviewsCountData.items);
    return null;
  }, [reviewsCountData]);

  const loading = isLoadingReviewsCount;

  const buttonDisabled = loading || selectedSites.length === 0;

  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Общая статистика платформы</div>
      <div className="flex mt-8 gap-4">
        <Autocomplete
          id="sourceSites"
          label="Источники"
          selectedValue={selectedSites}
          items={sitesItems}
          itemToString={(site) => site}
          multiple={true}
          onChange={setSelectedSites}
          maxItems={sitesItems.length}
          limitTags={1}
        />
        <div className="w-[200px]">
          <InputLabel>Дата, от</InputLabel>
          <DatePicker
            value={startDate}
            onChange={(v) => setStartDate(v)}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div className="w-[200px]">
          <InputLabel>Дата, до</InputLabel>
          <DatePicker
            value={endDate}
            onChange={(v) => setEndDate(v)}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <div>
          <InputLabel>Агрегировать по</InputLabel>
          <ToggleButtonGroup
            className="h-[56px]"
            value={aggregationType}
            onChange={() =>
              setAggregationType(
                aggregationType === ISentenceCountAggregate.Quarter
                  ? ISentenceCountAggregate.Month
                  : ISentenceCountAggregate.Quarter,
              )
            }
          >
            <ToggleButton value={ISentenceCountAggregate.Quarter}>Квартал</ToggleButton>
            <ToggleButton value={ISentenceCountAggregate.Month}>Месяц</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="mt-4">
        <Button
          disabled={buttonDisabled}
          variant="contained"
          onClick={() => {
            refetchReviewsCount();
          }}
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
