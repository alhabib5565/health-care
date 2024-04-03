import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller } from "react-hook-form";
import { Input, SxProps } from "@mui/material";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
};

export default function PHFileUploader({ name, label, sx }: TProps) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <Button
          component="label"
          fullWidth
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <Input
            {...field}
            type={name}
            style={{
              display: "none",
            }}
            value={value?.fileName}
            onChange={(e) =>
              onChange((e.target as HTMLInputElement).files?.[0])
            }
          />
        </Button>
      )}
    />
  );
}
