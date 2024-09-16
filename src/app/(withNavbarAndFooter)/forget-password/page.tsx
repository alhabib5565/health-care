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
import { useForgotPasswordMutation } from "@/redux/api/auth.api";

const validationSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
});

const ForgetPasswordPage = () => {
  const [forgetPassword, { isSuccess }] = useForgotPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    const res = await forgetPassword(data);
    console.log(res);
    if ("data" in res && res.data.status === 200) {
      toast.success("Check Your Email for Reset Link");
    } else {
      toast.error("Something Went Wrong, Try Again");
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
            Forgot password
          </Typography>
        </Stack>

        {isSuccess && (
          <Box>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              An Email with reset password link was sent to your email
            </Alert>
          </Box>
        )}

        {!isSuccess && (
          <PHForm
            onSubmit={onSubmit}
            defaultValues={{ email: "" }}
            resolver={zodResolver(validationSchema)}
          >
            <Grid>
              <Grid item xs={12} sm={12} md={6}>
                <PHInput
                  name="email"
                  type="email"
                  label="Your email"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>

            <Button type="submit" sx={{ width: "100%", my: 2 }}>
              forgot Password
            </Button>
          </PHForm>
        )}
      </Box>
    </Stack>
  );
};

export default ForgetPasswordPage;
