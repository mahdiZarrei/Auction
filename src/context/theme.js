import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#313552",
    },

    secondary: {
      main: "#2EB086",
    },
    text: {
      secondary: "#EEEEEE",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "#03DAC5",
    },
  },
});
