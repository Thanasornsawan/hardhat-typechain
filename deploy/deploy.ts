import { network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
//const hre1 = require("@nomiclabs/hardhat-ethers");
const { ethers } = require("hardhat")
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network, tenderly } = hre as any
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, Hardhat!");
    await greeter.deployed();

    console.log("Greeter deployed to: ", greeter.address);
    console.log("Greeter transaction hash: ", greeter.deployTransaction.hash);

    let artifact = await tenderly.persistArtifacts({
        name: "Greeter",
        address: greeter.address
    });

    let verification = await tenderly.verify({
        name: "Greeter",
        address: greeter.address,
    });
}
export default func
func.tags = ["Greeter"]