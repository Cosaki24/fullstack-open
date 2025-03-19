const info = (...params) => {
	if(process.env.NODE_ENV !== 'test')
		console.log('[info] ', ...params)
}

const error = (...params) => {
	if(process.env.NODE_ENV !== 'test')
		console.error('[error] ', ...params)
}

module.exports = {
	info,
	error,
}
