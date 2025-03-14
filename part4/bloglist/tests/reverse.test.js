const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a is a', () => {
	const result = reverse('a')

	assert.strictEqual(result, 'a')
})

test('reverse of react is tcaer', () => {
	const result = reverse('react')

	assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias is saippuakauppias', () => {
	const result = reverse('saippuakauppias')

	assert.strictEqual(result, 'saippuakauppias')
})
