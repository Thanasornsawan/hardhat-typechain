# this project is testing contract with typechain with ethereum-waffle

** warning: to avoid any bug during deploy contract, recommend use ethers version "^5.0.31"

### Debug hardhat in visual studio

- create a launch.json file, click the `create a launch.json` file link in the "Run and Debug"
follow tutorial from [here](https://code.visualstudio.com/docs/editor/debugging)
*auto generate under .vscode folder*
- set the debug name and args follow command we want to use, you can view my example in file launch.json
- click breakpoint line at any line in testing file
- Go to "Run and Debug" and click "play" button on debug name "Hardhat test"
  
![debug](https://github.com/Thanasornsawan/hardhat-typechain/tree/main/images/testDebug.jpg)