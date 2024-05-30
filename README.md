# atlaAS_node

an FSRouting for node, ported the logic from [atlaAS](https://github.com/hakimjazuli/atlaAS)

## how to install

```shell
npm i @html_first/atla-as_node
```

## how to initialize

```js
// @ts-check

import { __atlaAS } from '@html_first/atla-as_node';
import { Settings } from './Settings.mjs'; /** extended from __Settings */
import { Env } from './Env.mjs'; /** extended from __Env */

new __atlaAS(Settings, Env);
```

## ports

-   due to how easy for php to immediate echo using it's `html mode` using `?>`, HTML_ELEMENTS
    ,`<?php`, this design pattern cannot be transfered dirrectly:
    > -   this node version requires the `method` to return `string`, which then interpretted as
    >     `http.ServerResponse` `string`;
    > -   use profided `html` function, which can be chained with methods to render the string;

```js
// @ts-check

import { _Routes, __atlaAS, html } from '@html_first/atla-as_node';

export default class extends _Routes {
	get = async () => {
		const html_ = await html`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Document</title>
				</head>
				<body>
					<button onclick="alert('index')">this is index</button>
					${await __atlaAS.__.render_get('/routes/test.mjs')}
				</body>
			</html>
		`;
		return html_.string();
		// return html_.no_indent();
		// return html_.single_line();
	};
}
```

-   php have wide range of built in connection class using `PDO` which also already highly used in
    php environtment:

    > -   however in nodes, there's high chances connection library is different per project,
    >     therefore atlaAS connection and querying functionality WILL NOT be implemented in this
    >     port, as in EVER;

-   this port uses atlaAS design pattern, as in:
    > -   url are defined by the path of the `_Routes`;
    > -   http method is available by the class method of the same method name in lowercase;
    > -   class method parameters function as additional url to that http method;
    > -   any `mw.mjs` and class `mw` method functions as middleware of said http request, with top
    >     to bottom priority;
    > -   route class propery functions as placeholder fro http method parameter
    >     > -   `/?test=9`, means will modify class property of test value to `9`;

## additional

you might need to install extentions/linters to help you with the `html` template literals

-   for vscode I found this two helped a lot:
    > -   [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
    > -   [vscode-template-literal-editor](https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor)
