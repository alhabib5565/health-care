"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import CheckIcon from "@mui/icons-material/Check";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import { useResetPasswordMutation } from "@/redux/api/auth.api";
import { useEffect } from "react";
import { authkey } from "@/app/constant/authkey";
import { deleteCookie } from "@/service/action/deleteCookie";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  newPassword: z.string().min(6, "New password must be at least 6"),
});

const ResetPasswordPage = ({ searchParams }: any) => {
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation();

  const id = searchParams.id;
  const token = searchParams.token;
  useEffect(() => {
    if (!token) return;
    localStorage.setItem(authkey, token);
  }, [token]);
  const onSubmit = async (values: FieldValues) => {
    const updatedData = { ...values, id };

    try {
      const res = await resetPassword(updatedData);
      console.log(res);
      if ("data" in res && res.data.status === 200) {
        toast.success("Password Reset Successful");
        localStorage.removeItem(authkey);
        deleteCookie([authkey, "refreshToken"]);
        router.push("/login");
      } else {
        throw new Error("Something Went Wrong, Try Again");
      }
    } catch (error) {
      toast.success("Something Went Wrong, Try Again");
    }
  };
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: { sm: "100vh" },
      }}
    >
      <Box
        sx={{
          px: 4,
          py: 2,
          maxWidth: 600,
          width: "100%",
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Box
            sx={{
              "& svg": {
                width: 100,
                height: 100,
              },
            }}
          >
            <KeyIcon sx={{ color: "primary.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
            Reset password
          </Typography>
        </Stack>

        <PHForm
          onSubmit={onSubmit}
          defaultValues={{ newPassword: "" }}
          resolver={zodResolver(validationSchema)}
        >
          <Grid>
            <Grid item xs={12} sm={12} md={6}>
              <PHInput
                name="newPassword"
                type="password"
                label="Enter new password"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit" sx={{ width: "100%", my: 2 }}>
            Reset Password
          </Button>
        </PHForm>
      </Box>
    </Stack>
  );
};

export default ResetPasswordPage;
