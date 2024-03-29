"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "../../assets/svgs/logo.svg";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/service/action/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "@/service/action/logitUser";
import { storeUserInfo } from "../auth.service";

type TPatientRegisterData = {
  password: string;
  patient: {
    name: string;
    email: string;
    address: string;
    contactNumber: string;
  };
};

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TPatientRegisterData>();
  const onSubmit = async (data: FieldValues) => {
    try {
      const modifyedData = modifyPayload(data);
      console.log(modifyedData);
      const response = await registerPatient(modifyedData);
      if (response.data) {
        toast.success(response.message);
        const loginResponse = await loginUser({
          password: data.password,
          email: data.patient.email,
        });
        console.log(loginResponse);
        if (loginResponse.data.accessToken) {
          router.push("/");
          storeUserInfo(loginResponse.data.accessToken);
        }
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      sx={{
        my: 5,
        display: "grid",
        placeItems: "center",
        height: "85vh",
      }}
    >
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 1,
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
          }}
        >
          <Image src={logo} alt="logo" width={50} />
          <Typography component="h6" mt={2} variant="h5" fontWeight={600}>
            Patient Register
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                {...register("patient.name")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="email"
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                {...register("patient.email")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="password"
                size="small"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="outlined-basic"
                label="Contact number"
                variant="outlined"
                {...register("patient.contactNumber")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                id="outlined-basic"
                label="Address"
                variant="outlined"
                {...register("patient.address")}
              />
            </Grid>
          </Grid>
          <Button type="submit" sx={{ my: 3 }} fullWidth>
            Register
          </Button>
        </form>
        <Typography
          variant="body1"
          component="p"
          fontWeight={300}
          fontSize={14}
          textAlign="center"
        >
          Do you already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
