import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MaterialSelect, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';

type SelectProps<T> = {
  label: string;
  labelId: string;
  items: T[];
  itemToString: (item: T) => string;
  itemToValue: (item: T) => string;
  selectedValue: string[];
  onChange: (value: string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
};

export function Select<T>({
  label,
  labelId,
  selectedValue,
  items,
  itemToString,
  itemToValue,
  onChange,
  multiple = false,
  disabled,
}: SelectProps<T>) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const values = typeof value === 'string' ? value.split(',') : value;
    onChange(values.slice(0, 5));
  };

  return (
    <div className="w-[250px]">
      <InputLabel id={labelId}>{label}</InputLabel>
      <MaterialSelect<string[]>
        disabled={disabled}
        multiple={multiple}
        value={selectedValue}
        labelId={labelId}
        onChange={handleChange}
        className="w-full"
      >
        {items.map((item) => {
          const itemStringified = itemToString(item);
          const value = itemToValue(item);
          return (
            <MenuItem key={value} value={value}>
              {itemStringified}
            </MenuItem>
          );
        })}
      </MaterialSelect>
    </div>
  );
}
