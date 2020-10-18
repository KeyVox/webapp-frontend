import axios from 'axios';

import { Cookies } from 'react-cookie';

const cookie = new Cookies();

const root = 'http://localhost:6969';

export async function generateToken() {
	try {
		const r = await axios
			.post(root + '/api/validation/login', {
				publicKey: '7Kb443PWqFBP5iO84pnSYA==',
			})
			.then((r) => r.json());
		console.log(r);
		cookie.set('token', r.token, { path: '/' });
	} catch (err) {
		console.log(err);
		console.log(err.response);
	}
}

export async function requestPost(url, body) {
	try {
		const r = await axios
			.post(root + url, body, {
				headers: {
					authorization: cookie.get('token'),
				},
			})
			.then((r) => r.json());
		return r;
	} catch (err) {
		console.log(err.response);
		return null;
	}
}

export async function requestFile(formData) {
	try {
		const r = await axios
			.post(root + '/api/file/uploadFile', formData, {
				headers: {
					'Content-type': 'multipart/form-data',
				},
			})
			.then((r) => r.json());
		return r;
	} catch (err) {
		console.log(err.response);
		return null;
	}
}
