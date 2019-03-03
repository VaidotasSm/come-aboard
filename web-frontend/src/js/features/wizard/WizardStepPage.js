'use strict';

import React, { useContext } from 'react';
import { Actions, GlobalReducerContext } from '../../utils/GlobalState';
import { navigate, Redirect } from '@reach/router';
import StepActions from './components/StepActions';
import StepDisplay from './components/StepDisplay';

export default function WizardStepPage(props) {
	const { state, dispatch } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard || !props.step) {
		return <Redirect to="/" noThrow/>;
	}

	const stepNumber = parseInt(props.step);
	const stepObj = state.wizard.steps[stepNumber];
	const disableNext = stepObj.mustComplete && hasIncompleteItems(state.wizard.steps, stepObj);

	const handleFinishLater = () => {
		navigate('/wizard/progress');
	};
	const handleFinish = () => {
		if (disableNext) {
			return;
		}

		Actions.finishWizard(dispatch);
		navigate('/dashboard');
	};

	return (
		<div className="step-page">
			<div>
				<StepDisplay step={stepObj}/>
			</div>

			<StepActions
				stepNumber={stepNumber}
				totalSteps={state.wizard.steps.length}
				disableNext={disableNext}
				onFinishLater={handleFinishLater}
				onFinish={handleFinish}
			/>
		</div>
	);
}

function hasIncompleteItems(allSteps, stepObj) {
	for (let step of allSteps) {
		const itemNotDone = step.checklist && step.checklist.find((c) => c.status !== 'done');
		if (itemNotDone) {
			return true;
		}

		// Finish on current step
		if (step === stepObj) {
			return false;
		}
	}
}
