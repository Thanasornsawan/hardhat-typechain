# HARDHAT-TYPECHAIN-ETHEREUM-WAFFLE

** warning: to avoid any bug during deploy contract, recommend use ethers version "^5.0.31"

## Debug hardhat in visual studio

- create a launch.json file, click the `create a launch.json` file link in the "Run and Debug"
follow tutorial from [here](https://code.visualstudio.com/docs/editor/debugging)
*auto generate under .vscode folder*
- set the debug name and args follow command we want to use, you can view my example in file launch.json
- click breakpoint line at any line in testing file
- Go to "Run and Debug" and click "play" button on debug name "Hardhat test"
  
![debug](https://github.com/Thanasornsawan/hardhat-typechain/blob/main/images/testDebug.jpg)

## Verify and upload transaction to tenderly

I use plugin from "@tenderly/hardhat-tenderly" and "hardhat-deploy" and install "tenderly-cli"<br/>
### Step by step export your contract on `localhost` network via **tenderly-cli** 

- Create account on tenderly and generate access key
- Use command `tenderly login`
- create folder deploy and deploy.ts under that folder

First terminal:
```
npx hardhat node
```

Second terminal:
```
npx hardhat deploy --network localhost
```

```
ploy@DESKTOP-J2I6GJ1:/mnt/c/Users/Ploy/Documents/hardhat-typescript$ npx hardhat deploy --network localhost       
Deploying...
✔ Confirm to deploy with 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (y/N) · true

Generating typings for: 3 artifacts in dir: ./typechain for target: ethers-v5
Successfully generated 7 typings!
Compiled 3 Solidity files successfully
Greeter deployed to:  0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
Greeter transaction hash:  0x617fa352b0cd4f07915c2a08fa84e8cc36e3ea70b1688af47a934ea13836a141
hardhat-tenderly: No new contracts have been verified
```
### Init project by tenderly
```
ploy@DESKTOP-J2I6GJ1:/mnt/c/Users/Ploy/Documents/hardhat-typescript$ tenderly export init
✔ Choose the name for the exported network: localhost
✔ Create new project
✔ Project: typescript
✔ Enter rpc address (default: 127.0.0.1:8545):
✔ None
```
### Export transaction hash `0x617fa352b0cd4f07915c2a08fa84e8cc36e3ea70b1688af47a934ea13836a141` 
```
ploy@DESKTOP-J2I6GJ1:/mnt/c/Users/Ploy/Documents/hardhat-typescript$ tenderly export 0x617fa352b0cd4f07915c2a08fa84e8cc36e3ea70b1688af47a934ea13836a141
Collecting network information...    

Collecting transaction information...

Collecting contracts...
Successfully exported transaction with hash 0x617fa352b0cd4f07915c2a08fa84e8cc36e3ea70b1688af47a934ea13836a141   
You can view your transaction at https://dashboard.tenderly.co/ploy/typescript/local-transactions/35d727ce-cdb6-44217-b37d-cbc27e250aef
```

Checking on terderly website
![tenderly](https://github.com/Thanasornsawan/hardhat-typechain/blob/main/images/ten.JPG)

---------------------------------------------------------------------------------------------------

### Export contract via tenderly script in deploy/deploy.ts on rinkeby network
**warning**: to deploy via script, you need testnet not localhost network, if you use localhost you may end up with error "hardhat-tenderly: No new contracts have been verified"

```
ploy@DESKTOP-J2I6GJ1:/mnt/c/Users/Ploy/Documents/hardhat-typescript$ npx hardhat deploy --network rinkeby
Deploying...
✔ Confirm to deploy with 0x176366cFD97885245fAEA72f8cB6951e52655Adf (y/N) · true
Nothing to compile
No need to generate any newer typings.

Greeter deployed to:  0xB2b33f78D1A151b6C175B6844125dfda6d243b86
Greeter transaction hash:  0x64d505f1587c3fe99213448a77209fa7ae7ccb7d07ec0f00cc0a6e527f63426f
Smart Contracts successfully verified
  Contract 0xb2b33f78d1a151b6c175b6844125dfda6d243b86 verified. You can view the contract at https://dashboard.tenderly.co/contract/rinkeby/0xb2b33f78d1a151b6c175b6844125dfda6d243b86
```

Result
![tenderly2](https://github.com/Thanasornsawan/hardhat-typechain/blob/main/images/ten2.JPG)