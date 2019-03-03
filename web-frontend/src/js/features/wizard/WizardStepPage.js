'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';
import StepActions from './components/StepActions';
import StepDisplay from './components/StepDisplay';

export default function WizardStepPage(props) {
	const { state } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard || !props.step) {
		return <Redirect to="/" noThrow/>;
	}

	const stepNumber = parseInt(props.step);
	const stepObj = state.wizard.steps[stepNumber];

	const disableNext = stepObj.mustComplete && hasIncompleteItems(state.wizard.steps, stepObj);
	return (
		<div className="step-page">
			<div>
				<StepDisplay step={stepObj}/>
			</div>

			<div>
				<StepActions
					stepNumber={stepNumber}
					totalSteps={state.wizard.steps.length}
					disableNext={disableNext}/>
			</div>
		</div>
	);
}

function hasIncompleteItems(allSteps, stepObj) {
	for (let step of allSteps) {
		const itemNotDone = step.checklist && step.checklist.find((c) => c.status !== 'done');
		if (itemNotDone) {
			console.log('~~~ itemNotDone', itemNotDone);
			return true;
		}

		// Finish on current step
		if (step === stepObj) {
			return false;
		}
	}
}
