"use client";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Add from "@mui/icons-material/Add";
import DoctorSchedulesModal from "../components/DoctorSchedulesModal";
import { dateFormatter } from "@/utils/dateFomatter";
import { ISchedule } from "@/types";
import { useGetAllSchedulesQuery } from "@/redux/api/schedule.api";
import dayjs from "dayjs";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";

const DoctorSchedule = () => {
  const [open, setOpen] = useState(false);
  const handleDcotorScheduleModalOpen = () => {
    setOpen(!open);
  };

  const { data, isLoading } = useGetAllSchedulesQuery({});

  const schedules = data?.schedules;
  const meta = data?.meta;

  console.log(schedules, "scedules");

  // useEffec(() => {
  const formatedData = schedules?.map((schedule: ISchedule, index: number) => {
    return {
      sl: index + 1,
      id: schedule?.id,
      startDate: dateFormatter(schedule.startDate),
      // endDate: dateFormatter(schedule.endDate),
      startTime: dayjs(schedule?.startDate).format("hh:mm a"),
      endTime: dayjs(schedule?.endDate).format("hh:mm a"),
    };
  });
  // setAllSchedule(formatedData);
  // }, [schedules]);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete">
            <GridDeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Box>
        <Button onClick={handleDcotorScheduleModalOpen} endIcon={<Add />}>
          Create Doctor Schedule
        </Button>
      </Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={formatedData ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
      {open && <DoctorSchedulesModal setOpen={setOpen} open={open} />}
    </Box>
  );
};

export default DoctorSchedule;
