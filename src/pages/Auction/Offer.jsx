import { useContext, useState } from "react";
import { useFormik } from "formik";
import Countdown from "react-countdown";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Box, Typography, Button, TextField, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { UilChart } from "@iconscout/react-unicons";

import { offerValid } from "../../validations/offer";
import AuctionContext from "../../context/AuctionContext";

import { getDataFromContract, transaction } from "../../helper/transactions";

const User = () => {
  const offerValidFormik = useFormik({
    initialValues: {
      offer: "",
    },
    validationSchema: offerValid,
    onSubmit: (values, { resetForm }) => {
      OnClick(values);
      resetForm();
    },
  });
  const [disabled, setDisabled] = useState(false);
  const { data, AuctionContract, setData } = useContext(AuctionContext);
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();

  const OnClick = async (values) => {
    console.log(data);
    if (values.offer < data.highestBid) {
      toast.error("The offer is lower than the last offer");
      throw new Error("The offer is lower than the last offer");
    }
    await transaction(
      AuctionContract.bid,
      {
        value: values.offer,
      },
      setDisabled,
      isConnected,
      open
    );
    const tx = await getDataFromContract(AuctionContract.highestBid);
    setData((prev) => ({
      ...prev,
      highestBid: tx,
    }));
  };
  return (
    <Box width={"52%"}>
      <Box
        sx={{
          width: "70%",
          mt: "15%",
          ml: "15%",
          lineHeight: 2,
          mb: "10%",
        }}
      >
        <Typography
          variant="h5"
          mb={4}
          pb={1}
          textAlign="center"
          borderBottom={"2px solid"}
        >
          Last offer :{" "}
          {!isConnected
            ? "you not connected"
            : data.highestBid === "loading"
            ? "loading"
            : data.highestBid.toString() + "Wei"}
        </Typography>
        <Box sx={{ fontSize: "3vw", textAlign: "center" }}>
          <Countdown
            date={
              data.endAt === "loading"
                ? Date.now()
                : Date.now() + Number(data.endAt) * 1000
            }
          />
        </Box>
        <Box
          component="form"
          sx={{ width: "100%" }}
          onSubmit={offerValidFormik.handleSubmit}
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
            your offer :
          </Typography>
          <TextField
            id="offer"
            name="offer"
            label="offer"
            disabled={!data.started}
            value={offerValidFormik.values.offer}
            onChange={offerValidFormik.handleChange}
            onBlur={offerValidFormik.handleBlur}
            error={
              offerValidFormik.touched.offer &&
              Boolean(offerValidFormik.errors.offer)
            }
            helperText={
              offerValidFormik.touched.offer && offerValidFormik.errors.offer
            }
            sx={{ mt: 2 }}
            required
            fullWidth
            autoFocus
          />
          <Button
            disabled={
              offerValidFormik.errors.offer || !data.started || disabled
            }
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, fontSize: 15 }}
          >
            Offer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
