import { Tooltip } from "@mui/material";
import { UilSetting, UilPlus, UilHome } from "@iconscout/react-unicons";

export const tabs = [
  {
    label: "/",
    text: "home",
    icon: <UilHome size="35" />,
  },
  {
    label: "/tokenGenerator",
    text: "generator",
    icon: <UilPlus size="35" />,
  },
  {
    label: "/TokenManager",
    text: "manager",

    icon: <UilSetting size="35" />,
  },
];
