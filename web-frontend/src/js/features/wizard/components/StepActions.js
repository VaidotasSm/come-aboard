'use strict';

import React from 'react';
import { navigate } from '@reach/router';

export default function StepActions({ stepNumber, totalSteps, disableNext }) {

	const handleStepPrev = () => {
		if (stepNumber <= 0) {
			return;
		}
		navigate(`/wizard/steps/${stepNumber - 1}`);
	};
	const handleStepNext = () => {
		if (stepNumber >= totalSteps || disableNext) {
			return;
		}
		navigate(`/wizard/steps/${stepNumber + 1}`);
	};
	const handleFinish = () => {
		if (disableNext) {
			return;
		}
		navigate('/');
	};

	return (
		<div className="step-actions">
			<div>
				{stepNumber > 0 &&
				<button className="button is-primary" onClick={handleStepPrev}>Previous</button>}
			</div>
			<div>
				{(stepNumber < totalSteps - 1) &&
				<button className="button is-primary" onClick={handleStepNext} disabled={disableNext}>
					Next
				</button>}
			</div>
			<div>
				{(stepNumber === totalSteps - 1) &&
				<button className="button is-primary" onClick={handleFinish} disabled={disableNext}>
					Finish
				</button>}
			</div>
		</div>
	);
}
