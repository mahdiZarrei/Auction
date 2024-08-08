import { Typography, Box } from "@mui/material";
const Page_404 = () => {
  return (
    <Box
      width="100%"
      height="97vh"
      sx={{
        alignItems: "center",
        textAlign: "center",
        m: 0,
        p: 0,
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          flexGrow: 1,
          fontSize: "100px",
          pl: "5vw",
          pt: "4vw",
          color: "#313552",
        }}
      >
        404
        <Typography
          variant="p"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { md: "5vw", sm: "7vw", xs: "10vw" },
          }}
        >
          Page is not definde ...
        </Typography>
      </Typography>
    </Box>
  );
};

export default Page_404;
