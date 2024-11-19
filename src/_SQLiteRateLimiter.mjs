// @ts-check
import { __Response } from './__Response.mjs';
import sqlite3 from 'sqlite3';
import path from 'path';
import { __atlaAS } from './__atlaAS.mjs';
import { __Request } from './__Request.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - access limiter using `sqlite3`, call the method on a middleware to limit overall access to the site;
 */
export class _SQLiteRateLimiter {
	/**
	 * @param  {string} db_path
	 * @param  {number} rate_limit
	 * @param  {number} time_window in seconds
	 * @param  {string|null|undefined|string[]} client_id
	 * @return {Promise<boolean>}
	 */
	static limit = async (db_path, rate_limit = 100, time_window = 60, client_id = null) => {
		return new Promise((resolve, reject) => {
			client_id =
				client_id ??
				__Request.__.request.socket.remoteAddress ??
				__Request.__.request.headers['x-forwarded-for'];
			const sqlite3_ = sqlite3.verbose();
			/**
			 *  You can replace this with an actual client identifier
			 */
			const db = new sqlite3_.Database(path.join(__atlaAS.__.app_root, db_path));
			db.run(`
				CREATE TABLE IF NOT EXISTS rate_limits (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					client_id TEXT NOT NULL,
					request_count INTEGER NOT NULL,
					window_start INTEGER NOT NULL
				);
			`);
			const currentTime = Math.floor(Date.now() / 1000);
			/**
			 *  Current time in seconds
			 */
			const windowStart = Math.floor(currentTime / time_window) * time_window;
			db.get(
				'SELECT `request_count` FROM `rate_limits` WHERE `client_id` = ? AND `window_start` = ?',
				[client_id, windowStart],
				(err, row) => {
					if (err) {
						console.error(err);
						db.close();
						resolve(false);
						return;
					}
					if (row) {
						if (row.request_count >= rate_limit) {
							__Response.__.response.writeHead(429, {
								'Content-Type': 'application/json',
							});
							__Response.__.response.end(
								JSON.stringify({
									code: 429,
									status: 'not enough resource',
									message: 'try again later',
								})
							);
							db.close();
							resolve(false);
							return;
						}
						/**
						 *  Delete previous records for the same client_id
						 */
						db.run(
							'DELETE FROM `rate_limits` WHERE `client_id` = ? AND `window_start` <> ?',
							[client_id, windowStart],
							(err) => {
								if (err) {
									console.error(err);
									db.close();
									resolve(false);
									return;
								}
								/**
								 *  Update request count
								 */
								db.run(
									'UPDATE `rate_limits` SET `request_count` = `request_count` + 1 WHERE `client_id` = ? AND `window_start` = ?',
									[client_id, windowStart],
									(err) => {
										if (err) {
											console.error(err);
										}
										db.close();
										resolve(true);
									}
								);
							}
						);
					} else {
						/**
						 *  Insert a new rate limit record
						 */
						db.run(
							'INSERT INTO `rate_limits` (`client_id`, `request_count`, `window_start`) VALUES (?, 1, ?)',
							[client_id, windowStart],
							(err) => {
								if (err) {
									console.error(err);
								}
								db.close();
								resolve(true);
							}
						);
					}
				}
			);
		});
	};
}
