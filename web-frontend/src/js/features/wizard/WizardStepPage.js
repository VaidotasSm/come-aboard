'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';
import StepButtons from './components/StepButtons';
import StepDisplay from './components/StepDisplay';

export default function WizardStepPage(props) {
	const { state, dispatch } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard || !props.step) {
		return <Redirect to="/" noThrow/>;
	}

	const stepNumber = parseInt(props.step);
	const stepObj = state.wizard.steps[stepNumber];
	return (
		<div>
			<div>
				<StepDisplay step={stepObj}/>
			</div>

			<div>
				<StepButtons stepNumber={stepNumber} totalSteps={state.wizard.steps.length}/>
			</div>
		</div>
	);
}
