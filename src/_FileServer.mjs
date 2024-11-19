// @ts-check

import mime from 'mime';
import { statSync, createReadStream, readFileSync } from 'fs';
import { join as path_join, extname, basename } from 'path';
import { __Settings } from './__Settings.mjs';
import { __atlaAS } from './__atlaAS.mjs';
import { _FunctionHelpers } from './_FunctionHelpers.mjs';
import { __Response } from './__Response.mjs';
import { __Request } from './__Request.mjs';

/**
 * @description
 * - is a [helper class](#helper_class);
 * - static `methods` to handle `fileSystem` serving;
 */
export class _FileServer {
	/**
	 * @param {string} absolute_path
	 */
	static get_string = (absolute_path) => {
		absolute_path = path_join(__atlaAS.__.app_root, absolute_path);
		try {
			const content = readFileSync(absolute_path, { encoding: 'utf8' });
			return content;
		} catch (error) {
			const errorDetails = {
				message: error.message,
				stack: error.stack,
				path: absolute_path,
			};
			__Settings.__.log_to_file({
				prefix: 'read-file-error',
				content: JSON.stringify(errorDetails, null, 2),
			});
		}
	};
	/**
	 * @param {string} server_url
	 * - absolute path '/routes/'
	 * @returns {string}
	 */
	static file_version = (server_url) => {
		const public_url = server_url
			.replace(`/${__Settings.__._routes_path}`, '')
			.replace('/index', '');
		let version = '';
		try {
			version = `${public_url}?t=${statSync(
				path_join(__atlaAS.__.app_root, server_url)
			).mtime.getTime()}`;
		} catch (error) {
			return `${public_url}?v=404,NOTFOUND`;
		}
		return version;
	};
	/**
	 * @param {string[]} relative_path
	 * @param {string} system_dir
	 * @param {boolean} force_download
	 * @returns {void}
	 */
	static serves = (relative_path, system_dir, force_download = false) => {
		const atlaAS = __atlaAS.__;
		const file = path_join(system_dir, ...relative_path);
		const resource = _FileServer.page_resource_handler(file, force_download);
		switch (resource) {
			case 'is_resource_file':
				break;
			case 'is_system_file':
			case 'not_found':
				atlaAS.reroute_error(404);
				break;
		}
	};
	/**
	 * @private
	 * @param {string} file
	 * @param {boolean} force_download
	 * @returns {'is_system_file'|'is_resource_file'|'not_found'}
	 */
	static page_resource_handler = (file, force_download = false) => {
		const __settings = __Settings.__;
		const file_ext = extname(file);
		if (
			_FunctionHelpers
				.merge_unique_1d_array(__settings._system_file, ['mjs'])
				.includes(file_ext)
		) {
			return 'is_system_file';
		}
		try {
			const stats = statSync(file);
			if (stats.isFile()) {
				_FileServer.file_handler(file, force_download);
				return 'is_resource_file';
			}
		} catch (error) {}
		return 'not_found';
	};
	/**
	 * @private
	 * @param {string} filename
	 * @param {boolean} force_download
	 * @returns {void}
	 */
	static file_handler = (filename, force_download = false) => {
		this.caching(__Settings.__.use_caching()[1]);
		if (force_download) {
			this.download_force(filename);
			return;
		}
		const content_type = this.get_content_type(filename);
		const fileSize = statSync(filename).size;
		const range = __Request.__.request.headers['range'];
		if (range) {
			const parts = range.replace(/bytes=/, '').split('-');
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

			if (start >= fileSize || end >= fileSize) {
				__Response.__.response.writeHead(416, {
					'Content-Range': `bytes */${fileSize}`,
					'Content-Type': 'text/plain',
				});
				__Response.__.response.end('Requested range not satisfiable');
				return;
			}

			const chunkSize = end - start + 1;
			const fileStream = createReadStream(filename, { start, end });

			content_type &&
				__Response.__.response.writeHead(206, {
					'content-range': `bytes ${start}-${end}/${fileSize}`,
					'accept-ranges': 'bytes',
					'content-length': chunkSize,
					'content-Type': content_type,
				});

			fileStream.pipe(__Response.__.response);
			fileStream.on('error', (err) => {
				console.error('File stream error:', err);
				__Response.__.response.writeHead(500, { 'Content-Type': 'text/plain' });
				__Response.__.response.end('Internal Server Error');
			});
			return;
		}
		const fileStream = createReadStream(filename);
		__Response.__.response.setHeader('Content-Length', fileSize);
		content_type && __Response.__.response.setHeader('Content-Type', content_type);
		fileStream.pipe(__Response.__.response);
		fileStream.on('error', (err) => {
			console.error('File stream error:', err);
			__Response.__.response.writeHead(500, { 'Content-Type': 'text/plain' });
			__Response.__.response.end('Internal Server Error');
		});

		fileStream.on('end', () => {
			__Response.__.response.end();
		});
	};
	/**
	 * @private
	 * @param {number} days
	 * @param {boolean} force_cache
	 */
	static caching = (days = 60, force_cache = false) => {
		if (!__Settings.__.use_caching() && !force_cache) {
			return;
		}
		const expires = _FileServer.unix_unit_to_days(days);
		__Response.__.response
			.setHeader('Pragma', 'public')
			.setHeader('Cache-Control', `max-age=${expires}`)
			.setHeader('Expires', new Date(Date.now() + expires).toISOString() + expires);
	};
	/**
	 * @private
	 * @param {number} days
	 * @returns {number}
	 */
	static unix_unit_to_days = (days) => {
		return days * 86400 /* 60 * 24 * 60 */;
	};
	/**
	 * @private
	 * @param {string} filename
	 */
	static get_content_type = (filename) => {
		let file_size;
		try {
			file_size = statSync(filename).size;
		} catch (err) {
			console.error('Error reading file:', err);
			return;
		}
		__Response.__.response
			.setHeader('Accept-Ranges', 'bytes')
			.setHeader('Content-Length', file_size);
		const file_ext = extname(filename);
		let content_type;
		switch (file_ext) {
			case 'js':
			case 'mjs':
				content_type = 'application/javascript';
				break;
			case 'png':
				content_type = 'image/png';
				break;
			case 'bmp':
				content_type = 'image/bmp';
				break;
			case 'gif':
				content_type = 'image/gif';
				break;
			case 'tif':
			case 'tiff':
				content_type = 'image/tiff';
				break;
			case 'jpg':
			case 'jpeg':
				content_type = 'image/jpeg';
				break;
			case 'svg':
				content_type = 'image/svg+xml';
				break;
			case 'ico':
				content_type = 'image/x-icon';
				break;
			case 'mp4':
				content_type = 'video/mp4';
				break;
			case '3gp':
				content_type = 'video/3gpp';
				break;
			case 'avi':
				content_type = 'video/x-msvideo';
				break;
			case 'flv':
				content_type = 'video/x-flv';
				break;
			case 'm4v':
				content_type = 'video/x-m4v';
				break;
			case 'mkv':
				content_type = 'video/x-matroska';
				break;
			case 'mov':
				content_type = 'video/quicktime';
				break;
			case 'wmv':
				content_type = 'video/x-ms-wmv';
				break;
			case 'webm':
				content_type = 'video/webm';
				break;
			case 'html':
				content_type = 'text/html';
				break;
			case 'css':
				content_type = 'text/css';
				break;
			case 'woff':
				content_type = 'text/woff';
				break;
			case 'json':
				content_type = 'text/json';
				break;
			case 'wav':
				content_type = 'audio/wav';
				break;
			case 'amr':
				content_type = 'audio/amr';
				break;
			case 'flac':
				content_type = 'audio/flac';
				break;
			case 'm4a':
				content_type = 'audio/m4a';
				break;
			case 'midi':
				content_type = 'audio/midi';
				break;
			case 'mp3':
				content_type = 'audio/mpeg';
				break;
			case 'ogg':
				content_type = 'audio/ogg';
				break;
			case 'map':
				content_type = 'application/json';
				break;
			case 'wasm':
				content_type = 'application/wasm';
				break;
			case 'pdf':
				content_type = 'application/pdf';
				break;
			case 'pptx':
				content_type =
					'application/vnd.openxmlformats-officedocument.presentationml.presentation';
				break;
			case 'rar':
				content_type = 'application/x-rar-compressed';
				break;
			case 'swf':
				content_type = 'application/x-shockwave-flash';
				break;
			case 'tar':
				content_type = 'application/x-tar';
				break;
			case 'xls':
				content_type = 'application/vnd.ms-excel';
				break;
			case 'xlsx':
				content_type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
				break;
			case 'xml':
				content_type = 'application/xml';
				break;
			case 'zip':
				content_type = 'application/zip';
				break;
			case 'psd':
				content_type = 'image/vnd.adobe.photoshop';
				break;
			case 'ttf':
				content_type = 'font/ttf';
				break;
			case 'apk':
				content_type = 'application/vnd.android.package-archive';
				break;
			case 'cab':
				content_type = 'application/vnd.ms-cab-compressed';
				break;
			case 'dmg':
				content_type = 'application/x-apple-diskimage';
				break;
			case 'iso':
				content_type = 'application/x-iso9660-image';
				break;
			case 'ppt':
				content_type = 'application/vnd.ms-powerpoint';
				break;
			case 'rm':
				content_type = 'audio/x-pn-realaudio';
				break;
			default:
				content_type = mime.getType(filename);
				break;
		}
		// @ts-ignore
		__Response.__.response.setHeader('Content-Type', content_type);
		return content_type;
	};
	/**
	 * @private
	 * @param {string} path
	 * @returns {void}
	 */
	static download_force = (path) => {
		path = basename(path);
		__Response.__.response
			.setHeader('Content-Type', 'aplication/octet-stream')
			.setHeader('Content-Transfer-Encoding', 'Binary')
			.setHeader('Content-disposition', `filename=${path}`);
	};
}
