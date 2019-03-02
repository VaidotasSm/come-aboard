'use strict';

import React, { useContext, useState } from 'react';
import { ActionTypes, GlobalReducerContext } from '../../utils/GlobalState';
import * as Api from '../../utils/Api';

export default function HomePage() {
	const { state, dispatch } = useContext(GlobalReducerContext);
	const [name, setName] = useState('');
	const [team, setTeam] = useState('');
	const [errors, setErrors] = useState({ name: false, team: false });

	const handleNameChanged = (event) => {
		setName(event.target.value);
	};
	const handleTeamChanged = (event) => {
		setTeam(event.target.value);
	};
	const handleStartWizard = () => {
		if (!name || !team) {
			setErrors({
				name: !name,
				team: !team
			});
			return;
		}

		dispatch({ type: ActionTypes.WIZARD_START, value: name });
		Api.crateWizard({ name, team }, dispatch);
	};

	return (
		<div>
			<div className="level">
				<div className="level-item has-text-centered">
					<div className="title is-2">Welcome</div>
				</div>
			</div>

			<div className="boarding-start">
				<div className="item field">
					<input
						className={`input is-primary ${errors.name ? 'is-danger' : ''}`}
						type="text" placeholder="Enter Your name"
						value={name} onChange={handleNameChanged}
					/>
				</div>
				<div className="item">
					<div className={`select is-primary ${errors.team ? 'is-danger' : ''}`}>
						<select onChange={handleTeamChanged} value={team}>
							<option value=""></option>
							<option value="hbr">HBR</option>
							<option value="lighthouse">Lighthouse</option>
							<option value="lms">LMS</option>
						</select>
					</div>
				</div>
				<div className="item">
					<button
						className={'button is-primary is-fullwidth' + (state.isLoading ? ' is-loading' : '')}
						onClick={handleStartWizard}
					>
						Start
					</button>
				</div>
			</div>
		</div>
	);
};
