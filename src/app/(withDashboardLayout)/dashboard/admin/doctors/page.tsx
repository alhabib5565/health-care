"use client";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateDoctorModal from "./components/CreateDoctorModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllDoctorsQuery } from "@/redux/api/doctor.api";

const DoctorPage = () => {
  const { data, isLoading } = useGetAllDoctorsQuery({});
  console.log(data);
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 300 },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleModalOpen}>Create Speciality</Button>
        <CreateDoctorModal open={open} setOpen={setOpen}></CreateDoctorModal>
        <TextField size="small" placeholder="Search Speciality" />
      </Stack>

      <Box my={5}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DoctorPage;
