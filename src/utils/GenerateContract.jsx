import { ethers } from "ethers";
import { AuctionABI } from "../data/AuctionABI";

import { AuctionByteCode } from "../data/AuctionByteCode";
export const GeneratorContract = async (values, signer) => {
  const contractFactory = new ethers.ContractFactory(
    AuctionABI,
    AuctionByteCode,
    signer
  );

  const contract = await contractFactory.deploy(
    values.address,
    values.tID,
    values.Bid
  );
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  //    contract.deployed();
  console.log("Contract deployed at address:", address);
  return address;
};
