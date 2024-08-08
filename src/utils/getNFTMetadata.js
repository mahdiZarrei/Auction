// Importing the required modules
import { Network, Alchemy } from "alchemy-sdk";
// Configuring Alchemy SDK with your API key and network
const settings = {
  apiKey: "CR7UC11_cqrgFloxxIQ5snmJY2EE46al", // Replace with your Alchemy API Key.
  network: Network.ETH_SEPOLIA, // Replace with the network your NFT is on.
};

// Creating an Alchemy instance to make calls to the Alchemy API
const alchemy = new Alchemy(settings);
export const getNFTMetadata = async (nftContractAddress, tokenId) => {
  const response = await alchemy.nft.getNftMetadata(
    nftContractAddress,
    tokenId
  );
  return response; // returning the metadata
};
