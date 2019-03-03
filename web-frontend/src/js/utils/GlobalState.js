'use strict';

import React, { useReducer } from 'react';
import { navigate } from '@reach/router';
import * as Api from './Api';

const ActionTypes = {
	WIZARD_START: 'START_WIZARD',
	WIZARD_RESUME: 'WIZARD_RESUME',
	WIZARD_START_SUCCESS: 'WIZARD_START_SUCCESS',
	WIZARD_START_ERROR: 'WIZARD_START_ERROR',
	WIZARD_ITEM_MODIFY: 'WIZARD_ITEM_MODIFY',
	WIZARD_FINISH: 'WIZARD_FINISH'
};

const Actions = {
	startWizard({ name, team }, dispatch) {
		dispatch({ type: ActionTypes.WIZARD_START, value: name });
		Api.crateWizard({ name, team })
			.then((response) => {
				dispatch({ type: ActionTypes.WIZARD_START_SUCCESS, response });
			})
			.catch((error) => dispatch({ type: ActionTypes.WIZARD_START_ERROR, error }));
	},
	modifyWizardItemStatus(itemId, status, dispatch) {
		dispatch({
			type: ActionTypes.WIZARD_ITEM_MODIFY,
			value: {
				itemId,
				status
			}
		});
	},
	finishWizard(dispatch) {
		dispatch({
			type: ActionTypes.WIZARD_FINISH,
		});
	}
};

function reducer(state, action) {
	switch (action.type) {
	case ActionTypes.WIZARD_START:
	case ActionTypes.WIZARD_RESUME:
		return { ...state, name: action.value, isLoading: true };
	case ActionTypes.WIZARD_START_SUCCESS:
		navigate('/wizard');
		return { ...state, wizard: action.response, isLoading: false };
	case ActionTypes.WIZARD_START_ERROR:
		return { ...state, error: action.error, isLoading: false };
	case ActionTypes.WIZARD_ITEM_MODIFY: {
		const itemId = action.value.itemId;

		const steps = state.wizard.steps.map(step => {
			if (!step.checklist) {
				return step;
			}
			return {
				...step,
				checklist: step.checklist.map(c => {
					if (c.id === itemId) {
						return {...c, status: action.value.status}
					}

					return c;
				})
			};
		});

		const wizard = { ...state.wizard, steps };
		return { ...state, wizard, timestamp: new Date()};
	}
	case ActionTypes.WIZARD_FINISH:
		return { ...state, wizardDone: true };
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
	Actions,
	ActionTypes,
	GlobalReducerContext,
	GlobalReducerProvider
};
