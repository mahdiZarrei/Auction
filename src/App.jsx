import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./context/theme";

const App = ({ children, mode }) => {
  const Theme = mode === "dark" ? darkTheme : lightTheme;
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>{children} </ThemeProvider>
    </div>
  );
};

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { Button, Box } from "@mui/material";
// import Informtion from "./pages/informtion";
// import Airdrop from "./pages/Airdrop";
// import Purchase from "./pages/Purchase";
// import Deadline from "./pages/admin/Deadline";
// import BalanceManager from "./pages/admin/BalanceManager";
// import Footer from "./components/Footer/index";
// function App() {
//   return (
//     <>
{
  /* <Box
  // display={"flex"}
  width="100%"
>
  <Informtion />
  <Box mt={2} display={"flex"} justifyContent={"center"}>
    <Airdrop />
  </Box>
  <Box mt={2} display={"flex"} justifyContent={"center"}>
    <Purchase />
  </Box>
  <Box>
    <Box mt={2} display={"flex"} justifyContent={"center"}>
      <Deadline />
    </Box>
    <Box mt={2} display={"flex"} justifyContent={"center"}>
      <BalanceManager />
    </Box>
  </Box>
  <Footer />
</Box> */
}
//     </>
//   );
// }

// export default App;
