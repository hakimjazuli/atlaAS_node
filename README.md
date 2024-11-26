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

## setting_class

- extends the class and modify the property which are prefixed with "_" if neccessary

## exported-api-and-type-list

- [html](#html)

- [htmlReturn](#htmlreturn)

- [req](#req)

- [res](#res)

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

- [__atlaAS](#__atlaas)

- [__Env](#__env)

- [__NodeServer](#__nodeserver)

- [__Settings](#__settings)

- [__SQLite3](#__sqlite3)

<h2 id="html">html</h2>

- helper function to generate html string;- combine with `IDE` extentions for emet with our [recomendations](#recomendations);```js/*** @param {TemplateStringsArray} strings* @param {string[]} values* @returns {Promise<htmlReturn>}*/```- returns [htmlReturnInstance](#htmlreturn)

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="htmlreturn">htmlReturn</h2>

- `htmlReturnInstance` have methods that can be called to be used as `return value` of [_Routes](#_routes) `getMethod`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="req">req</h2>

```js/*** @returns {__atlaAS["request"]}* - current `atlaAS` `http.IncomingMessage` instanse*/```- use this to get `returns value` outside `mw` `scope`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="res">res</h2>

```js/*** @returns {__atlaAS["response"]}* - current `atlaAS` `http.ServerResponse` instanse*/```- use this to get `returns value` outside `mw` `scope`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_appregex">_AppRegex</h2>

- is a [helper class](#helper_class);- collection of usefull regex to filter strings;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_cors">_Cors</h2>

- is a [helper class](#helper_class);- `allow` incoming `cors` connections with filters;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_fileserver">_FileServer</h2>

- is a [helper class](#helper_class);- static `methods` to handle `fileSystem` serving;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_followupparams">_FollowUpParams</h2>

- is a [helper class](#helper_class);- class helper for `__atlaAS.__.validate_params` `argument`;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_functionhelpers">_FunctionHelpers</h2>

- is a [helper class](#helper_class);- collection of static methods, originally used for library internals functionality, but it might be usefull for general uses;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_mapresources">_MapResources</h2>

- is a [helper class](#helper_class);- extended class from [_Routes](#_routes);- serve files inside named folder;> - some_route.mjs> - assets.mjs> - assets(dir)> > - test.txt> > - nested(dir)> > > - test2.txt```js// /routes/assets.mjsexport default class extends _MapResources {}```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_middleware">_Middleware</h2>

- is a [helper class](#helper_class);- extends this to `mw.mjs` on a folder, that folder and it's subfolders will have this `mw` method called as middleware;- `_Routes` class that also acts as middleware, it's `mw` method will be called `only` when that specific `routes` is requested, no matter which http method is being called;```js// /routes/api/mw.js// in wich case it will be called on any request to '/api/..' and all of it's sub path;export default class extends _Middleware {	/** @type {import('@html_first/atla-as_node').mwMethod} */	mw = async ({ mw, mw_err, chains }) => {		// return true; // you need to manually add return boolean when using `_Middleware` derivative;		return await chains(...		/**		 * - generate middleware callback:		 * > - mw : (req, res, next) => (void|Promise<void>);		 * > - mw_err : (err, req, res, next) => (void|Promise<void>);		 * - both are only functions as typehelper;		 * - if your middleware are structured like either of that, you can just write the reference;		 */		);};}``````js// /routes/index.mjs// it will be called only on request to uri root ('/index', '/' or '')export default class extends _RouteWithMiddleware {// the same with above;	mw = async ({ ...options }) => {};// however it also can have http_method of it's own to call, if needed; get = async () => {};}```- this middleware callback are compliance with js `middleware architecture/pattern`, it has `request`, `response`, `next` parameter,> - `request` are instance extended from `http.IncomingMessage`;> - `response` are instance extended from `http.ServerResponse`;> - we added to `request` and `reponse` `method`/`property` prefixed with `atlaas_`;> - `next` are callback to allow to proceed to next callback (middleware or route);> > - by default it will not be called, if you use `_Middleware` and it's derivatives, without manually calling it, the request will imediately be blocked from calling next callback;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routes">_Routes</h2>

- is a [helper class](#helper_class);- extends this class or any class prefixed with "_Route" to register that route as ` system router`;```jsexport default class extends _Routes{	/** @type {import('@html_first/atla-as_node').routeGetMethod} */// use type routeMethod instead for non get method	get = (		...url_inputs		// all inputs is in string type;		// should never have default value, as it will mess with length of the input detection;	) => {	};}```

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routewithmapresources">_RouteWithMapResources</h2>

- is a [helper class](#helper_class);- extended class from [_MapResources](#_mapresources);- also functions as [_Routes](#_routes);

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routewithmapresourcesandmiddleware">_RouteWithMapResourcesAndMiddleware</h2>

- is a [helper class](#helper_class);- extended class from [_MapResources](#_mapresources);- also functions as [_Routes](#_routes);- also has [mw](#_middleware) method that functions as middleware;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="_routewithmiddleware">_RouteWithMiddleware</h2>

- is a [helper class](#helper_class);- extended class from [_MapResources](#_mapresources);- also has [mw](#_middleware) method that functions as middleware;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__atlaas">__atlaAS</h2>

- is a [singleton](#singleton)- use this class to instantiate the server```js// /backend/atlaAS.mjsnew __atlaAS({	settings: __Settings, // extends from [__Settings](#__settings)	env: __Env, // extends from [__Env](#__env)	sqlite3: __Sqlite3, // extends from [__Sqlite3](#__sqlite3)	...options});```- call using bun or node```shellbun --watch ./backend/atlaAS.mjsnpm run ./backend/atlaAS.mjs -- --watch```- it's recomended to save the script on the package.json for convenience

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__env">__Env</h2>

- is a [singleton](#singleton)- is a [setting_class](#setting_class)- placeholder for for environtmental values;- always put the this extended class on `.ignore` on your shared code management;- modify class property on the extended class to set the value;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__nodeserver">__NodeServer</h2>

- is a [singleton](#singleton)- it's for library internal, however it contains properties and methods, that might be usefull for general monitoring;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__settings">__Settings</h2>

- is a [singleton](#singleton)- is a [setting_class](#setting_class)- modify class property on the extended class to set the value;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>


<h2 id="__sqlite3">__SQLite3</h2>

- is a [singleton](#singleton)- is a [setting_class](#setting_class)- custom `sqlite3.Database` instantiator using `__SQLite3.create`, make sure it's called and exported after `__atlaAS` instantiation, as it needs `__atlaAS` instance property;- `sqlite3` helper for common functionality using internals db settings(it's an optional feature, so if you are not inputing it as one of the `__atlaAS` options, you cannot use this functionality):> - rate limiter;> - session handling;> - log;> - quick db using `__SQLite3.__.db`, it's `sqlite3.Database` from `sqlite` `npm module`, you can manually query things if needed;

*) <sub>[go to exported list](#exported-api-and-type-list)</sub>
