import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type TTimePicker = {
  name: string;
  label: string;
  size?: "small" | "medium";
  required?: boolean;
  fullWidth?: boolean;
};

export default function PHTimePicker({
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
}: TTimePicker) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              {...field}
              value={value}
              onChange={(time) => onChange(time)}
              slotProps={{
                textField: {
                  size: size,
                  required: required,
                  fullWidth: fullWidth,
                },
              }}
              label={label}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}
    />
  );
}
