'use strict';

import React from 'react';
import { navigate } from '@reach/router';

export default function StepButtons({ stepNumber, totalSteps }) {

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
		<div>
			{stepNumber > 0 &&
			<button className="button is-primary" onClick={handleStepPrev}>Previous</button>}
			{(stepNumber < totalSteps - 1) &&
			<button className="button is-primary" onClick={handleStepNext}>Next</button>}
			{(stepNumber === totalSteps - 1) &&
			<button className="button is-primary" onClick={handleFinish}>Finish</button>}
		</div>
	);
}
