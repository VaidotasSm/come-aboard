'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';

export default function WizardPage() {
	const { state } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard) {
		return <Redirect to="/" noThrow/>;
	}

	return <Redirect to="/wizard/steps/0" noThrow/>;
}

