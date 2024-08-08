import App from "./App";
import { useEffect, useState } from "react";

import MainLayout from "./context/index";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
const AppContainer = () => {
  const [mode, setMode] = useState();
  useEffect(() => {
    setMode("light");
  }, []);
  const handleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <>
      <MainLayout.Provider value={{ handleTheme }}>
        <App mode={mode}>
          <RouterProvider router={router} />
        </App>
      </MainLayout.Provider>
    </>
  );
};

export default AppContainer;
