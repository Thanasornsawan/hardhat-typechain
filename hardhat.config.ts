import * as dotenv from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@tenderly/hardhat-tenderly"
import 'hardhat-deploy';
const { Confirm } = require("enquirer")

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    localhost:{
      url: 'http://127.0.0.1:8545',
      chainId: 31337
    }, 
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT as string,
    username: process.env.TENDERLY_USERNAME as string,
  },
  paths: {
    cache: "./generated/cache",
    artifacts: "./generated/artifacts",
    deployments: "./generated/deployments",
  },
  typechain: {
    outDir: "./typechain",
  },
};

task("deploy")
    //   .addOptionalParam("network", "Network")
    .setAction(async (taskArgs, hre, runSuper) => {
        const { network } = taskArgs
        console.log(`Deploying...`)

        const accounts = await hre.ethers.getSigners()

        const prompt = new Confirm({
            name: "question",
            message: `Confirm to deploy with ${accounts[0].address}`,
        })

            ; (await prompt.run()) && (await runSuper(taskArgs))
    })

export default config;
