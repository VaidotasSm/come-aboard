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
	WIZARD_FINISH: 'WIZARD_FINISH',
	DASHBOARD_LOAD_START: 'DASHBOARD_LOAD_START',
	DASHBOARD_LOAD_SUCCESS: 'DASHBOARD_LOAD_SUCCESS',
	DASHBOARD_LOAD_ERROR: 'DASHBOARD_LOAD_ERROR',
	ADMIN_USER_PROGRESS_LOAD_START: 'ADMIN_USER_PROGRESS_LOAD_START',
	ADMIN_USER_PROGRESS_LOAD_SUCCESS: 'ADMIN_USER_PROGRESS_LOAD_SUCCESS',
	ADMIN_USER_PROGRESS_LOAD_ERROR: 'ADMIN_USER_PROGRESS_LOAD_ERROR'
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
	},
	loadDashboard(team, dispatch) {
		dispatch({
			type: ActionTypes.DASHBOARD_LOAD_START,
		});
		Api.getDashboard(team)
			.then((response) => {
				dispatch({
					type: ActionTypes.DASHBOARD_LOAD_SUCCESS,
					response
				});
			})
			.catch((error) => dispatch({ type: ActionTypes.DASHBOARD_LOAD_ERROR, error }));
	},

	loadUserProgress(dispatch) {
		dispatch({
			type: ActionTypes.ADMIN_USER_PROGRESS_LOAD_START,
		});

		Api.getUserProgress()
			.then((response) => {
				dispatch({
					type: ActionTypes.ADMIN_USER_PROGRESS_LOAD_SUCCESS,
					response
				});
			})
			.catch((error) => dispatch({ type: ActionTypes.ADMIN_USER_PROGRESS_LOAD_ERROR, error }));
	}
};

function reducer(state, action) {
	console.log('~~~ reducer', action);
	switch (action.type) {
	case ActionTypes.WIZARD_START:
		return { ...state, error: null, name: action.value, isLoading: true };
	case ActionTypes.WIZARD_START_SUCCESS:
		navigate('/wizard');
		return { ...state, error: null, wizard: action.response, isLoading: false };
	case ActionTypes.WIZARD_START_ERROR:
	case ActionTypes.DASHBOARD_LOAD_ERROR:
	case ActionTypes.ADMIN_USER_PROGRESS_LOAD_ERROR:
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
		return { ...state, error: null, wizard, timestamp: new Date()};
	}
	case ActionTypes.WIZARD_FINISH:
		return { ...state, error: null, wizardDone: true };
	case ActionTypes.DASHBOARD_LOAD_START:
		return { ...state, error: null, isLoading: true };
	case ActionTypes.DASHBOARD_LOAD_SUCCESS:
		return { ...state, dashboard: action.response, isLoading: false };
	case ActionTypes.ADMIN_USER_PROGRESS_LOAD_START:
		return { ...state, error: null, isLoading: true };
	case ActionTypes.ADMIN_USER_PROGRESS_LOAD_SUCCESS:
		return { ...state, error: null, userProgress: action.response, isLoading: false };
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
