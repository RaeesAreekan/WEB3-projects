// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Buymecoffee {
    event newmemo(
        uint256 timestamp,
        address indexed from,
        string name,
        string message
    );
    struct memo {
        uint256 timestamp;
        address from;
        string name;
        string message;
    }
    memo[] memos;
    address payable owner;

    constructor() public {
        owner = payable(msg.sender);
    }

    function buycoffee(string memory name, string memory message)
        public
        payable
    {
        require(msg.value > 0, "pls provide something");
        memos.push(memo(block.timestamp, msg.sender, name, message));
        emit newmemo(block.timestamp, msg.sender, name, message);
    }

    function withdraw() public {
        require(msg.sender == owner, "u cant withdraw");
        owner.transfer(address(this).balance);
        //require(owner.send(address(this).balance))
    }

    function getmemoes() public view returns (memo[] memory) {
        return memos;
    }
}
