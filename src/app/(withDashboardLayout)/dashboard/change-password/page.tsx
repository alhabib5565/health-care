"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import KeyIcon from "@mui/icons-material/Key";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import PHForm from "@/components/ui/Form/PHForm";
import PHInput from "@/components/ui/Form/PHInput";
import { logoutUser } from "@/service/action/logoutUser";

const validationSchema = z.object({
  oldPassword: z.string().min(6, "Must be at least 6 characters long"),
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});
const ChangePasswordPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values);

      if ("data" in res && res.data.status === 200) {
        logoutUser(router);
        toast.success("Password Changed Successfully");
      } else {
        throw new Error("Incorrect Old Password");
      }
    } catch (error) {
      toast.success("Incorrect Old Password");
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
        mt: {
          xs: 2,
          md: 5,
        },
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
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
          Change password
        </Typography>
      </Stack>
      <PHForm
        onSubmit={onSubmit}
        defaultValues={{ oldPassword: "", newPassword: "" }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="oldPassword"
              type="password"
              label="Old Password"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="newPassword"
              type="password"
              label="New Password"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          change Password
        </Button>
      </PHForm>
    </Box>
  );
};

export default ChangePasswordPage;

/**
 * NODE_ENV="development"
PORT="5000"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/DATABASE?schema=public"
JWT_SECRET="YOUR_SECRET"
EXPIRES_IN="5m"
REFRESH_SECRET="YOUR_SECRET"
REFRESH_EXPIRES_IN="30d"
PASS_RESET_EXPIRATION_TIME="10m"
RESET_LINK =" http://localhost:3000/reset-password"
EMAIL="alhabib1948@gmail.com"
APP_PASS="cmvt iaak shdj ifrh"
SALT_ROUND="12"
SSL_PAYMENT_URL="https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
VALIDATION_URL="https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
STORE_ID="SSL STORE ID"
STORE_PASSWORD="SSL STORE PASSWORD"
SUCCESS_URL="http://localhost:3000/payment?status=success"
CANCEL_URL="http://localhost:3000/payment?status=cancel"
FAIL_URL="http://localhost:3000/payment?status=failed"
CLOUD_NAME="did7nddmb"
API_KEY="368345646839976"
API_SECRET="vVSE2kLDTreVxDmJtUBVYfdynK0"


 */
