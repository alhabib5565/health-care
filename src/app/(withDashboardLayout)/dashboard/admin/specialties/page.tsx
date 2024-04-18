"use client";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SpecialtiesModal from "./components/SpecialtiesModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  useDeleteSpecialtiesMutation,
  useGetSpecialtiesQuery,
} from "@/redux/api/specialties.api";
import DeleteIcon from "@mui/icons-material/Delete";

import Image from "next/image";
import { toast } from "sonner";

const SpecialtiesPage = () => {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };

  const { data, isLoading } = useGetSpecialtiesQuery({});
  const [deleteSpecialty] = useDeleteSpecialtiesMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();
      if (res?.id) {
        toast.success("Specialty deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            {row.icon ? (
              <Image src={row.icon} alt="" height={40} width={40} />
            ) : (
              "Not found"
            )}
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
              color="primary"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleModalOpen}>Create Speciality</Button>
        <SpecialtiesModal open={open} setOpen={setOpen}></SpecialtiesModal>
        <TextField size="small" placeholder="Search Speciality" />
      </Stack>
      <Box my={5}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              hideFooterPagination
              hideFooterSelectedRowCount
              hideFooter
              rows={data}
              columns={columns}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
