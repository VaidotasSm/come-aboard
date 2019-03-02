'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';

export default function WizardPage() {
	const { state } = useContext(GlobalReducerContext);
	if (!state.wizard) {
		return <Redirect to="/" noThrow />;
	}

	return (
		<div>
			<div className="title is-2">Wizard</div>
			<div className="title is-3">Steps: {state.wizard.steps.length}</div>
		</div>
	);
}

