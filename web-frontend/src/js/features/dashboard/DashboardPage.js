'use strict';

import React, { useContext, useEffect } from 'react';
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

	useEffect(() => {
		Actions.loadDashboard(state.wizard.team, dispatch);
	}, []);

	if (state.error) {
		return <>
			<div className="title is-2 has-text-centered">
				Could not load dashboard
			</div>
			<div>Please try again later.</div>
		</>;
	}
	if (!state.dashboard) {
		return <div className="title is-2 has-text-centered">Loading...</div>;
	}

	return (
		<div>
			<div className="title is-2 has-text-centered">Dashboard</div>

			<div className="title is-5">Links</div>
			<div className="dashboard-links">
				<table className="table">
					<tbody>
						{state.dashboard.links.map((link) => (
							<tr key={link.uri}>
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

