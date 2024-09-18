import { authkey } from "@/app/constant/authkey";
import { decodeToken } from "@/utils/decodeToken";
import { getFromLocalStorage } from "@/utils/local.storage";
import React, { useEffect, useState } from "react";

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const accessToken = getFromLocalStorage(authkey);
  useEffect(() => {
    if (accessToken) {
      const userInfo: any = decodeToken(accessToken);
      setUserInfo({
        ...userInfo,
        role: userInfo?.role?.toLowerCase(),
      });
    }
  }, [accessToken]);
  return userInfo;
};

export default useUserInfo;
