//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
  uint public count = 0;

  event CountedTo(uint number);

  function countUp() external returns (uint) {
    uint max = 2**256-1;
    require(count < max,"underflow alert!,not allow to +1");
    uint newCount = count + 1;
    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function countDown() external returns (uint) {
    require(count > 0,"overflow alert!,not allow to -1");
    uint newCount = count - 1;
    count = newCount;

    emit CountedTo(count);
    return count;
  }

  function getCount() external view returns (uint) {
      return count;
  }
}