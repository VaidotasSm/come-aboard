'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';
import StepButtons from './components/StepButtons';

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
				<div className="title is-2">{stepObj.name}</div>
				<div>
					<p>{stepObj.description}</p>
				</div>
				<div>
					{stepObj.checklist && stepObj.checklist.map(item => (
						<div key={item.item}>{item.item} - {item.status}</div>
					))}
				</div>
			</div>

			<div>
				<StepButtons stepNumber={stepNumber} totalSteps={state.wizard.steps.length}/>
			</div>
		</div>
	);
}
