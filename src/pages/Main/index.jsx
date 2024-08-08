import { useState } from "react";

import { Box, Card, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/index.jsx";

import image from "./image.png";
import User from "./User";
import Made from "./Made.jsx";

const Main = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <AppBar />
      <Card
        sx={{
          mt: { md: 12, sm: 9, xs: 7 },
          display: { xs: "grid", md: "flex" },
          ml: "1%",
          mr: "1%",
          mb: "1%",
          justifyContent: { xs: "center", md: "space-between" },

          borderRadius: 11,
        }}
      >
        <Box
          display={{ md: "grid", sm: "none", xs: "none" }}
          sx={{ mt: 5, width: 500 }}
          component="img"
          src={image}
        />
        <Box
          sx={{
            width: 500,
          }}
        >
          <TabContext value={value}>
            <Box sx={{ mt: 10 }}>
              <TabList onChange={handleChange} centered>
                <Tab label="User" value="1" />
                <Tab label="made" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <User />
            </TabPanel>
            <TabPanel value="2">
              <Made />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
      <Footer />
    </>
  );
};

export default Main;
