"use client";

import { Box, styled } from "@mui/material";
import React from "react";

const StyledDashLine = styled(Box)(({ theme }) => ({
  border: "2px dashed",
  borderColor: theme.palette.secondary.main,
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const DashedLine = () => {
  return (
    <>
      <StyledDashLine />
    </>
  );
};

export default DashedLine;
