import { useContext, useEffect, useState } from "react";
import { Card, Button, Typography, Box, TextField } from "@mui/material";
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import AuctionContext from "../../../context/AuctionContext";

import {
  checkUserConnected,
  createContract,
  getCollectedDataFromContract,
  getDataFromContract,
  getDataFromContractWithValue,
  require,
  transactionOnlyOwner,
} from "../../../helper/transactions";

import { nftABI } from "../../../data/nftABI";
import { startValid } from "../../../validations/Start";

const Panel = () => {
  const [disabledH, setDisabledH] = useState(false);
  const [disabledS, setDisabledS] = useState(false);
  const { isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const [show, setShow] = useState("");
  const { data, AuctionContract, setData } = useContext(AuctionContext);
  const [disabled, setDisabled] = useState(false);
  const formik = useFormik({
    initialValues: {
      start: Number,
    },
    validationSchema: startValid,
    onSubmit: (values, { resetForm }) => {
      onclick(values);
      resetForm();
    },
  });
  const onclick = async (values) => {
    const NFT = await createContract(data.nft, nftABI, walletProvider);
    const allowance = await getDataFromContractWithValue(
      NFT.getApproved,
      data.tokenId
    );
    console.log(AuctionContract);
    if (allowance !== AuctionContract.target) {
      toast.error("you should approve to Auction contract first");
      throw new Error("you should approve to Auction contract first");
    }
    await transactionOnlyOwner(
      AuctionContract.start,
      values.start * 86400,
      setDisabledS,
      isConnected,
      open,
      data.isSeller
    );
    const contractFunctions = [
      ["started", AuctionContract.started],
      ["endAt", AuctionContract.endAt],
    ];
    const tx = await getCollectedDataFromContract(contractFunctions);
    setData((prev) => ({
      ...prev,
      started: tx.started,
      endAt: tx.endAt,
    }));
  };
  const OnclickH = async () => {
    checkUserConnected(isConnected);
    require(data.isSeller, "you not seller");
    require(!(data.started && data.ended), "Auction not ended yet");
    await transactionOnlyOwner(
      AuctionContract.withdrawNFTPrice,
      null,
      setDisabled,
      isConnected,
      open
    );
    const tx = await getDataFromContract(Auction.sellerReceived);
    setData((prev) => ({
      ...prev,
      sellerReceived: tx,
    }));
  };

  useEffect(() => {
    if (data.isSeller !== "loading" && data.isSeller) {
      if (!data.sellerRecived && data.ended) {
        setShow("harvest");
      } else if (!data.started) {
        setShow("start");
      } else {
        setShow(false);
      }
    }
  });
  return (
    <>
      {show && (
        <Card
          sx={{
            width: "98%",
            ml: "1%",
            mt: 2,
          }}
        >
          <Typography variant="h3" ml={2} mt={2}>
            Panel Owner
          </Typography>
          {show === "harvest" && (
            <Button
              onClick={() => OnclickH()}
              disabled={disabledH}
              variant="contained"
              sx={{
                mb: 4,
                mt: 3,
                fontSize: 25,
                width: "42.5%",
                ml: "5%",
              }}
            >
              Harvest
            </Button>
          )}
          {show === "start" && (
            <Box component="form" onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ mb: 4, mt: 3, width: "42.5%", ml: "5%" }}
                id="start"
                name="start"
                label="How many days"
                type="number"
                error={
                  formik.touched.start && formik.errors.start ? true : false
                }
                value={formik.values.start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.start && formik.errors.start
                    ? formik.errors.start
                    : null
                }
              />
              <Button
                type="submit"
                disabled={formik.errors.start || disabled ? true : false}
                variant="contained"
                sx={{
                  mb: 4,
                  mt: 3,
                  fontSize: 25,
                  width: "42.5%",
                  ml: "5%",
                }}
              >
                Start Auction
              </Button>
            </Box>
          )}
        </Card>
      )}
    </>
  );
};

export default Panel;
