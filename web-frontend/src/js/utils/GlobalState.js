'use strict';

import React, { useReducer } from 'react';
import { navigate } from '@reach/router';

const ActionTypes = {
	WIZARD_START: 'START_WIZARD',
	WIZARD_START_SUCCESS: 'WIZARD_START_SUCCESS',
	WIZARD_START_ERROR: 'WIZARD_START_ERROR'
};

function reducer(state, action) {
	switch (action.type) {
	case ActionTypes.WIZARD_START:
		return { ...state, name: action.value, isLoading: true };
	case ActionTypes.WIZARD_START_SUCCESS:
		navigate('/wizard');
		return { ...state, wizard: action.response, isLoading: false };
	case ActionTypes.WIZARD_START_ERROR:
		return { ...state, error: action.error, isLoading: false };
	default:
		throw new Error('Unexpected action');
	}
}

const GlobalReducerContext = React.createContext();

function GlobalReducerProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, {});
	return (
		<GlobalReducerContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalReducerContext.Provider>
	);
}

export {
	ActionTypes,
	GlobalReducerContext,
	GlobalReducerProvider
};
