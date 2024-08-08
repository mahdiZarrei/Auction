import Card from "@mui/material/Card";

import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/index";

import NFT from "./NFT";
import Offer from "./Offer";
import Harvest from "./Harvest";
import Panel from "./admin/Panel";

import { useGetAuctionInformation } from "../../hooks/useGetInformation";
import AuctionContext from "../../context/AuctionContext";

import {
  useHandleAccountChanged,
  useHandleChainChanged,
} from "../../helper/handleChanged";

const Auction = () => {
  useHandleAccountChanged();
  useHandleChainChanged();
  const { data, AuctionContract, setData } = useGetAuctionInformation();
  return (
    <>
      <AppBar />
      <AuctionContext.Provider value={{ data, AuctionContract, setData }}>
        <Card
          sx={{
            mt: 10,
            display: "flex",
            width: "98%",
            ml: "1%",
            justifyContent: "center",
          }}
        >
          {data.nft !== "loading" || data.tokenId !== "loading" ? (
            <NFT data={data} />
          ) : (
            ""
          )}

          <Offer />
        </Card>
        {!data.isSeller && <Harvest />}
        {data.isSeller && <Panel />}
      </AuctionContext.Provider>
      <Footer />
    </>
  );
};
export default Auction;
