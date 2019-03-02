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
				{ item: 'Do this thing', status: null },
				{ item: 'Do other thing', status: 'done' },
				{ item: 'Do something else', status: 'question' }
			]
		},
		{
			name: 'Step 2',
			checklist: [
				{ item: 'Do this thing', status: null },
				{ item: 'Do other thing', status: 'done' },
				{ item: 'Do something else', status: 'question' },
				{ item: 'More things', status: null },
				{ item: 'Even more things', status: null }
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

