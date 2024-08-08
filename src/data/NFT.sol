// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint256 private _tokenIdCounter;
    address public owner;

    constructor() ERC721("Nft", "Rak") {
        owner = msg.sender;
        _tokenIdCounter = 0;
    }

    function createToken(string memory _tokenURI) public returns (uint) {
        require(_tokenIdCounter < 10000, "No more NFTs can be minted");
        uint256 newItemId = _tokenIdCounter;
        _tokenIdCounter++;
        string memory tokenURI = _tokenURI;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
// 0x69b744b1c5a1A06929A618A9627Cce2314D5Bed1