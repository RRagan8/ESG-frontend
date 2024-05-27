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
import { IModelInfoModel } from '../../api/generated/data-contracts';
import { useGetDataModelInfoQuery, usePatchDataModelInfoMutation, usePostDataModelInfoMutation } from '../../api/queries/modelInfo';

type EditingState = {
  [key: number]: boolean;
};

export const ModelsPage = () => {
  const { data: modelsData, isLoading: loadingModels } = useGetDataModelInfoQuery();
  const queryClient = useQueryClient();
  const { mutate: patchModelData } = usePatchDataModelInfoMutation();
  const { mutate: postModelData } = usePostDataModelInfoMutation();

  const [data, setData] = useState<IModelInfoModel[]>(modelsData?.data || []);
  const [isEditing, setIsEditing] = useState<EditingState>({});

  useEffect(() => {
    if (modelsData?.data) {
      setData(modelsData.data);
    }
  }, [modelsData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    field: keyof IModelInfoModel, 
    index: number
  ) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [field]: e.target.value };
    setData(updatedData);
  };

  const saveChanges = (index: number) => {
    const row = data[index];
    patchModelData(
      { modelId: row.id, params: row },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['MODEL_INFO_PREFIX']);
          setIsEditing({ ...isEditing, [index]: false });
        }
      }
    );
  };

  return (
    <div>
      <div className="text-4xl mt-4 font-semibold">Каталог моделей проекта</div>
      {loadingModels && (
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
                  <TableCell>Тип модели</TableCell>
                  <TableCell align="right">Модель</TableCell>
                  <TableCell align="right">Автор</TableCell>
                  <TableCell align="right">Дата создания</TableCell>
                  <TableCell align="right">Дата последнего изменения</TableCell>
                  <TableCell align="right">Типы данных, используемые моделью</TableCell>
                  <TableCell align="right">Описание модели</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.model_type}>
                    <TableCell component="th" scope="row">
                      {row.model_type}
                    </TableCell>
                    <TableCell align="right">{row.model_name}</TableCell>
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
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <TextField
                          value={row.data_used_by_model}
                          onChange={(e) => handleInputChange(e, 'data_used_by_model', index)}
                        />
                      ) : (
                        row.data_used_by_model
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {isEditing[index] ? (
                        <TextField
                          value={row.description}
                          onChange={(e) => handleInputChange(e, 'description', index)}
                        />
                      ) : (
                        row.description
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
