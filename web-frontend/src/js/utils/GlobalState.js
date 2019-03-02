'use strict';

import React, { useReducer } from 'react';
import { navigate } from '@reach/router';

const ActionTypes = {
	START_WIZARD: 'START_WIZARD'
};

function reducer(state, action) {
	switch (action.type) {
	case ActionTypes.START_WIZARD:
		navigate("/wizard");
		return { ...state, name: action.name };
	default:
		throw new Error('Unexpected action');
	}
}

const GlobalReducerContext = React.createContext();

function GlobalReducerProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, {});
	return (
		<GlobalReducerContext.Provider value={{state, dispatch}}>
			{children}
		</GlobalReducerContext.Provider>
	);
}

export {
	ActionTypes,
	GlobalReducerContext,
	GlobalReducerProvider
};
