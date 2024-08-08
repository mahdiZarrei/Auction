import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  TextField,
} from "@mui/material";
import { BrowserProvider } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useWeb3Modal,
} from "@web3modal/ethers/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { UilChart } from "@iconscout/react-unicons";

import { GeneratorContract } from "../../utils/GenerateContract";
import { MadeValid } from "../../validations/Made";

import SucceedModal from "./Modal.jsx";

const Made = () => {
  const [btn, setBtn] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAdrress] = useState("");
  const formik = useFormik({
    initialValues: {
      address: "",
      tID: Number,
      Bid: Number,
    },
    validationSchema: MadeValid,
    onSubmit: (values, { resetForm }) => {
      onclick(values);
      resetForm();
    },
  });
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();

  const onclick = async (values) => {
    try {
      setBtn(false);
      if (!isConnected) {
        open();
        setBtn(true);
        throw toast.error("User disconnected");
      }
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      try {
        const contract = await toast.promise(
          GeneratorContract(values, signer),
          {
            pending: "pending transaction",
            success: "ICO created successfully",
            error: "ERROR",
          }
        );
        setAdrress(contract);
        setBtn(true);
        setOpenModal(true);
      } catch (error) {
        toast.error(error.code);
        setBtn(true);
      }
    } catch (error) {}
  };
  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Box
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
          alignItems: "center",
          mb: 5,
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
        <Typography variant="h4">Made Auction</Typography>
      </Box>
      <Grid container spacing={2} sx={{ textAlign: "center" }}>
        <Grid item xs={12} sm={12}>
          <TextField
            autoFocus
            error={
              formik.touched.address && formik.errors.address ? true : false
            }
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : null
            }
            name="address"
            sx={{
              width: {
                xs: "92%",
                md: "100%",
                sm: "98%",
              },
            }}
            id="address"
            label="NFT address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.tID && formik.errors.tID ? true : false}
            value={formik.values.tID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.tID && formik.errors.tID ? formik.errors.tID : null
            }
            name="tID"
            sx={{
              width: {
                xs: "92%",
                md: "100%",
                sm: "98%",
              },
            }}
            id="tID"
            label="Token ID"
            type="number"
          />
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          <TextField
            error={formik.touched.Bid && formik.errors.Bid ? true : false}
            value={formik.values.Bid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.Bid && formik.errors.Bid ? formik.errors.Bid : null
            }
            type="number"
            name="Bid"
            sx={{
              width: {
                xs: "92%",
                md: "100%",
                sm: "98%",
              },
            }}
            id="Bid"
            label="starting Bid"
          />
        </Grid>
      </Grid>
      <Button
        disabled={
          formik.errors.address || formik.errors.Bid || formik.errors.ID || !btn
            ? true
            : false
        }
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 3, fontSize: 15 }}
      >
        Made Auction
      </Button>
      <SucceedModal
        onChange={(newOpen) => setOpenModal(newOpen)}
        open={openModal}
        ICOAddress={address}
      />
    </Box>
  );
};

export default Made;
