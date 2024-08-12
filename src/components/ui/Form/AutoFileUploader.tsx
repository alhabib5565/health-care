import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Input, SxProps } from "@mui/material";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
  onFileUpload: any;
};

export default function AutoFileUploader({
  name,
  label,
  sx,
  onFileUpload,
}: TProps) {
  return (
    <Button
      component="label"
      fullWidth
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {label}
      <Input
        type={name}
        style={{
          display: "none",
        }}
        onChange={(e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) return null;
          onFileUpload(file);
        }}
      />
    </Button>
  );
}
