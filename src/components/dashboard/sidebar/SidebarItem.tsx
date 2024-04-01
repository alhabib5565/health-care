import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DrawerItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SidebarItem = ({ item }: { item: DrawerItem }) => {
  const href = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={href}>
      <ListItem
        sx={
          pathName === href
            ? {
                bgcolor: `rgba(21, 134, 253, .1)`,
                "& svg ": {
                  color: "primary.main",
                },
                "& span ": {
                  color: "primary.main",
                },
                borderRight: "3px solid #1586FD",
              }
            : {}
        }
        disablePadding
      >
        <ListItemButton>
          {item.icon && (
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
          )}
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
