"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SpecialtiesModal from "./components/SpecialtiesModal";

const SpecialtiesPage = () => {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={handleModalOpen}>Create Speciality</Button>
        <SpecialtiesModal open={open} setOpen={setOpen}></SpecialtiesModal>
        <TextField size="small" placeholder="Search Speciality" />
      </Stack>
    </Box>
  );
};

export default SpecialtiesPage;
