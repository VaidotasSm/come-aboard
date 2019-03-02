'use strict';

import React, { useContext, useState } from 'react';
import { ActionTypes, GlobalReducerContext } from '../../utils/GlobalState';
import * as Api from '../../utils/Api';

export default function HomePage() {
	const { state, dispatch } = useContext(GlobalReducerContext);
	const [name, setName] = useState('');

	const handleNameChanged = (event) => {
		setName(event.target.value);
	};
	const handleStartWizard = () => {
		if (!name) {
			return;
		}

		dispatch({ type: ActionTypes.WIZARD_START, name });
		Api.crateWizard(name, dispatch);
	};

	const buttonStyles = "button is-primary is-fullwidth" + (state.isLoading ? ' is-loading' : '');
	return (
		<div>
			<div className="title is-2">Welcome</div>

			<div className="boarding-start">
				<div className="item field">
					<input
						className="input is-primary" type="text" placeholder="Your Name"
						value={name} onChange={handleNameChanged}
					/>
				</div>
				<div className="item">
					<button className={buttonStyles} onClick={handleStartWizard}>
						Start
					</button>
				</div>
			</div>
		</div>
	);
};
