/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useMemo, useState } from 'react';
import { Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { Select } from '../../components/Select';
import { topsisFieldItems} from '../../lib/const';
import { formatTableData } from './helpers';
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

export const OneCompanyPage = () => {
  const [selectedFields, setSelectedFields] = useState<ITopsisCompanyType[]>([]);
  const [selectedRspp, setSelectedRspp] = useState<IGetTopsisCompaniesResponseItem[]>([]);
  const [selectedNotRspp, setSelectedNotRspp] = useState<IGetTopsisCompaniesResponseItem[]>([]);
  const [selectedIndexType] = useState<string[]>([]);

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
    aggregate_types: [
      ITopsisAggregateType.Average,
      ITopsisAggregateType.AllTopics,
      ITopsisAggregateType.AllLetters
    ],
  });

  console.log(topsisData);
  const tableData = useMemo(() => formatTableData(topsisData?.data || []), [topsisData]);

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
      <div className="text-4xl mt-4 font-semibold">Рейтинги и индекс компании</div>
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
            label="Компания (выбор одной)"
            labelId="mock"
            items={[]}
            itemToString={() => ''}
            itemToValue={() => ''}
          />
        )}
        {selectedFields[0] === ITopsisCompanyType.Rspp && (
          <Autocomplete
            multiple={false}
            id="rspp"
            label="Компания (выбор одной)"
            selectedValue={selectedRspp}
            items={rsppData?.data ?? []}
            itemToString={(rspp) => rspp.name}
            onChange={setSelectedRspp}
          />
        )}
        {selectedFields[0] === ITopsisCompanyType.NonRspp && (
          <Autocomplete
            multiple={false}
            id="not_rspp"
            label="Компания (выбор одной)"
            selectedValue={selectedNotRspp}
            items={notRsppData?.data ?? []}
            itemToString={(notRspp) => notRspp.name}
            onChange={setSelectedNotRspp}
          />
        )}
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
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Год</TableCell>
                <TableCell align="right">На буквах</TableCell>
                <TableCell align="right">На всех топиках</TableCell>
                <TableCell align="right">Среднее</TableCell>
                <TableCell align="right">Критерий E</TableCell>
                <TableCell align="right">Критерий S</TableCell>
                <TableCell align="right">Критерий G</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{row.year}</TableCell>
                  <TableCell align="right">{row.allLetters}</TableCell>
                  <TableCell align="right">{row.allTopics}</TableCell>
                  <TableCell align="right">{row.average}</TableCell>
                  <TableCell align="right">{row.environmental}</TableCell>
                  <TableCell align="right">{row.social}</TableCell>
                  <TableCell align="right">{row.governance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
