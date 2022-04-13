import { use, expect } from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import GreeterArtifact from "../artifacts/contracts/Greeter.sol/Greeter.json";
import { Greeter } from "../typechain";
//import { Greeter, Greeter__factory } from "../typechain";

use(solidity);

describe("Greeter", function () {

  let greeter: Greeter;

  beforeEach(async () => {
    const signer = await ethers.getSigners(); 
    let greeting: string = "Hello, world!";
    //method 1 
    //const Greeter = (await ethers.getContractFactory("Greeter")) as unknown as Greeter__factory;
    //greeter = await Greeter.connect(signer[0]).deploy(greeting);
    //---------------------------------------------------
    //method 2
    //const greeter = await new Greeter__factory(signer[0]).deploy("Hello, world!");
    //----------------------------------------------------
    //method 3
    greeter = await deployContract(signer[0],GreeterArtifact, [greeting]) as Greeter;
    await greeter.deployed();

    expect(greeter.address).to.properAddress;
    console.log("Greeter deploy to address: ", greeter.address);
    expect(await greeter.greet()).to.equal(greeting);
  });

  it("Should return the new greeting once it's changed", async function () {
   
    let greeting: string = "Hola, mundo!";
    const setGreetingTx = await greeter.setGreeting(greeting);
    // wait until the transaction is mined
    await setGreetingTx.wait();
    expect(await greeter.greet()).to.equal(greeting);
  });
});
