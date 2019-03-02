'use strict';

import { ActionTypes } from './GlobalState';
const basePath = 'http://localhost:8080/api';

export function crateWizard(name, dispatch) {
	fetch(`${basePath}/wizard`, {
		method: 'post',
		body: JSON.stringify({
			name
		})
	})
		.then((res) => res.json())
		.then((response) => {
			dispatch({ type: ActionTypes.WIZARD_START_SUCCESS, response });
		})
		.catch((error) => dispatch({ type: ActionTypes.WIZARD_START_ERROR, error }));
}

