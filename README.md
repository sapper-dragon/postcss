# @sapper-dragon/postcss

Decorate your [Sapper](https://sapper.svelte.dev/) project with PostCSS.

`@sapper-dragon/postcss` utilizes [PostCSS](https://postcss.org/) under the surface, a tool for transforming CSS with JavaScript.

## Installation

```
npm install @sapper-dragon/postcss --save-dev
# or
yarn add @sapper-dragon/postcss --dev
```

## Usage

This project requires the [@sapper-dragon/trimmings](https://github.com/sapper-dragon/trimmings) lib, so look there first for instructions, then come back. 💫

### Svelte Preprocessor

This package includes a PostCSS preprocessor. To use it, import it in your `rollup.config.js` file, and add it as a preproccesor like so:

```js
import { preprocess } from '@sapper-dragon/postcss/tools'
// ... 
	plugins: [
		// ...
		svelte({
			// ...
			preprocess: preprocess(),
		}),
	],
```

NOTE: this preprocessor expects to find a file at `./src/trimmings/postcss/svelte-pre-imports.postcss` (depending on your settings). Make sure it exists. DO NOT include actual compiled CSS in this preprended file. That will bundle CSS into every component, which you most likely won't want. (Maybe there's such a relevant use case?) This mostly allows you to prepend variables or mixins or other `*.postcss` files into every component processed.

### Global file

`@sapper-dragon/postcss` will also convert a `global.postcss` files from a `postcss` folder and output it to the `static/css` folder as `global.css`.

### Config

You can place a `trimmings.config.js` file in the root of your project to set configutations. These are the defaults:

```js
export default {
	postcss: {
		input: 'src/trimmings/postcss', // path to watch *.postcss files
		filename: 'global', // name of file without extension
		filter: /\.(postcss|css|scss)$/, // pattern for files to watch
		outputStatic: 'static/css', // output path
		preImport: 'svelte-pre-imports', // filename without extension for pre-importing postcss vars and mixins
	},
	// ... additional settings from other @sapper-dragon packages...
}
```
