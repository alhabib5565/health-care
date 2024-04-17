"use client";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import CreateScheduleModal from "./components/CreateScheduleModal";

const SchedulesPage = () => {
  const [open, setOpen] = useState(false);
  const handleCreateScheduleModalOpen = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <Button onClick={handleCreateScheduleModalOpen}>Create Schedule +</Button>
      <CreateScheduleModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SchedulesPage;
