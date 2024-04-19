"use client";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import CreateDoctorModal from "./components/CreateDoctorModal";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import UseDebounced from "@/hooks/UseDebounced";
import EditIcon from "@mui/icons-material/Edit";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctor.api";
import { toast } from "sonner";
import Link from "next/link";

const DoctorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };

  const [deleteDoctor] = useDeleteDoctorMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success("doctor deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              gap: 2,
            }}
          >
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
              color="primary"
            >
              <GridDeleteIcon />
            </IconButton>
            <Link href={`doctors/edit/${row.id}`}>
              <EditIcon aria-label="delete" color="action">
                <GridDeleteIcon />
              </EditIcon>
            </Link>
          </Box>
        );
      },
    },
  ];

  const handleSearchTermChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const debouncedText = UseDebounced({
    searchTerm: searchTerm,
    dealy: 600,
  });
  console.log(debouncedText);
  const query: Record<string, any> = {};

  if (debouncedText) {
    query["searchTerm"] = debouncedText;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleModalOpen}>Create Speciality</Button>
        <CreateDoctorModal open={open} setOpen={setOpen}></CreateDoctorModal>
        <TextField
          onChange={(e) => handleSearchTermChange(e)}
          size="small"
          type="text"
          placeholder="Search Speciality"
        />
      </Stack>

      <Box my={5}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid rows={data} columns={columns} hideFooter />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DoctorPage;
