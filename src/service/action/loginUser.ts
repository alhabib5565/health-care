import { FieldValues } from "react-hook-form";
import { setAccessToken } from "./setAccessToken";

export const loginUser = async (data: FieldValues) => {
  const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const userInfo = await res.json();
  const accessToken = userInfo?.data?.accessToken;
  if (accessToken) {
    setAccessToken(accessToken, { redirect: "/dashboard" });
  }
  return userInfo;
};
