import { ethers } from "hardhat";
//import {HardhatRuntimeEnvironment} from 'hardhat/types';

async function main() {

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, World!");
  await greeter.deployed();

  console.log("Greeter deployed to: ", greeter.address);
  console.log("Greeter transaction hash: ",greeter.deployTransaction.hash);

  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.deployed();

  console.log("Counter deployed to: ", counter.address);
  console.log("Counter transaction hash: ", counter.deployTransaction.hash);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});