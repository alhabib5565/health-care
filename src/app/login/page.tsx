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
import { useForm } from "react-hook-form";
import logo from "../../assets/svgs/logo.svg";
import Link from "next/link";
import { toast } from "sonner";
import { loginUser } from "@/service/action/logitUser";
import { storeUserInfo } from "../auth.service";
import { useRouter } from "next/navigation";

export type TLoginUserInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<TLoginUserInputs>();
  const onSubmit = async (data: TLoginUserInputs) => {
    try {
      const response = await loginUser(data);
      if (response.data.accessToken) {
        router.push("/");
        toast.success(response.message);
        storeUserInfo(response.data.accessToken);
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="email"
                size="small"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                {...register("email")}
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
        </form>
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
