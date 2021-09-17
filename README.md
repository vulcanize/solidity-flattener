# Solidity smart-contract flattened source file generation

[![Build Status](https://travis-ci.org/poanetwork/solidity-flattener.svg?branch=master)](https://travis-ci.org/poanetwork/solidity-flattener)
[![Known Vulnerabilities](https://snyk.io/test/github/poanetwork/solidity-flattener/badge.svg)](https://snyk.io/test/github/poanetwork/solidity-flattener)
[![Coverage Status](https://coveralls.io/repos/github/poanetwork/solidity-flattener/badge.svg?branch=master)](https://coveralls.io/github/poanetwork/solidity-flattener?branch=master)

## Utility to combine all imports to one flatten .sol file

### Installation from npm

```bash
npm install https://github.com/vulcanize/solidity-flattener.git
```

#### Usage

* CLI:

  ```bash
  npm run solidity-flattener [input-file-path] [output-file-path]
  ```
    
    * `input-file-path`: Input contract file path.
    * `output-file-path`: Flattened contract output file path (default: appends `-flat` to input filename).

  Arguments are taken from `config.json` if not provided.

  Example:

  ```bash
  npm run solidity-flattener ./contracts/ERC20/ERC20.sol ./out/ERC20-flat.sol
  ```

* As a package:

  Example:

  ```
  const { flatten } = require('@poanet/solidity-flattener')

  const inputFile = './contracts/ERC20/ERC20.sol'
  const flatContract = flatten(inputFile)
  console.log(flatContract)
  ```

### Installation from source

```
git clone https://github.com/vulcanize/solidity-flattener
cd solidity-flattener
npm install
```

#### Usage

You can start the script with:

```
npm start [input-file-path] [output-file-path]
```

  * `input-file-path`: Input contract file path.
  * `output-file-path`: Flattened contract output file path (default: appends `-flat` to input filename).

Arguments are taken from `config.json` if not provided.

Examples:

```
# Saves the flattened contract at the provided output-file-path.
npm start ./contracts/ERC20/ERC20.sol ./out/ERC20-flat.sol
```

```
# Saves the flattened contract at the provided output-file-path in config.json.
npm start
```

If there is no `output-file-path` in `config.json`:

```
# Saves the flattened contract at `./Oracles-flat.sol`
npm start ./demo/src/Oracles.sol
```

**Note:** *Utility doesn't support aliases at import statements.*

## Config

* Path: `./config.json`
* Fields:
    * `input-file-path`: Input contract file path.
    * `output-file-path`: Flattened contract output file path.

* Example:

  ```
  {
    "inputFilePath": "./demo/src/Oracles.sol",
    "outputFilePath": "./demo/out/Oracles-flat.sol"
  }
  ```
