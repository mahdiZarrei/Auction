import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contract, BrowserProvider } from "ethers";
import { AuctionABI } from "../data/AuctionABI";
import {
    getCollectedDataFromContract,
    getDataFromContractWithValue,
} from "../helper/transactions";

export const useGetAuctionInformation = () => {
    const { isConnected, address } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { AuctionAddress } = useParams();
    const [data, setData] = useState({
        buyerReceived: false,
        endAt: "loading",
        highestBid: "loading",
        highestBidder: "loading",
        isSeller: "loading",
        nft: "loading",
        seller: "loading",
        sellerRecived: false,
        started: false,
        tokenId: "loading",
        userOfferAmount: "loading",
        isHighestBidder: false,
    });
    const [AuctionContract, setAuctionContract] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            const Auction = new Contract(AuctionAddress, AuctionABI, signer);
            const contractFunctions = [
                ["nft", Auction.nft],
                ["tokenId", Auction.tokenId],
                ["seller", Auction.seller],
                ["sellerRecived", Auction.sellerReceived],
                ["started", Auction.started],
                ["endAt", Auction.endAt],
                ["highestBidder", Auction.highestBidder],
                ["highestBid", Auction.highestBid],
                ["buyerReceived", Auction.buyerReceived],
            ];
            const data = await getCollectedDataFromContract(contractFunctions);
            const block = await ethersProvider.getBlock();
            data["userOfferAmount"] = await getDataFromContractWithValue(
                Auction.bids,
                address
            );
            data["endAt"] =
                data.endAt === 0n ? 0n : data.endAt - BigInt(block.timestamp);
            data["ended"] = data.endAt < 0n;
            data["isSeller"] = address === data.seller;
            data["isHighestBidder"] = address === data.highestBidder;
            setData(data);
            setAuctionContract(Auction);
        };
        if (isConnected) {
            fetchData();
        }
    }, [isConnected]);
    return { data, AuctionContract, setData };
};
