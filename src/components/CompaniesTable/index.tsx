import React, { useState, useMemo} from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Box, TextField, Button, TablePagination, FormGroup, Chip
} from '@mui/material';

interface Company {
  name: string;
  type: string;
}

interface CompaniesTableProps {
  companies: Company[];
  allTypes: string[];
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({ companies, allTypes}) => {
  const [activeTypes, setActiveTypes] = useState<string[]>(allTypes);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ field: 'name' | 'type'; direction: 'asc' | 'desc' }>({ field: 'name', direction: 'asc' });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleToggle = (type: string) => {
    setActiveTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const normalizeString = (str: string) => {
    return str.toLowerCase().replace(/[^а-яА-Яa-zA-Z]/g, '');  // Remove non-alphanumeric characters and convert to lower case
  };

  const changeSort = (field: 'name' | 'type') => {
    if (sortConfig.field === field) {
      setSortConfig({ ...sortConfig, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ field: field, direction: 'asc' });
    }
  };

  const filteredAndSortedCompanies = useMemo(() => {
    return companies
      .filter(company => activeTypes.includes(company.type) && company.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const primaryFieldA = normalizeString(a[sortConfig.field]);
        const primaryFieldB = normalizeString(b[sortConfig.field]);
        const secondaryFieldA = normalizeString(a[sortConfig.field === 'type' ? 'name' : 'type']);
        const secondaryFieldB = normalizeString(b[sortConfig.field === 'type' ? 'name' : 'type']);
        if (primaryFieldA === primaryFieldB) {
          return (secondaryFieldA < secondaryFieldB ? -1 : 1) * (sortConfig.direction === 'asc' ? 1 : -1);
        }
        return (primaryFieldA < primaryFieldB ? -1 : 1) * (sortConfig.direction === 'asc' ? 1 : -1);
      });
  }, [companies, activeTypes, searchTerm, sortConfig]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="flex-start" width="100%" mt={2} marginBottom="16px">
        <TextField
          label="Поиск по названию компании"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: '300px' }} // Adapts to space available but does not exceed 300px
        />
      </Box>
      <FormGroup row sx={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {allTypes.map((type, index) => (
          <Chip
            key={index}
            label={type}
            onClick={() => handleToggle(type)}
            color={activeTypes.includes(type) ? "primary" : "default"}
            sx={{
              margin: '5px',
              border: activeTypes.includes(type) ? 'none' : '1px solid #1976d2',
              backgroundColor: activeTypes.includes(type) ? '#1976d2' : '#fff',
              color: activeTypes.includes(type) ? '#fff' : '#1976d2',
              '&:hover': {
                backgroundColor: activeTypes.includes(type) ? '#115293' : '#eee',
              },
            }}
          />
        ))}
      </FormGroup>
      <TableContainer component={Paper} sx={{ width: '900px', border: '1px solid black', overflowX: 'auto' }}>
        <Table sx={{ border: '1px solid black' }}>
          <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
            <TableRow>
              <TableCell sx={{ border: '1px solid black', width: '70%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Название компании
                  <Button onClick={() => changeSort('name')} style={{ color: sortConfig.field === 'name' ? 'blue' : 'gray' }}>
                    {sortConfig.field === 'name' && sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </Button>
                </Typography>
              </TableCell>
              <TableCell sx={{ border: '1px solid black', width: '30%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Отрасль
                  <Button onClick={() => changeSort('type')} style={{ color: sortConfig.field === 'type' ? 'blue' : 'gray' }}>
                    {sortConfig.field === 'type' && sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </Button>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedCompanies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: '1px solid black' }}>{company.name}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{company.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredAndSortedCompanies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}  // Custom label without rows per page
        sx={{
          '.MuiTablePagination-selectLabel, .MuiTablePagination-select': {
            display: 'none',
          }
        }}
      />
    </div>
  );
};

export default CompaniesTable;
