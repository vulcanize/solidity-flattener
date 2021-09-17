let bunyan = require('bunyan')

const level = process.env.DEBUG_LEVEL || 'error'
let log = bunyan.createLogger({
	name: 'solidity-flattener',
	level
})

module.exports = log
