import { object, string } from "yup";
import { useFormik } from "formik";
import { UilChart } from "@iconscout/react-unicons";
import {
  Box,
  useTheme,
  Typography,
  Button,
  TextField,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const User = () => {
  const navigate = useNavigate();

  const addressValid = object({
    address: string()
      .required("address to is required")
      .max(45, "More than 45 characters"),
  });
  const addressValidFormik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: addressValid,
    onSubmit: (values, { resetForm }) => {
      manageTokenOnClick(values);
      resetForm();
    },
  });

  const manageTokenOnClick = (values) => {
    navigate(`Auction/${values.address}`);
  };
  return (
    <Box
      sx={{
        width: 395,
        height: "100%",
        mr: 10,
        display: { md: "block", xs: "none" },
        lineHeight: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        If the desired auction is made in this
      </Typography>
      <Box
        component="form"
        sx={{ width: "100%" }}
        onSubmit={addressValidFormik.handleSubmit}
      >
        <Box
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              color: "white",
              textAlign: "center",
            }}
          >
            <UilChart />
          </Avatar>
          <Typography variant="h4">Auction</Typography>
        </Box>
        <Typography sx={{ mt: 2 }} variant="h6">
          address :
        </Typography>
        <TextField
          id="address"
          name="address"
          label="address"
          value={addressValidFormik.values.address}
          onChange={addressValidFormik.handleChange}
          onBlur={addressValidFormik.handleBlur}
          error={
            addressValidFormik.touched.address &&
            addressValidFormik.errors.address
          }
          helperText={
            addressValidFormik.touched.address &&
            addressValidFormik.errors.address
          }
          sx={{ mt: 2 }}
          required
          fullWidth
          autoFocus
        />
        <Button
          disabled={addressValidFormik.errors.address ? true : false}
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, fontSize: 15 }}
        >
          Go to Auction
        </Button>
      </Box>
    </Box>
  );
};

export default User;
