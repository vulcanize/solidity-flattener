#! /usr/bin/env node

const path = require('path')
const fs = require('fs')

const { processVariables } = require('./helpers/variables')
const log = require('./helpers/logger')
const constants = require('./helpers/constants')
const cleanPath = require('./helpers/clean-path')
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

	if (!fs.existsSync(variables.outputDir)) fs.mkdirSync(variables.outputDir, { recursive: true })
	const fileName = variables.outputFilePath ? path.basename(variables.outputFilePath) : `${variables.flatContractPrefix}-flat.sol`
	const filePath = `${variables.outputDir}/${fileName}`
	fs.writeFileSync(filePath, outputFileContent)
	log.info(`Success! Flat file ${fileName} is generated to  ${variables.outputDir} directory.`)
}

async function flatten(inputFilePath) {
	const inputFileContent = fs.readFileSync(inputFilePath, 'utf8')

	let dir = path.dirname(inputFilePath) + constants.SLASH
	const isAbsolutePath = !dir.startsWith(constants.DOT)
	if (!isAbsolutePath) {
		dir = __dirname + constants.SLASH + dir
	}
	dir = cleanPath(dir)

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
