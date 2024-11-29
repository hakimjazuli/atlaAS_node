// @ts-check
import { unlinkSync } from 'fs';
import sqlite3 from 'sqlite3';
import { dirname, basename, extname, join as path_join } from 'path';
import { randomBytes } from 'crypto';
import { __atlaAS } from './__atlaAS.mjs';
import { __Settings } from './__Settings.mjs';
import { _FunctionHelpers } from './_FunctionHelpers.mjs';
import { __Env } from './__Env.mjs';
import { _FileServer } from './_FileServer.mjs';

/**
 * @description
 * - is a [singleton](#singleton)
 * - is a [setting_class](#setting_class)
 * - custom `sqlite3.Database` instantiator using `__SQLite3.create`, make sure it's called and exported after `__atlaAS` instantiation, as it needs `__atlaAS` instance property;
 * - `sqlite3` helper for common functionality using internals db settings(it's an optional feature, so if you are not inputing it as one of the `__atlaAS` options, you cannot use this functionality):
 * > - rate limiter;
 * > - session handling;
 * > - log;
 * > - quick db using `__SQLite3.__.db`, it's `sqlite3.Database` from `sqlite` `npm module`, you can manually query things if needed;
 */
export class __SQLite3 {
	/**
	 * @type {string}
	 */
	_db_path = 'backend/db/atlaas-internals.sqlite3';
	/**
	 * @type {number}
	 * - hours
	 */
	_session_timeout = 1;
	/**
	 * @type {number}
	 * - days
	 */
	_log_db_valid_length = 1;

	/**
	 * @type {__SQLite3}
	 */
	static __;
	/**
	 * @private
	 * @type {{
	 * [path_:string]:string
	 * }}
	 */
	cached_sql_file = {};
	/**
	 * @private
	 * @param {string} path_
	 * @returns {string}
	 */
	sql_file = (path_) => {
		path_ = path_join(__Settings.__.resolved_path, path_);
		if (path_ in this.cached_sql_file) {
			return this.cached_sql_file[path_];
		}
		const sql_content = (this.cached_sql_file[path_] = _FileServer.get_string(path_));
		return sql_content;
	};
	constructor() {
		if (__SQLite3.__ instanceof __SQLite3) {
			return;
		}
		__SQLite3.__ = this;
		this._session_timeout = this._session_timeout * 3_600_000;
		this._log_db_valid_length = this._log_db_valid_length * 86_400_000;
		this._db_path = path_join(__atlaAS.__.app_root, this._db_path);
	}
	/**
	 * @private
	 * @type {sqlite3.sqlite3}
	 */
	static verbose = sqlite3.verbose();
	/**
	 * @type {()=>[sqlite3.Database,disconnect:(errorCheck?:(err:Error|null)=>void)=>void]}
	 */
	db = () => {
		const db = new __SQLite3.verbose.Database(this._db_path, (err) => {
			if (__Env.__._in_production) {
				return;
			}
			if (err) {
				console.error('Error opening database:', err);
				return;
			}
			console.log('Database opened successfully');
		});
		return [db, (callback) => db.close(callback)];
	};
	/**
	 * @param {Object} a0
	 * @param {string} [a0.db_path]
	 * - `defaultValue` "default": will target atla-as internal database;
	 * @param {boolean} [a0.delete_then_recreate]
	 * - `defaultValue` = `false`: do nothing;
	 * - `true`: will delete atla-as internal database and create blank version of it;
	 */
	archive = ({ db_path = 'default', delete_then_recreate = false }) => {
		if (!this.is_valid_call('archive')) {
			return;
		}
		if (db_path === 'default') {
			db_path = this._db_path;
		}
		const leading = __atlaAS.__.app_root;
		if (!db_path.startsWith(leading)) {
			db_path = path_join(leading, db_path);
		}
		const ext = extname(db_path);
		const baseName = basename(db_path, ext);
		const dir = dirname(db_path);
		const archived_path = path_join(dir, `${baseName}.${Date.now()}${ext}.archived_db`);
		const [db, dc] = this.db();
		db.serialize(() => {
			db.run(this.sql_file('archive.sql'), { ':archived_path': archived_path }, (err) => {
				if (err) {
					console.error('Error archiving the database:', err);
				} else {
					console.log('Database successfully archived:', archived_path);
				}
			});
		});
		dc((error) => {
			if (error) {
				console.log('unable to close Database');
				return;
			}
			if (!delete_then_recreate) {
				return;
			}
			try {
				unlinkSync(db_path);
				console.log('Database successfully deleted');
				const [_, new_dC] = this.db();
				new_dC();
			} catch (error) {
				const log_path = _FileServer.log({
					prefix: 'archive-error',
					content: JSON.stringify({ ...error }),
				});
				console.error('unable to delete database, log at:', log_path);
			}
		});
	};
	/**
	 * @param {string} db_path
	 * @returns {sqlite3.Database}
	 */
	static create = (db_path) => {
		const path_ = path_join(__atlaAS.__.app_root, db_path);
		return new __SQLite3.verbose.Database(path_, (err) => {
			if (__Env.__._in_production) {
				return;
			}
			if (err) {
				console.error({ error: err, path: path_ });
				return;
			}
			console.log({ err: 0, path: path_ });
		});
	};
	/**
	 * @param {Object} a0
	 * @param {string} a0.context
	 * @param {string} a0.message
	 * @returns {Promise<boolean>}
	 */
	log = async ({ context, message }) => {
		if (!this.is_valid_call('log')) {
			return;
		}
		return new Promise((resolve, reject) => {
			const [db, dc] = this.db();
			db.run(this.sql_file('log_tbl_create.sql'), (err) => {
				if (err) {
					reject(err);
					return;
				}
				const now = Date.now();
				db.run(this.sql_file('log_invalid_delete.sql'), { ':date': now }, (err) => {
					if (err) {
						reject(err);
						return;
					}
					db.run(
						this.sql_file('log_insert.sql'),
						{
							':context': context,
							':time_stamp': now,
							':valid_until': now + this._log_db_valid_length,
							':message': message,
						},
						(err) => {
							if (err) {
								reject(err);
								return;
							}
							resolve(true);
							dc();
							return;
						}
					);
				});
			});
		});
	};
	/**
	 * @returns {Promise<boolean>}
	 */
	session_starts = async () => {
		if (!this.is_valid_call('session_starts')) {
			return;
		}
		return new Promise((resolve, reject) => {
			const [db, dc] = this.db();
			db.run(this.sql_file('sessions_tbl_create.sql'), (err) => {
				if (err) {
					reject(err);
					return;
				}
				const req = __atlaAS.__.request;
				this.session_id =
					req.headers.cookie?.split('=')[1] ?? randomBytes(16).toString('hex');
				this.session_valid_until = Date.now() + this._session_timeout;
				db.run(
					this.sql_file('sessions_delete_invalid.sql'),
					{ ':date': Date.now() },
					(err) => {
						if (err) {
							if (!__Env.__._in_production) {
								console.error(err);
							}
							_FileServer.log({
								prefix: 'error-deleting-expired-sessions',
								content: err,
							});
							reject(err);
							return;
						}
						db.get(
							this.sql_file('session_id_get.sql'),
							{ ':session_id': this.session_id },
							(err, row) => {
								if (err) {
									_FileServer.log({
										prefix: 'error-selecting-session-id',
										content: err,
									});
									reject(err);
									return;
								}
								if (row) {
									this.session = JSON.parse(row);
									resolve(true);
									dc();
									return;
								}
							}
						);
					}
				);
			});
		});
	};
	/**
	 * @type {{[key:string]:string}}
	 */
	session;
	/**
	 * @private
	 * @type {number}
	 */
	session_valid_until;
	/**
	 * @returns {Promise<boolean>}
	 */
	delete_session = async () => {
		if (!this.is_valid_call('delete_session')) {
			return;
		}
		return new Promise((resolve, reject) => {
			const [db, dc] = this.db();
			db.run(
				this.sql_file('session_id_delete.sql'),
				{ ':session_id': this.session_id },
				(err) => {
					if (err) {
						_FileServer.log({
							prefix: 'error-deleting-session-id',
							content: err,
						});
						reject(err);
						return;
					}
					resolve(true);
					dc();
					return;
				}
			);
		});
	};
	/**
	 * @param {string} key
	 * @param {string} value
	 * @returns {Promise<boolean>}
	 */
	set_session = async (key, value) => {
		if (!this.is_valid_call('set_session')) {
			return;
		}
		return new Promise((resolve, reject) => {
			const [db, dc] = this.db();
			db.run(
				this.sql_file('session_insert.sql'),
				{
					':session_id': this.session_id,
					':valid_until': this.session_valid_until,
					':json_object': JSON.stringify(Object.assign(this.session, { [key]: value })),
				},
				(err) => {
					if (err) {
						_FileServer.log({
							prefix: 'error-saving-sessions',
							content: err,
						});
						reject(err);
						return;
					}
					resolve(true);
					dc();
				}
			);
		});
	};
	/**
	 * @param  {number} rate_limit
	 * @param  {number} time_window
	 * - in seconds
	 * @param  {string|null|undefined|string[]} [client_id]
	 * @return {Promise<boolean>}
	 */
	limit = async (rate_limit = 100, time_window = 60, client_id = null) => {
		if (!this.is_valid_call('limit')) {
			return;
		}
		const atlaas = __atlaAS.__;
		const request = atlaas.request;
		const response = atlaas.response;
		client_id = client_id ?? request.socket.remoteAddress ?? request.headers['x-forwarded-for'];
		const [db, dc] = this.db();
		try {
			await new Promise((resolve, reject) => {
				db.run(this.sql_file('rate_limits_tbl_create.sql'), (err) => {
					if (err) reject(err);
					else resolve();
				});
			});
			const currentTime = Math.floor(Date.now() / 1000);
			const window_start = Math.floor(currentTime / time_window) * time_window;
			const row = await new Promise((resolve, reject) => {
				db.get(
					this.sql_file('rate_limites_row_get.sql'),
					{ ':client_id': client_id, ':window_start': window_start },
					(err, row) => {
						if (err) reject(err);
						else resolve(row);
					}
				);
			});
			if (row) {
				if (row.request_count >= rate_limit) {
					response.writeHead(429, {
						'Content-Type': 'application/json',
					});
					atlaas.end_(
						JSON.stringify({
							code: 429,
							status: 'not-enough-resource',
							message: 'try again later',
						})
					);
					return false;
				}
				await new Promise((resolve, reject) => {
					db.run(
						this.sql_file('rate_limits_delete_client_id.sql'),
						{ ':client_id': client_id, ':window_start': window_start },
						(err) => {
							if (err) reject(err);
							else resolve();
						}
					);
				});
				await new Promise((resolve, reject) => {
					db.run(
						this.sql_file('rate_limites_updates.sql'),
						{ ':client_id': client_id, ':window_start': window_start },
						(err) => {
							if (err) reject(err);
							else resolve();
						}
					);
				});
				return true;
			}
			await new Promise((resolve, reject) => {
				db.run(
					this.sql_file('rate_limits_insert.sql'),
					{
						':client_id': client_id,
						':window_start': window_start,
					},
					(err) => {
						if (err) reject(err);
						else resolve();
					}
				);
			});
			return true;
		} catch (err) {
			if (!__Env.__._in_production) {
				console.error(err);
			}
			_FileServer.log({
				prefix: 'error-rate-limiting',
				content: err,
			});
			response.writeHead(500, {
				'Content-Type': 'application/json',
			});
			atlaas.end_(
				JSON.stringify({
					code: 500,
					status: 'internal-server-error',
					message: 'something went wrong',
				})
			);
			return false;
		} finally {
			dc((err) => {
				if (__Env.__._in_production) {
					return;
				}
				if (!err) {
					console.log('Database closed successfully');
					return;
				}
				console.error('Error closing database:', err);
			});
		}
	};
	/**
	 * @private
	 * @param {string} context
	 */
	is_valid_call = (context) => {
		if (__SQLite3.__) {
			return true;
		}
		console.log({ error: 'invalid-call', context });
		return false;
	};
}
