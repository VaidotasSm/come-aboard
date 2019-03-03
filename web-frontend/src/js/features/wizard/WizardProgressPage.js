'use strict';

'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { navigate, Redirect } from '@reach/router';

export default function DashboardPage() {
	const { state } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard) {
		return <Redirect to="/" noThrow/>;
	}

	const handleResume = () => {
		navigate('/wizard');
	};

	return (
		<div className="progress-page">
			<div className="title is-2 has-text-centered">Your Progress</div>

			<div className="progress-actions">
				<button className="button is-primary" onClick={handleResume}>Resume</button>
			</div>

			<div className="progress-table">
				<table className="table">
					<tbody>
						{state.wizard.steps.map(step => (
							<tr key={step.name}>
								<td>{step.name}</td>
								{step.checklist ?
									<td>
									<span>
										{step.checklist && step.checklist.filter(c => c.status === 'done').length}
									</span>
									/
									<span>
										{step.checklist && step.checklist.length} completed
									</span>
									</td>
									:
									<td>
										<span>No steps</span>
									</td>
								}
							</tr>
						))}
					</tbody>
				</table>

			</div>
		</div>
	);
}
