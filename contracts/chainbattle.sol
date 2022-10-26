//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract chainbattle is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenids;
    mapping(uint256 => uint256) tokenidlevel;

    constructor() ERC721("Chain Battle", "CBT") {}

    function generatecharacter(uint256 tokenid) public returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">Warrior</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">Levels: getLevels(tokenId)</text>',
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getlevels(uint256 tokenid) public view returns (string memory) {
        uint256 levels = tokenidlevel[tokenid];
        return levels.toString();
    }

    function getTokenURI(uint256 tokenId) public returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Chain Battles #',
            tokenId.toString(),
            '",',
            '"description": "Battles on chain",',
            '"image": "',
            generatecharacter(tokenId),
            '"',
            "}"
            //JSON object is created
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint() public {
        _tokenids.increment();
        uint256 newitemid = _tokenids.current();
        _safeMint(msg.sender, newitemid);
        tokenidlevel[newitemid] = 0;
        _setTokenURI(newitemid, getTokenURI(newitemid));
    }

    function train(uint256 tokenid) public {
        require(_exists(tokenid), "pls use existing token");
        require(ownerOf(tokenid) == msg.sender, "you are not an owner");
        uint256 currentLevel = tokenidlevel[tokenid];
        tokenidlevel[tokenid] = currentLevel + 1;
        _setTokenURI(tokenid, getTokenURI(tokenid));
    }
}
