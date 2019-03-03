'use strict';

import React from 'react';
import { navigate } from '@reach/router';

export default function StepActions({ stepNumber, totalSteps, disableNext, onFinishLater, onFinish }) {

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

	return (
		<div className="step-actions">
			<div className="finish-later">
				<button className="button is-danger" onClick={onFinishLater}>Finish Later</button>
			</div>
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
				<button className="button is-primary" onClick={onFinish} disabled={disableNext}>
					Finish
				</button>}
			</div>
		</div>
	);
}
