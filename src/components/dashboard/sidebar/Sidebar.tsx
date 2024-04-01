import { Box, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Stack } from "@mui/material";
import Image from "next/image";
import logo from "../../../assets/svgs/logo.svg";
import Divider from "@mui/material/Divider";
import { genarateSidebarItems } from "@/utils/genarateSidebarItems";
import { getUserInfo } from "@/app/auth.service";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";

const SidebarItems = () => {
  const [userRole, setUserRole] = useState<UserRole>();
  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);
  return (
    <div>
      <Stack direction="row" alignItems="center" gap={2} p={1.5}>
        <Image height={40} width={40} src={logo} alt="health care logo" />
        <Typography component="h6" variant="h6">
          PH Health Care
        </Typography>
      </Stack>
      <Divider />
      <List>
        {genarateSidebarItems(userRole as UserRole).map((item, index) => (
          <SidebarItem item={item} key={index} />
        ))}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default SidebarItems;
