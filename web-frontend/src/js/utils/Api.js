'use strict';

import { ActionTypes } from './GlobalState';

const basePath = 'http://localhost:8080/api';

export function crateWizard({ name, team }) {
	return fetch(`${basePath}/wizard`, {
	method: 'post',
	body: JSON.stringify({ name, team })
})
	.then((res) => res.json())
	.then((res) => {
		return res;
	});
}

export function getDashboard(team) {
	return fetch(`${basePath}/dashboard/${team}`, {
		method: 'get'
	})
		.then((res) => res.json());
}
