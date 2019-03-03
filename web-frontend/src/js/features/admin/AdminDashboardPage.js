'use strict';

import React, { useContext, useEffect } from 'react';
import { Actions, GlobalReducerContext } from '../../utils/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default function AdminDashboardPage() {
	const { state, dispatch } = useContext(GlobalReducerContext);

	console.log('~~~ userProgress', state.userProgress);
	useEffect(() => {
		Actions.loadUserProgress(dispatch);
	}, []);

	const wizards = state.userProgress && state.userProgress.wizards;
	return (
		<div className="admin-dashboard-page">
			<div className="title is-2 has-text-centered">Admin Dashboard</div>

			{state.isLoading ?
				<div className="title is-3 has-text-centered">Loading...</div>
				:
				<div className="progress-table">
					<table className="table is-hoverable">
						<tbody>
							{wizards && wizards.map((p) => (
								<tr key={p.wizardId}>
									<td>{p.user}</td>
									<td>{p.team}</td>
									<td>
										{p.completed} / {p.total}
										&nbsp;
										<FontAwesomeIcon
											icon={faCheck}
											color="green"/>
									</td>
									<td>
										{p.questions}
										&nbsp;
										<FontAwesomeIcon
											icon={faExclamationCircle}
											color="red"/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			}
		</div>
	);
};


