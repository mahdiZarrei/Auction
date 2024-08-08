// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/// @title Auction Contract for NFTs
/// @notice This contract allows users to auction their NFTs in a decentralized manner.
contract Auction {
    IERC721 public nft;
    uint256 public tokenId;

    address payable public seller;
    bool public sellerReceived = false;

    bool public started;
    uint256 public endAt;

    address public highestBidder;
    uint256 public highestBid;
    bool public buyerReceived = false;
    mapping(address => uint256) public bids;

    /// @notice Emitted when the auction starts
    event Start();
    /// @notice Emitted when a new bid is placed
    /// @param sender The address of the bidder
    /// @param amount The amount of the bid
    event Bid(address indexed sender, uint256 amount);
    /// @notice Emitted when a bidder withdraws their bid
    /// @param bidder The address of the bidder
    /// @param amount The amount withdrawn
    event Withdraw(address indexed bidder, uint256 amount);
    /// @notice Emitted when the seller receives the auction amount
    /// @param seller The address of the seller
    /// @param amount The amount received
    event SellerReceivedAmount(address seller, uint256 amount);
    /// @notice Emitted when the buyer receives the NFT
    /// @param buyer The address of the buyer
    /// @param nft The address of the NFT
    event BuyerReceivedNFT(address buyer, address nft);

    /// @notice Thrown when the auction has not started yet
    error NotStartedYet();
    /// @notice Thrown when the auction has not ended yet
    error NotEndedYet();
    /// @notice Thrown when the auction has already started
    error AlreadyStarted();
    /// @notice Thrown when the caller is not the seller
    error OnlySeller();
    /// @notice Thrown when the caller is not the highest bidder
    error OnlyBuyer();
    /// @notice Thrown when the auction has ended
    error AuctionEnded();

    /// @notice Ensures the auction has started
    modifier isStart() {
        if (!started) {
            revert NotStartedYet();
        }
        _;
    }

    /// @notice Ensures the caller is the seller
    modifier onlySeller() {
        if (msg.sender != seller) {
            revert OnlySeller();
        }
        _;
    }

    /// @notice Ensures the caller is the highest bidder
    modifier onlyBuyer() {
        if (msg.sender != highestBidder) {
            revert OnlyBuyer();
        }
        _;
    }

    /// @notice Ensures the auction has ended
    modifier isEnded() {
        if (block.timestamp < endAt) {
            revert NotEndedYet();
        }
        _;
    }

    /// @notice Initializes the contract by setting the NFT, token ID, and starting bid
    /// @param _nft The NFT to be auctioned
    /// @param _tokenId The token ID of the NFT
    /// @param _startingBid The starting bid for the auction
    constructor(
        IERC721 _nft,
        uint256 _tokenId,
        uint256 _startingBid
    ) payable {
        nft = _nft;
        tokenId = _tokenId;
        seller = payable(msg.sender);
        highestBid = _startingBid;
        highestBidder = msg.sender;
    }

    /// @notice Starts the auction
    /// @param endTime The duration of the auction in seconds
    function start(uint256 endTime) external onlySeller {
        if (started) {
            revert AlreadyStarted();
        }
        nft.transferFrom(msg.sender, address(this), tokenId);
        started = true;
        endAt = block.timestamp + endTime;

        emit Start();
    }

    /// @notice Allows users to place a bid on the NFT
    function bid() external payable isStart {
        if (block.timestamp > endAt) {
            revert AuctionEnded();
        }
        require(bids[msg.sender] + msg.value > highestBid, "value < highest");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit Bid(msg.sender, msg.value);
    }

    /// @notice Allows bidders to withdraw their bids after the auction ends
    function withdraw() external isStart isEnded {
        require(bids[msg.sender] != 0, "you have not offered");

        uint256 balance = bids[msg.sender];
        bids[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        assert(success);

        emit Withdraw(msg.sender, balance);
    }

    /// @notice Allows the seller to withdraw the highest bid amount after the auction ends
    function withdrawNFTPrice() external isStart onlySeller isEnded {
        require(!sellerReceived, "you already withdrawn");

        sellerReceived = true;
        (bool success, ) = seller.call{value: highestBid}("");
        assert(success);

        emit SellerReceivedAmount(seller, highestBid);
    }

    /// @notice Allows the highest bidder to withdraw the NFT after the auction ends
    function withdrawNFT() public isStart isEnded onlyBuyer {
        require(!buyerReceived, "you already withdrawn");

        buyerReceived = true;
        nft.safeTransferFrom(address(this), highestBidder, tokenId);

        emit BuyerReceivedNFT(highestBidder, address(nft));
    }
}