import axios from 'axios';

const root = 'http://localhost:6969';

export async function generateToken() {
	try {
		const r = await axios
			.post(root + '/api/validation/login', {
				publicKey: '7Kb443PWqFBP5iO84pnSYA==',
			})
			.json();
		localStorage.setItem('token', r.token);
	} catch (err) {
		console.log(err.response);
	}
}

export async function requestPost(url, body) {
	try {
		const r = await axios
			.post(root + url, body, {
				headers: {
					authorization: localStorage.getItem('token'),
				},
			})
			.json();

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
			.json();
		return r;
	} catch (err) {
		console.log(err.response);
		return null;
	}
}
