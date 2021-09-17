#! /usr/bin/env node

const path = require('path')
const fs = require('fs')

const { processVariables } = require('./helpers/variables')
const log = require('./helpers/logger')
const constants = require('./helpers/constants')
const replaceAllImportsRecursively = require('./helpers/replace-all-imports-recursively')
const {
	deduplicateSolidityVersoins,
	deduplicateSolidityExpHeaders,
	deduplicateLicenses
} = require('./helpers/deduplicate-lines')

async function main(args) {
	// Get the processed variables.
	const variables = processVariables(args)

	// Flatten the contract.
	const outputFileContent = await flatten(variables.inputFilePath)

	// Store the output file at the required destination.
	if (!fs.existsSync(variables.outputDir)) fs.mkdirSync(variables.outputDir, { recursive: true })
	const fileName = variables.outputFilePath ? path.basename(variables.outputFilePath) : `${variables.flatContractPrefix}-flat.sol`
	const filePath = `${variables.outputDir}/${fileName}`
	fs.writeFileSync(filePath, outputFileContent)
	log.info(`Success! Flat file ${fileName} is generated to  ${variables.outputDir} directory.`)
}

async function flatten(inputFilePath) {
	inputFilePath = path.resolve(inputFilePath)

	const inputFileContent = fs.readFileSync(inputFilePath, 'utf8')

	let dir = path.dirname(inputFilePath) + constants.SLASH

	return await replaceImports(inputFileContent, dir)
}

async function replaceImports(inputFileContent, dir) {
	let outputFileContent = await replaceAllImportsRecursively(inputFileContent, dir)

	outputFileContent = deduplicateLicenses(outputFileContent)
	outputFileContent = deduplicateSolidityVersoins(outputFileContent)
	outputFileContent = deduplicateSolidityExpHeaders(outputFileContent)

	return outputFileContent
}

module.exports = { flatten, main }
