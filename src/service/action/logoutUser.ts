import { authkey } from "@/app/constant/authkey";
import { removeFromLocalStorage } from "@/utils/local.storage";
import { deleteCookie } from "./deleteCookie";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = (router: AppRouterInstance) => {
  removeFromLocalStorage(authkey);
  deleteCookie([authkey, "refreshToken"]);
  router.refresh();
  router.push("/");
};
