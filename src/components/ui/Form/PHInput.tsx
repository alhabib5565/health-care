import { TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TPHInput = {
  type: HTMLInputTypeAttribute;
  label: string;
  name: string;
  required: boolean;
  placheholder?: string;
};

const PHInput = ({
  type,
  label,
  name,
  required,
  placheholder = label,
}: TPHInput) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          {...field}
          type={type}
          size="small"
          id="outlined-basic"
          label={label}
          variant="outlined"
          placeholder={placheholder}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default PHInput;

/*import { TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

type TPHInput = {
  type: HTMLInputTypeAttribute;
  label: string;
  name: string;
};

const PHInput = ({ type, label, name }: TPHInput) => {
  const { register } = useFormContext();
  return (
    <TextField
      fullWidth
      type={type}
      size="small"
      id="outlined-basic"
      label={label}
      variant="outlined"
      {...register(name)}
    />
  );
};

export default PHInput;
*/
