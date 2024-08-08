import { Card, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

import AuctionContext from "../../context/AuctionContext";
import {
  getDataFromContractWithValue,
  transaction,
} from "../../helper/transactions";

const Harvest = () => {
  const { data, AuctionContract, setData } = useContext(AuctionContext);
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  useEffect(() => {
    if (data.started && data.ended && data.userInventory !== 0n) {
      setShow(true);
    } else if (
      data.started &&
      data.ended &&
      data.isHighestBidder &&
      !data.buyerReceived
    ) {
      setShow(true);
    }
  });
  const Onclick = async () => {
    if (data.ended && data.isHighestBidder) {
      await transaction(
        AuctionContract.withdrawNFT,
        null,
        setDisabled,
        isConnected,
        open
      );
      const tx = await getDataFromContractWithValue(
        Auction.buyerReceived,
        address
      );
      setData((prev) => ({
        ...prev,
        buyerReceived: tx,
      }));
    } else {
      await transaction(
        AuctionContract.withdraw,
        null,
        setDisabled,
        isConnected,
        open
      );
      const tx = await getDataFromContractWithValue(Auction.bids, address);
      setData((prev) => ({
        ...prev,
        userOfferAmount: tx,
      }));
    }
  };
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
            {data.ended && data.isHighestBidder ? "get nft" : "Harvest"}
          </Typography>
          <Typography variant="p" ml={2} mt={1}>
            {data.ended && data.isHighestBidder
              ? "you win you can get your nft"
              : "Take your money for a higher offer than the one you were given"}
          </Typography>
          {!(data.ended && data.isHighestBidder) && (
            <Typography variant="p" component="div" ml={2}>
              your offer amount is : {data.userOfferAmount.toString()} Wei
            </Typography>
          )}
          <Button
            disabled={disabled}
            variant="contained"
            onClick={() => Onclick()}
            sx={{
              mb: 4,
              mt: 3,
              fontSize: 25,
              width: "90%",
              ml: "5%",
            }}
          >
            Harvest
          </Button>
        </Card>
      )}
    </>
  );
};

export default Harvest;
