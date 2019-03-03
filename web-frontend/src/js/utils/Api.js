'use strict';

const basePath = process.env.API_PATH;

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

export function crateWizard({ name, team }) {
	return fetch(`${basePath}/wizard`, {
		headers,
		method: 'post',
		body: JSON.stringify({ name, team })
	})
		.then((res) => {
			return handleErrorResponses(res);
		})
		.then((res) => {
			return res;
		});
}

export function getDashboard(team) {
	return fetch(`${basePath}/dashboard/${team}`, {
		headers,
		method: 'get'
	})
		.then(handleErrorResponses);
}

export function getUserProgress() {
	return fetch(`${basePath}/admin/user-progress`, {
		headers,
		method: 'get'
	})
		.then(handleErrorResponses);
}

function handleErrorResponses(res) {
	if (res.status >= 200 && res.status < 300) {
		return res.json();
	} else {
		return res.json().then((err) => Promise.reject(err));
	}
}
