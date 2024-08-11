"use client";
import * as React from "react";
import PHModal from "@/components/shared/dialog/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ISchedule } from "@/types";
import { Theme, useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useGetAllSchedulesQuery } from "@/redux/api/schedule.api";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi.api";

type TDoctorScheduleModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selectId: readonly string[], theme: Theme) {
  return {
    fontWeight:
      selectId.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const DoctorSchedulesModal = ({ open, setOpen }: TDoctorScheduleModalProps) => {
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = React.useState(
    dayjs(new Date()).toISOString()
  );

  const [selectedScheduleIds, setSelectedScheduleIds] = React.useState<
    string[]
  >([]);

  let query: Record<string, any> = {};
  if (selectedDate) {
    query["startDate"] = dayjs(selectedDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDate"] = dayjs(selectedDate)
      .hour(23)
      .minute(59)
      .millisecond(999)
      .toISOString();
  }
  const { data } = useGetAllSchedulesQuery(query);
  const schedules = data?.schedules || [];
  console.log(selectedScheduleIds);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedScheduleIds>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedScheduleIds(
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getTimeIn12HourFormat(dateTimeString: string): string {
    const date: Date = new Date(dateTimeString);
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const ampm: string = hours >= 12 ? "PM" : "AM";
    const formattedHours: number = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes: string =
      minutes < 10 ? "0" + minutes : minutes.toString();
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const [createDoctorSchedule] = useCreateDoctorScheduleMutation();

  const onSubmit = async () => {
    try {
      const res = await createDoctorSchedule({
        scheduleIds: selectedScheduleIds,
      });
      console.log(res);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Controlled picker"
            value={dayjs(selectedDate)}
            onChange={(newValue) =>
              setSelectedDate(dayjs(newValue).toISOString())
            }
          />
        </LocalizationProvider>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
          <Select
            //   sx={{ width: "100%" }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selectedScheduleIds}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => {
                  const selectedSchedule = schedules.find(
                    (schedule: any) => schedule.id === value
                  );

                  if (!selectedSchedule) return null;

                  const formattedTimeSlot = `${getTimeIn12HourFormat(
                    (selectedSchedule as ISchedule).startDate
                  )} - ${getTimeIn12HourFormat(
                    (selectedSchedule as ISchedule).endDate
                  )}`;

                  return <Chip key={value} label={formattedTimeSlot} />;
                })}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {schedules?.map((schedule: ISchedule) => (
              <MenuItem
                key={schedule.id}
                value={schedule.id}
                // style={getStyles(schedule.endDate, selectedScheduleIds, theme)}
              >
                {`${getTimeIn12HourFormat(
                  schedule.startDate
                )} - ${getTimeIn12HourFormat(schedule.endDate)}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={onSubmit} variant="outlined">
          <span>Fetch data</span>
        </Button>
      </Box>
    </PHModal>
  );
};

export default DoctorSchedulesModal;
