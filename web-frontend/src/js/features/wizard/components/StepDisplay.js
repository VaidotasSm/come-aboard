'use strict';

import React from 'react';
import StepItem from './StepItem';

export default function StepDisplay({ step }) {
	return (
		<div className="step-display">
			<div className="title is-4">{step.name}</div>
			<div>
				<p>{step.description}</p>
			</div>
			<div className="step-items">
				{step.checklist && step.checklist.map(item => (
					<StepItem key={item.id} item={item}/>
				))}
			</div>
		</div>
	);
}
