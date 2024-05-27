import TextField from '@mui/material/TextField';
import MaterialAutocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';

type AutocompleteProps<T> = {
  id: string;
  label: string;
  items: T[];
  itemToString: (item: T) => string;
  selectedValue: T[];
  onChange: (value: T[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  maxItems?: number;
  limitTags?: number;
};

export function Autocomplete<T>({
  id,
  label,
  selectedValue,
  items,
  itemToString,
  onChange,
  multiple = true,
  disabled,
  maxItems = 5,
  limitTags
}: AutocompleteProps<T>) {
  const handleChange = (_: any, value: T[] | T | null) => {
    if (!value) {
      onChange([]);
      return;
    }
    if (value && Array.isArray(value)) {
      onChange(value.slice(0, maxItems));
      return;
    }
    onChange([value]);
  };

  return (
    <div className="w-[250px]">
      <InputLabel>{label}</InputLabel>
      <MaterialAutocomplete
        limitTags={limitTags}
        multiple={multiple}
        id={id}
        disabled={disabled}
        options={items}
        value={multiple ? selectedValue : selectedValue[0]}
        onChange={handleChange}
        getOptionLabel={itemToString}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
}
