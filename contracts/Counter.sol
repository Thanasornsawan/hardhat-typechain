//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
  uint public count = 0;

  event CountedTo(uint256 number);

  function countUp() public returns (uint256) {
    uint256 newCount = count + 1;
    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function countDown() public returns (uint256) {
    uint256 newCount = count - 1;
    count = newCount;

    emit CountedTo(count);
    return count;
  }
}