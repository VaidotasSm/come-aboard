'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../../utils/GlobalState';
import { Redirect } from '@reach/router';

export default function DashboardPage() {
	const { state } = useContext(GlobalReducerContext);
	if (!state.name || !state.wizard) {
		return <Redirect to="/" noThrow/>;
	}

	if (!state.wizardDone) {
		return <Redirect to="/wizard" noThrow/>;
	}

	return (
		<div>
			<div className="title is-2 has-text-centered">Dashboard</div>

			<div className="title is-5">Links</div>
			<div className="dashboard-links">
				<table className="table">
					<tbody>
						<tr>
							<td><a href="https://confluence.shift4payments.com">Confluence</a></td>
							<td>Has all high level information and documentation</td>
						</tr>
						<tr>
							<td><a href="https://jira.shift4payments.com/">JIRA</a></td>
							<td>All tasks are here</td>
						</tr>
						<tr>
							<td><a href="https://git.shift4payments.com/">GitLab</a></td>
							<td>This is where our code lives</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>
	);
}

