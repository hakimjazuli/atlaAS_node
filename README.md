# atlaAS_node
an `FSRouting` for `nodeJS` and `bun`, ported the logic from [atlaAS](https://github.com/hakimjazuli/atlaAS)
## how to install
```shell
npm i @html_first/atla-as_node
```
## how to initialize
- initialize using [__atlaAS instance](#__atlaas)
## problem with porting
php have wide range of built in connection class using `PDO` which also already highly used as the goto solution in php environtment:
- however in `nodeJS`, there's high chances connection library will be different per project, therefore atlaAS `connection` and `querying` functionality WILL NOT be implemented in this `port`, as in EVER;
## recomendations
you might need to install extentions/linters to help you with the `html` template literals
- for vscode we found this either one of these helped a lot:
> - [lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)
> - [vscode-template-literal-editor](https://marketplace.visualstudio.com/items?itemName=plievone.vscode-template-literal-editor)
## class_helper
- any class prefixed with "_" are a helper class;
- it contains methods or constructor to help you in common scenarios;
## singleton
- any class prefixed with "__" are singleton, the instance can be accessed from `_Routes[anyMethods]` via class static property `ClassName.__`


<h2 id="exported-api-and-type-list">exported-api-and-type-list</h2>

- [html](#html)

- [_AppRegex](#_appregex)

- [_Cors](#_cors)

- [_FileServer](#_fileserver)

- [_FollowUpParams](#_followupparams)

- [_FunctionHelpers](#_functionhelpers)

- [_MapResources](#_mapresources)

- [_Middleware](#_middleware)

- [_Routes](#_routes)

- [_RouteWithMapResources](#_routewithmapresources)

- [_RouteWithMapResourcesAndMiddleware](#_routewithmapresourcesandmiddleware)

- [_RouteWithMiddleware](#_routewithmiddleware)

- [_SQLiteRateLimiter](#_sqliteratelimiter)

- [__atlaAS](#__atlaas)

- [__Env](#__env)

- [__NodeServer](#__nodeserver)

- [__Request](#__request)

- [__Response](#__response)

- [__Settings](#__settings)

<h2 id="html">html</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- helper function to generate html string asynchronously;- combine with `IDE` extentions for emet with our [recomendations](#recomendations);

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_appregex">_AppRegex</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- collection of usefull regex to filter strings;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_cors">_Cors</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- `allow` incoming `cors` connections with filters;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_fileserver">_FileServer</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- static `methods` to handle `fileSystem` serving;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_followupparams">_FollowUpParams</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- class helper for `__atlaAS.__.validate_params` `argument`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_functionhelpers">_FunctionHelpers</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- collection of static methods, originally used for library internals functionality, but it might be usefull for general uses;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_mapresources">_MapResources</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- extended class from [_Routes](#_routes);- serve files inside named folder;> - some_route.mjs> - assets.mjs> - assets(dir)> > - test.txt> > - nested(dir)> > > - test2.txt```js// /routes/assets.mjsexport default class extends _MapResources {}```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_middleware">_Middleware</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- extends this to `mw.mjs` on a folder, that folder and it's subfolders will have this `mw` method called as middleware;- `_Routes` class that also acts as middleware, it's `mw` method will be called `only` when that specific `routes` is requested, no matter which http method is being called;```js// /routes/api/mw.jsexport default class extends _Middleware {	mw = (lower_case_http_method) => {		// return boolean		// true to allow to proceed to next method calls;		// false to stop method calls;		// you can also uses `__Response.__.response` to determine response before returning; }}``````js// /routes/index.mjsexport default class extends _RouteWithMiddleware {	mw = () => {		// the same with above;		// however it also can have method to call on its own if needed; } get = () => {};}```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routes">_Routes</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- extends this class or any class prefixed with "_Route" to register that route as ` system router`;```jsexport default class extends _Routes{	get = (		...url_inputs		// all inputs is in string type;		// should never have default value, as it will mess with length of the input detection;	) => {	// compose the with our singleton and helper class, then by using `__Response.__.response` you can send response to the client;	};}```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routewithmapresources">_RouteWithMapResources</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- extended class from [_MapResources](#_mapresources);- also functions as [_Routes](#_routes);

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routewithmapresourcesandmiddleware">_RouteWithMapResourcesAndMiddleware</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- extended class from [_MapResources](#_mapresources);- also functions as [_Routes](#_routes);- also has [mw](#_middleware) method that functions as middleware;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routewithmiddleware">_RouteWithMiddleware</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- extended class from [_MapResources](#_mapresources);- also has [mw](#_middleware) method that functions as middleware;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_sqliteratelimiter">_SQLiteRateLimiter</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [helper class](#helper_class);- access limiter using `sqlite3`, call the method on a middleware to limit overall access to the site;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__atlaas">__atlaAS</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [singleton](#singleton)- use this class to instantiate the server```js// /backend/atlaAS.mjsnew __atlaAS({	settings: __Settings, // extends from [__Settings](#__settings)	env: __Env, // extends from [__Env](#__env)	...options});```- call using bun or node```shellbun --watch ./backend/atlaAS.mjsnpm run ./backend/atlaAS.mjs -- --watch```- it's recomended to save the script on the package.json for convenience

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__env">__Env</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [singleton](#singleton)- placeholder for for environtmental values;- always put the this extended class on `.ignore` on your shared code management;- modify class property on the extended class to set the value;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__nodeserver">__NodeServer</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [singleton](#singleton)- it's for library internal, however it contains properties and methods, that might be usefull for general monitoring;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__request">__Request</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [singleton](#singleton)- helper for node http["IncomingMessage"];

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__response">__Response</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [singleton](#singleton)- helper for node http["ServerResponse"];

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__settings">__Settings</h2>

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>

- is a [singleton](#singleton)- modify class property on the extended class to set the value;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
