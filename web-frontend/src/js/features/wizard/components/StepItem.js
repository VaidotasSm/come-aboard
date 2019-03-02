'use strict';

import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { Actions, GlobalReducerContext } from '../../../utils/GlobalState';

export default function StepItem({ item }) {
	const checkColor = item.status === 'done' ? 'green' : 'black';
	const problemColor = item.status === 'question' ? 'red' : 'black';

	const { dispatch } = useContext(GlobalReducerContext);
	const handleDone = () => {
		if (item.status === 'done') {
			return Actions.modifyWizardItemStatus(item.id, null, dispatch);
		} else {
			return Actions.modifyWizardItemStatus(item.id, 'done', dispatch);
		}
	};

	const handleQuestion = () => {
		if (item.status === 'question') {
			return Actions.modifyWizardItemStatus(item.id, null, dispatch);
		} else {
			return Actions.modifyWizardItemStatus(item.id, 'question', dispatch);
		}
	};

	return <>
		<div className="step-item item">
			{item.item}
		</div>

		<div className="step-item step-item-actions">
			<div className="step-item-action" onClick={handleDone}>
				<FontAwesomeIcon
					icon={faCheck}
					color={item.status === 'done' ? 'green' : 'black'}/>
			</div>
			<div className="step-item-action" onClick={handleQuestion}>
				<FontAwesomeIcon
					icon={faExclamationCircle}
					color={item.status === 'question' ? 'red' : 'black'}/>
			</div>
		</div>
	</>;
}
