"use client";
import { getUserInfo } from "@/app/auth.service";
import { authkey } from "@/app/constant/authkey";
import { deleteCookie } from "@/service/action/deleteCookie";
import { logoutUser } from "@/service/action/logoutUser";
import { removeFromLocalStorage } from "@/utils/local.storage";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser(router);
  };
  return (
    <div>
      {userInfo?.userId ? (
        <Button color="warning" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </div>
  );
};

export default AuthButton;
