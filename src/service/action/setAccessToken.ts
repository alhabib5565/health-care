"use server";
import { authkey } from "@/app/constant/authkey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setAccessToken = (token: string, option: { redirect: string }) => {
  cookies().set(authkey, token);
  if (option) {
    redirect(option.redirect);
  }
};
