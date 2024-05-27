/* eslint-disable max-lines */
/* eslint-disable complexity */
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useQueryClient } from 'react-query';
import { useGetDataParserQuery, usePostDataParserMutation, usePatchDataParserMutation } from '../../api/queries/parser';
import { IParserModel, IPostParserRequest } from '../../api/generated/data-contracts';

type EditingState = {
  [key: number]: boolean;
};

export const ParsersPage = () => {
  const { data: parsersData, isLoading: loadingParsers } = useGetDataParserQuery();
  const queryClient = useQueryClient();
  const { mutate: patchParserData } = usePatchDataParserMutation();
  const { mutate: postParserData } = usePostDataParserMutation();

  const [data, setData] = useState<IParserModel[]>(parsersData?.data || []);
  const [isEditing, setIsEditing] = useState<EditingState>({});

  useEffect(() => {
    if (parsersData?.data) {
      setData(parsersData.data);
    }
  }, [parsersData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    field: keyof IParserModel, 
    index: number
  ) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [field]: e.target.value };
    setData(updatedData);
  };

  const saveChanges = (index: number) => {
    const row = data[index];
    patchParserData(
      { parserId: row.id, params: row },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['PARSER_PREFIX']);
          setIsEditing({ ...isEditing, [index]: false });
        }
      }
    );
  };

  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Каталог парсеров проекта</div>
      {loadingParsers && (
        <div className="mt-[100px] flex justify-center">
          <CircularProgress />
        </div>
      )}
      {data.length > 0 && (
        <div style={{ height: 400, width: '96%', margin: '30px auto 0 auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Тип данных</TableCell>
                  <TableCell align="right">Парсер</TableCell>
                  <TableCell align="right">Автор</TableCell>
                  <TableCell align="right">Дата создания</TableCell>
                  <TableCell align="right">Дата последнего изменения</TableCell>
                  <TableCell align="right">Веб-сайт</TableCell>
                  <TableCell align="right">Таблица</TableCell>
                  <TableCell align="right">Начало периода собранных данных</TableCell>
                  <TableCell align="right">Конец периода собранных данных</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.parsed_data_type}>
                    <TableCell component="th" scope="row">
                      {row.parsed_data_type}
                    </TableCell>
                    <TableCell align="right">{row.parser_name}</TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{row.creation_date}</TableCell>
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <TextField
                          value={row.update_date}
                          onChange={(e) => handleInputChange(e, 'update_date', index)}
                        />
                      ) : (
                        row.update_date
                      )}
                    </TableCell>
                    <TableCell align="right">{row.website}</TableCell>
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <TextField
                          value={row.table_name}
                          onChange={(e) => handleInputChange(e, 'table_name', index)}
                        />
                      ) : (
                        row.website
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <TextField
                          value={row.start_date}
                          onChange={(e) => handleInputChange(e, 'start_date', index)}
                        />
                      ) : (
                        row.start_date
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <TextField
                          value={row.end_date}
                          onChange={(e) => handleInputChange(e, 'end_date', index)}
                        />
                      ) : (
                        row.end_date
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <Button onClick={() => saveChanges(index)}>Save</Button>
                      ) : (
                        <Button onClick={() => setIsEditing({ ...isEditing, [index]: true })}>Edit</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};
