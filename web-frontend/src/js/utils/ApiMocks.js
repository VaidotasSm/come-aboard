'use strict';

import Pretender from 'pretender';

const basePath = 'http://localhost:8080/api';
const fakeTimeout = 1000;


const userWizardResponse = (name) => ({
	name: name,
	team: 'hbr',
	steps: [
		{
			name: 'Introduction',
			description: `New colleagues' on-boarding FAQ`
		},
		{
			name: 'Prerequisites',
			checklist: [
				stepItem(`Get hardware, unpack, connect everything`),
				stepItem(`All passwords have to be more than 14 characters. Please use numbers, letters, symbols.`),
				stepItem(`All screen name format for 3rd party accounts is firstname.lastname`)
			]
		},
		{
			name: 'Network setup',
			checklist: [
				stepItem(`Disable location services; Use USA location (but you can select LT timezone).`),
				stepItem(`Use Harbortouch Wi-Fi (if it does not work, connect to Harbortouch-guest for initial set up). Use Windows account and password (password you can find in your email. If any questions, ask Robert Zibert).`),
				stepItem(`Harbortouch-Guest Wi-Fi. Password:  YouDecide!`)
			]
		},
		{
			name: 'Get access to email',
			checklist: [
				stepItem(`Open Safari`),
				stepItem(`Go to gmail.com`),
				stepItem(`Use email/password you got from IT (If not, ask Robert Zibert rzibert@shift4.com )`),
				stepItem(`Do not allow access to other apps.`)
			]
		},
		{
			name: 'Setup email signature',
			checklist: [
				stepItem(`Open Safari`),
				stepItem(`Go to gmail.com`),
				stepItem(`Go to Settings > Upload Profile picture.`),
				stepItem(`Go to Settings > Signature (The template can be copied from another employee)`),
				stepItem(`Go to Gmail My Account > Sign-in & Security > Enable 2 Factor authentication`),
				stepItem(` Tick "Insert this signature before quoted text in replies and remove the "--" line that precedes it."`)
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

let stepItemId = 0;

function stepItem(item, status = null) {
	let stepItem = { id: stepItemId, item, status };
	stepItemId++;
	return stepItem;
}

function respond(response) {
	return new Promise(resolve => {
		setTimeout(() => resolve(response), fakeTimeout);
	});
}

