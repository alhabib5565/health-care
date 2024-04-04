import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";

export type TSelectOption = {
  value: string;
  label: string;
};

type TPHSelectProps = {
  selectOptions: TSelectOption[];
  label: string;
  name: string;
  required?: boolean;
};

const PHSelect = ({
  selectOptions,
  name,
  label,
  required = false,
}: TPHSelectProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error?.message}>
          <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
          <Select
            {...field}
            // value={field.value}
            size="small"
            labelId="demo-simple-select-error-label"
            id="demo-simple-select"
            label={label}
            // required={required}
          >
            {selectOptions.map((option: TSelectOption, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default PHSelect;
