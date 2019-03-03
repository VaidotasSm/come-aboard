'use strict';

import React, { useContext } from 'react';
import { Actions, GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';

export default function DashboardPage() {
	const { state, dispatch } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard) {
		return <Redirect to="/" noThrow/>;
	}
	if (!state.wizardDone) {
		return <Redirect to="/wizard" noThrow/>;
	}

	if (!state.dashboard && !state.isLoading) {
		Actions.loadDashboard(state.wizard.team, dispatch);
		return <div className="title is-2 has-text-centered">Loading...</div>
	}

	if (!state.dashboard || state.isLoading) {
		return <div className="title is-2 has-text-centered">Loading...</div>
	}

	return (
		<div>
			<div className="title is-2 has-text-centered">Dashboard</div>

			<div className="title is-5">Links</div>
			<div className="dashboard-links">
				<table className="table">
					<tbody>
						{state.dashboard.links.map((link) => (
							<tr>
								<td><a href={link.uri}>{link.name}</a></td>
								<td>{link.description}</td>
							</tr>
						))}
					</tbody>
				</table>

			</div>
		</div>
	);
}

