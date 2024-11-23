import {
  Ellipsis,
  File,
  FileImage,
  FileVideo,
  LayoutDashboard,
} from "lucide-react";

export const navItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    name: "Documents",
    icon: File,
    url: "/documents",
  },
  {
    name: "Images",
    icon: FileImage,
    url: "/images",
  },
  {
    name: "Media",
    icon: FileVideo,
    url: "/media",
  },
  {
    name: "Others",
    icon: Ellipsis,
    url: "/others",
  },
];
