"use client";
import { getUserInfo } from "@/app/auth.service";
import { authkey } from "@/app/constant/authkey";
import { removeFromLocalStorage } from "@/utils/local.storage";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeFromLocalStorage(authkey);
    router.refresh();
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
