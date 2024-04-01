"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../assets/svgs/logo.svg";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/service/action/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "@/service/action/loginUser";
import { storeUserInfo } from "../auth.service";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TPatientRegisterData = {
  password: string;
  patient: {
    name: string;
    email: string;
    address: string;
    contactNumber: string;
  };
};

const patientRegisterValidationSchema = z.object({
  password: z.string().min(6, "password must be at least 6 character"),
  patient: z.object({
    email: z
      .string()
      .email("Please provide a vlid email")
      .min(1, "Email is required"),
    name: z.string().min(1, "Please provide you name"),
    contactNumber: z
      .string()
      .regex(/^\d{11}$/, "Please provide a valid phone number!"),
    address: z.string().min(1, "Address is required"),
  }),
});

const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    address: "",
    contactNumber: "",
  },
};

const RegisterPage = () => {
  const router = useRouter();
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
          router.push("/dashboard");
          storeUserInfo(loginResponse.data.accessToken);
        }
      } else {
        toast.error(response.message, {
          duration: 5000,
          position: "top-right",
          className: "text-red-500",
        });
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

        <PHForm
          defaultValues={defaultValues}
          resolver={zodResolver(patientRegisterValidationSchema)}
          onSubmit={onSubmit}
        >
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <PHInput
                required={true}
                type="text"
                name="patient.name"
                label="Name"
              />
            </Grid>
            <Grid item xs={6}>
              <PHInput
                required={true}
                type="email"
                name="patient.email"
                label="Email"
              />
            </Grid>
            <Grid item xs={6}>
              <PHInput
                type="password"
                name="password"
                required={true}
                label="Password"
              />
            </Grid>
            <Grid item xs={6}>
              <PHInput
                type="text"
                label="Contact number"
                name="patient.contactNumber"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <PHInput
                type="text"
                label="Address"
                name="patient.address"
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" sx={{ my: 3 }} fullWidth>
            Register
          </Button>
        </PHForm>
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
