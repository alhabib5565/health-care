"use client";
import { genderOptions } from "@/app/constant/selectOptions";
import FullScreenDialog from "@/components/shared/dialog/FullScreenModal";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import PHSelect from "@/components/ui/Form/PHSelect";
import { useCreateDoctorMutation } from "@/redux/api/doctor.api";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TCreateDoctorModal = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name cannot be empty"),
  contactNumber: z.string().min(1, "Contact number cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  registrationNumber: z.string().min(1, "Registration number cannot be empty"),
  experience: z.number().int().min(0, "Experience must be a positive integer"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  apointmentFee: z.number().min(0, "Appointment fee must be a positive number"),
  qualification: z.string().min(1, "Qualification cannot be empty"),
  currentWorkingPlace: z
    .string()
    .min(1, "Current working place cannot be empty"),
  designation: z.string().min(1, "Designation cannot be empty"),
});

const DoctorValidationSchema = z.object({
  password: z.string().min(1, "Password cannot be empty"),
  doctor: DoctorSchema,
});

const doctorDefaultValues = {
  password: "123456",
  doctor: {
    email: "doctor3@gmail.com",
    name: "Dr. Md Imran Hassan",
    contactNumber: "+1234567890",
    address: "123 Medical Street, Cityville",
    registrationNumber: "12345",
    experience: 5,
    gender: "",
    apointmentFee: 100,
    qualification: "MD, PhD",
    currentWorkingPlace: "City Hospital",
    designation: "Senior Consultant",
  },
};

const CreateDoctorModal = ({ open, setOpen }: TCreateDoctorModal) => {
  const [createDoctor] = useCreateDoctorMutation();

  const onSubmit = async (value: FieldValues) => {
    try {
      value.doctor.experience = Number(value.doctor.experience);
      value.doctor.apointmentFee = Number(value.doctor.apointmentFee);
      const modifyedData = modifyPayload(value);
      const res = await createDoctor(modifyedData).unwrap();
      console.log(res);

      if (res.id) {
        setOpen(false);
        toast.success("doctor create successfull");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FullScreenDialog open={open} setOpen={setOpen}>
      <PHForm
        resolver={zodResolver(DoctorValidationSchema)}
        defaultValues={doctorDefaultValues}
        onSubmit={onSubmit}
      >
        <Grid sx={{ mt: 2 }} container spacing={2}>
          <Grid item xs={12} md={4}>
            <PHInput label="Email" name="doctor.email" type="email" />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput label="Password" name="password" type="password" />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput label="Name" name="doctor.name" type="text" />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Contact Number"
              name="doctor.contactNumber"
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput label="Address" name="doctor.address" type="text" />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Registration Number"
              name="doctor.registrationNumber"
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Experience"
              name="doctor.experience"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHSelect
              label="Gender"
              name="doctor.gender"
              selectOptions={genderOptions}
              required={true}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Apointment Fee"
              name="doctor.apointmentFee"
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Qualification"
              name="doctor.qualification"
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Current Working Place"
              name="doctor.currentWorkingPlace"
              type="text"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PHInput
              label="Designation"
              name="doctor.designation"
              type="text"
            />
          </Grid>
        </Grid>
        <Button sx={{ my: 2 }} type="submit">
          Create
        </Button>
      </PHForm>
    </FullScreenDialog>
  );
};

export default CreateDoctorModal;
