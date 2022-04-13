import { use, expect } from "chai";
import { deployContract, solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import GreeterArtifact from "../artifacts/contracts/Greeter.sol/Greeter.json";
import CountArtifact from "../artifacts/contracts/Counter.sol/Counter.json";
import { Greeter } from "../typechain";
import { Counter } from "../typechain";
//import { Greeter, Greeter__factory } from "../typechain";

use(solidity);

describe("Greeter contract", function () {

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

describe("Counter contract", function () {

  let counter: Counter;

  beforeEach(async () => {
    const signer = await ethers.getSigners(); 
    counter = await deployContract(signer[0],CountArtifact) as Counter;
    await counter.deployed();
    const initialCount = await counter.getCount();

    expect(counter.address).to.properAddress;
    console.log("Counter deploy to address: ", counter.address);
    expect(initialCount).to.eq(0);
  });

  it("Should count up", async function () {
     await counter.countUp();
      //await expect(counter.countUp()).to.be.revertedWith("overflow alert!,not allow to +1");
      const count = await counter.getCount();
      expect(count).to.eq(1);
      await expect(counter.countUp()).to.emit(counter, 'CountedTo').withArgs(2);
  });

  it("should revert when count down", async () => {
    //expect(await counter.countDown()).to.be.reverted;
    expect(await counter.countDown()).to.be.revertedWith("underflow alert!,not allow to -1");
    const count = await counter.getCount();
    expect(count).to.eq(0);
    expect(await counter.countDown()).to.emit(counter, 'CountedTo').withArgs(0);
  });

});
