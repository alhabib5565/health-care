"use client";
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";
import { dateFormatter } from "@/utils/dateFomatter";
import CreateScheduleModal from "./components/CreateScheduleModal";
import { ISchedule } from "@/types";
import { useGetAllSchedulesQuery } from "@/redux/api/schedule.api";

const SchedulesPage = () => {
  const [open, setOpen] = useState(false);
  const handleCreateScheduleModalOpen = () => {
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
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Box>
        <Button onClick={handleCreateScheduleModalOpen}>
          Create Schedule +
        </Button>
        <CreateScheduleModal open={open} setOpen={setOpen} />
      </Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={formatedData ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default SchedulesPage;
