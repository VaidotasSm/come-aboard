'use strict';

import React from 'react';
import { navigate } from '@reach/router';

export default function StepActions({ stepNumber, totalSteps }) {

	const handleStepNext = () => {
		if (stepNumber >= totalSteps) {
			return;
		}
		navigate(`/wizard/steps/${stepNumber + 1}`);
	};
	const handleStepPrev = () => {
		if (stepNumber <= 0) {
			return;
		}
		navigate(`/wizard/steps/${stepNumber - 1}`);
	};
	const handleFinish = () => {
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
				<button className="button is-primary" onClick={handleStepNext}>Next</button>}
			</div>
			<div>
				{(stepNumber === totalSteps - 1) &&
				<button className="button is-primary" onClick={handleFinish}>Finish</button>}

			</div>
		</div>
	);
}
