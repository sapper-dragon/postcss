const { red } = require('ansi-colors')
const postcss = require('postcss')
const postcssScssSyntax = require('postcss-scss')
const { loadConfig } = require('../trimmings/config')
const { getPlugins } = require('./plugins')

let config_loaded = false
let config
let plugins

module.exports.set_env_path = function(path) {
	if (!config_loaded) {
		require('dotenv').config({ path })
		config = loadConfig()
		plugins = getPlugins(config)
	}
}

module.exports.sveltePreprocess = function(/* domain */) {
	if (!config_loaded) {
		config = loadConfig()
		plugins = getPlugins(config)
	}

	// NOTE: `domain` is useful for debugging if it is SSR or DOM
	return {
		style: async({ content, attributes, filename }) => {
			if (attributes.type !== 'text/scss') {
				return { code: content/* , map: '' */ }
			}
			try {
				const preImport = config.postcss.preImport ? `@import '${config.postcss.preImport}';\n` : ''
				const result = await postcss(plugins).process(preImport + content, {
					from: 'src',
					syntax: postcssScssSyntax,
					// TODO: unclear if maps are needed. ASK in the forum
					// map: true,
				})
				if (result.css && typeof result.css === 'string') {
					return {
						code: result.css.toString(),
						// map: result.map.toString(),
					}
				} else {
					return { code: ''/* , map: '' */ }
				}

			} catch (error) {
				console.log(red('Error:'))
				console.log(error)
				console.log()
				console.log(red('Something is wrong with the PostCSS precompile.'))
				console.log('Check your `trimmings.config.js` file. The current settings are:\n')
				console.log(JSON.stringify(config.postcss, null, '  '))
				console.log()
				// process.exit(0)
				// return { code: ''/* , map: '' */ }
			}
		},
	}
}
