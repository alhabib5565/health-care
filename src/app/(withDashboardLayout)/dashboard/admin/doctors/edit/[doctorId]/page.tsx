"use client";
import { genderOptions } from "@/app/constant/selectOptions";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import PHSelect from "@/components/ui/Form/PHSelect";
import {
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctor.api";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorEditPage = ({ params }: TParams) => {
  const doctorId = params.doctorId;
  const router = useRouter();
  const { data, isLoading } = useGetSingleDoctorQuery(doctorId);
  const [updateDoctor] = useUpdateDoctorMutation();

  const doctorDefaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    apointmentFee: data?.apointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };

  const onSubmit = async (value: FieldValues) => {
    value.experience = Number(value.experience);
    value.apointmentFee = Number(value.apointmentFee);
    try {
      const response = await updateDoctor({
        body: value,
        id: doctorId,
      }).unwrap();
      console.log(response);
      if (response?.id) {
        toast.success("doctor update successfull");
        router.push("/dashboard/admin/doctors");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      {!isLoading ? (
        <PHForm defaultValues={data && doctorDefaultValues} onSubmit={onSubmit}>
          <Grid sx={{ mt: 2 }} container spacing={2}>
            <Grid item xs={12} md={4}>
              <PHInput label="Email" name="email" type="email" />
            </Grid>

            <Grid item xs={12} md={4}>
              <PHInput label="Name" name="name" type="text" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput
                label="Contact Number"
                name="contactNumber"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput label="Address" name="address" type="text" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput
                label="Registration Number"
                name="registrationNumber"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput label="Experience" name="experience" type="number" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHSelect
                label="Gender"
                name="gender"
                selectOptions={genderOptions}
                required={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput
                label="Apointment Fee"
                name="apointmentFee"
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput label="Qualification" name="qualification" type="text" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput
                label="Current Working Place"
                name="currentWorkingPlace"
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PHInput label="Designation" name="designation" type="text" />
            </Grid>
          </Grid>
          <Button sx={{ my: 2 }} type="submit">
            Save
          </Button>
        </PHForm>
      ) : (
        "loading..."
      )}
    </Box>
  );
};

export default DoctorEditPage;
