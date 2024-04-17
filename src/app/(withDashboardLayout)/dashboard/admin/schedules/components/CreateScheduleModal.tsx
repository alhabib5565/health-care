import PHModal from "@/components/shared/dialog/Modal";
import PHDatePicker from "@/components/ui/Form/PHDatePicker";
import PHForm from "@/components/ui/Form/PHForm";
import PHTimePicker from "@/components/ui/Form/PHTimePicker";
import { useCreateScheduleMutation } from "@/redux/api/schedule.api";
import { dateFormatter } from "@/utils/dateFomatter";
import { timeFormatter } from "@/utils/timeFomatter";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TCreateScheduleModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateScheduleModal = ({ open, setOpen }: TCreateScheduleModalProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    // console.log(values);
    try {
      const res = await createSchedule(values).unwrap();
      // console.log(res);
      if (res?.length) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <PHModal title="Create Schedule " open={open} setOpen={setOpen}>
      <PHForm onSubmit={handleFormSubmit}>
        <Grid sx={{ maxWidth: "400px" }} container spacing={2}>
          <Grid item md={12}>
            <PHDatePicker label="Start Date" name="startDate" />
          </Grid>
          <Grid item md={12}>
            <PHDatePicker label="End Date" name="endDate" />
          </Grid>
          <Grid item md={12}>
            <PHTimePicker label="Start Time" name="startTime" />
          </Grid>
          <Grid item md={12}>
            <PHTimePicker label="End Time" name="endTime" />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <Button type="submit">Create</Button>
        </Box>
      </PHForm>
    </PHModal>
  );
};

export default CreateScheduleModal;
