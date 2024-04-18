"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import logo from "../../assets/svgs/logo.svg";
import Link from "next/link";
import { toast } from "sonner";
import { loginUser } from "@/service/action/loginUser";
import { storeUserInfo } from "../auth.service";
import { useRouter } from "next/navigation";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormValidationShcema = z.object({
  email: z.string().email("Email es required"),
  password: z.string().min(6, "password must be at least 6 character"),
});

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response);
      if (response?.data?.accessToken) {
        storeUserInfo(response.data.accessToken);
        router.push("/dashboard");
        toast.success(response.message);
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
          resolver={zodResolver(loginFormValidationShcema)}
          onSubmit={onSubmit}
        >
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <PHInput
                required={true}
                type="email"
                label="Email"
                name="email"
              />
            </Grid>
            <Grid item xs={6}>
              <PHInput
                required={true}
                type="password"
                label="Password"
                name="password"
              />
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            component="p"
            fontWeight={300}
            fontSize={14}
            textAlign="end"
            mt={1}
          >
            Forget password
          </Typography>
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
          Don`&apos;`t have an account?{" "}
          <Link href="/register" className="text-blue-500 font-semibold">
            Create an account
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
