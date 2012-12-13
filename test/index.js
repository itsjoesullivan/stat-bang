var statBang = require('../index.js'),
	assert = require('assert');

assert(typeof statBang === 'object');
assert('start' in statBang && typeof statBang.start === 'function');
console.log("Looks good from here\n");
