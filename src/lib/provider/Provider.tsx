"use client";
import { ThemeProvider } from "@emotion/react";
import React, { ReactNode } from "react";
import { theme } from "../theme/theme";

const Provider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
