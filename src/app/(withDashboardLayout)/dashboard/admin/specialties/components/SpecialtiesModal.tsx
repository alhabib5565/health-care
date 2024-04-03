import PHModal from "@/components/shared/dialog/Modal";
import PHFileUploader from "@/components/ui/Form/PHFileUploader";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import { useCreateSpecialityMutation } from "@/redux/api/specialties.api";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TSpecialtiesModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtiesModal = ({ open, setOpen }: TSpecialtiesModal) => {
  const [createSpeciality] = useCreateSpecialityMutation();

  const onSubmit = async (value: FieldValues) => {
    try {
      const modifyedData = modifyPayload(value);
      const res = await createSpeciality(modifyedData).unwrap();
      if (res.id) {
        setOpen(false);
        toast.success("specialties create successfull");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PHModal title="Create A New Specialties" open={open} setOpen={setOpen}>
      <PHForm onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput type="text" label="Specialty Name" name="title" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 2 }} type="submit">
          Submit
        </Button>
      </PHForm>
    </PHModal>
  );
};

export default SpecialtiesModal;
