/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";

// import { Gender } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctor.api";
import { useGetSpecialtiesQuery } from "@/redux/api/specialties.api";
import FullScreenDialog from "@/components/shared/dialog/FullScreenModal";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import PHSelect from "@/components/ui/Form/PHSelect";
import { genderOptions } from "@/app/constant/selectOptions";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  experience: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  apointmentFee: z.preprocess(
    (x) => (x ? x : undefined),
    z.coerce.number().int().optional()
  ),
  name: z.string().optional(),
  contactNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  gender: z.string().optional(),
  qualification: z.string().optional(),
  currentWorkingPlace: z.string().optional(),
  designation: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data: doctorData, refetch, isSuccess } = useGetSingleDoctorQuery(id);
  const { data: allSpecialties } = useGetSpecialtiesQuery(undefined);
  const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState([]);

  const [updateDoctor, { isLoading: updating }] = useUpdateDoctorMutation();

  useEffect(() => {
    if (!isSuccess) return;

    setSelectedSpecialtiesIds(
      doctorData?.doctorSpecialties.map((sp: any) => {
        return sp.specialtiesId;
      })
    );
  }, [isSuccess]);

  const submitHandler = async (values: FieldValues) => {
    const specialties = selectedSpecialtiesIds.map((specialtiesId: string) => ({
      specialtiesId,
      isDeleted: false,
    }));

    console.log({ id });
    // return;

    const excludedFields: Array<keyof typeof values> = [
      "email",
      "id",
      "role",
      "needPasswordChange",
      "status",
      "createdAt",
      "updatedAt",
      "isDeleted",
      "averageRating",
      "review",
      "profilePhoto",
      "registrationNumber",
      "schedules",
      "doctorSpecialties",
    ];

    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key]) => {
        return !excludedFields.includes(key);
      })
    );

    updatedValues.specialties = specialties;

    try {
      updateDoctor({ body: updatedValues, id });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FullScreenDialog open={open} setOpen={setOpen} title="Update Profile">
      <PHForm
        onSubmit={submitHandler}
        defaultValues={doctorData}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="name" label="Name" type="text" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="email" type="email" label="Email" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="contactNumber" label="Contract Number" type="text" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="address" label="Address" type="text" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="registrationNumber"
              label="Registration Number"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="experience" type="number" label="Experience" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHSelect
              selectOptions={genderOptions}
              name="gender"
              label="Gender"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="apointmentFee" type="number" label="ApointmentFee" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="qualification" label="Qualification" type="text" />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="currentWorkingPlace"
              label="Current Working Place"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput name="designation" label="Designation" type="text" />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            {/* <MultipleSelectChip
              allSpecialties={allSpecialties}
              selectedIds={selectedSpecialtiesIds}
              setSelectedIds={setSelectedSpecialtiesIds}
            /> */}
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Save
        </Button>
      </PHForm>
    </FullScreenDialog>
  );
};

export default ProfileUpdateModal;
