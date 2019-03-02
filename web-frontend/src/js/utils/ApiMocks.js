'use strict';

import Pretender from 'pretender';

const basePath = 'http://localhost:8080/api';
const fakeTimeout = 1000;


const userWizardResponse =(name) =>  ({
	name: name,
	team: 'hbr',
	steps: [
		{
			name: 'Introduction',
			description: `Welcome to Shift4 on boarding!`
		},
		{
			name: 'Step 1',
			checklist: [
				{ id: 1, item: 'Do this thing', status: null },
				{ id: 2, item: 'Do other thing', status: 'done' },
				{ id: 3, item: 'Do something else', status: 'question' }
			]
		},
		{
			name: 'Step 2',
			checklist: [
				{ id: 4, item: 'Do this thing', status: null },
				{ id: 5, item: 'Do other thing', status: 'done' },
				{ id: 6, item: 'Do something else', status: 'question' },
				{ id: 7, item: 'More things', status: null },
				{ id: 8, item: 'Even more things', status: null }
			]
		},
		{
			name: 'Done',
			description: 'Welcome to our family!'
		}
	]
});

export default function mockApi() {
	return new Pretender(function() {

		this.post(`${basePath}/wizard`, (req) => {
			const body = JSON.parse(req.requestBody);
			return respond([
				201,
				{ 'content-type': 'application/javascript' },
				JSON.stringify(userWizardResponse(body.name))
			])
		});

		this.get(`${basePath}/wizard/:name`, (req) => {
			const name = req.params.name;
			return respond([
				200,
				{ 'content-type': 'application/javascript' },
				JSON.stringify(userWizardResponse(name))
			])
		});
	});
}

function respond(response) {
	return new Promise(resolve => {
		setTimeout(() => resolve(response), fakeTimeout);
	});
}

