import PHModal from "@/components/shared/dialog/Modal";
import PHFileUploader from "@/components/ui/Form/PHFileUploader";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TSpecialtiesModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtiesModal = ({ open, setOpen }: TSpecialtiesModal) => {
  const onSubmit = (value: FieldValues) => {
    console.log(value);
  };
  return (
    <PHModal title="Create A New Specialties" open={open} setOpen={setOpen}>
      <PHForm onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput type="text" label="Specialty Name" name="name" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" />
          </Grid>
        </Grid>
        <Button type="submit">Submit</Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialtiesModal;
