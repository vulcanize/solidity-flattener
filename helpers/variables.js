const path = require('path')
const fs = require('fs')

const constants = require('./constants')

let importedSrcFiles = {}

function processVariables(args) {

	const configPath = './config.json'
	let configExists = fs.existsSync(configPath, fs.F_OK)
	let config
	if (configExists) {
		config = JSON.parse(fs.readFileSync(configPath, constants.UTF8))
	}

	// Get file paths. Resolution order: Command line args, config, defaults.
	const inputFilePath = args.length > 0 ? args[0] : config ? config.inputFilePath : constants.EMPTY
	const outputFilePath = args.length > 1 ? args[1] : config ? config.outputFilePath : constants.EMPTY

	// Output directory to store flat combined solidity file.
	const outputDir = path.dirname(outputFilePath)

	// Extracting filename for output file if outputFilePath not given.
	const flatContractPrefix = path.basename(inputFilePath, '.sol')

	const variables = {
		inputFilePath,
		outputFilePath,
		outputDir,
		flatContractPrefix
	}

	return variables
}

function resetImportedSrcFiles () {
	importedSrcFiles = {}
}

function getImportedSrcFiles () {
	return importedSrcFiles
}

module.exports = { processVariables, resetImportedSrcFiles, getImportedSrcFiles }
