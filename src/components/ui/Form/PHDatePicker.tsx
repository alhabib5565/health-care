import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";

type TPHDatePicker = {
  name: string;
  label: string;
  size?: "small" | "medium";
  required?: boolean;
  fullWidth?: boolean;
};

export default function PHDatePicker({
  name,
  label,
  size = "small",
  required,
  fullWidth = true,
}: TPHDatePicker) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { value, onChange, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              timezone="system"
              {...field}
              onChange={(date) => onChange(date)}
              value={value || Date.now()}
              slotProps={{
                textField: {
                  size: size,
                  required: required,
                  label: label,
                  fullWidth: fullWidth,
                },
              }}
              views={["year", "month", "day"]}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}
    />
  );
}
