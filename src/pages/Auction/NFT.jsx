import { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { getNFTMetadata } from "../../utils/getNFTMetadata";

const NFT = ({ data }) => {
  const { isConnected } = useWeb3ModalAccount();
  const theme = useTheme();
  const [Information, setInformation] = useState({
    image: "loading",
    name: "loading",
    description: "loading",
  });
  useEffect(() => {
    const NFTMetadata = async () => {
      if (data.tokenId !== "loading" || data.nft !== "loading") {
        try {
          const response = await getNFTMetadata(data.nft, data.tokenId);
          setInformation({
            image: response.image.originalUrl,
            name: response.name,
            description: response.description,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (isConnected) {
      NFTMetadata();
    }
  }, [data]);
  return (
    <>
      <Box
        width={"48%"}
        textAlign={"center"}
        borderRight={`3px solid ${
          theme.palette.mode === "dark" ? "" : "#313552"
        }`}
      >
        <Box component="img" width="70%" mt={"15%"} src={Information.image} />
        <Typography gutterBottom variant="h3" mt={5} component="div">
          {Information.name}
        </Typography>
        <Box width={"70%"} ml={"15%"} mb={2}>
          <Typography variant="p">{Information.description}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default NFT;
