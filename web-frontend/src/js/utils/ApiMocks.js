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
			mustComplete: true,
			checklist: [
				stepItem(`Open Safari`),
				stepItem(`Go to gmail.com`),
				stepItem(`Use email/password you got from IT (If not, ask Robert Zibert rzibert@shift4.com )`),
				stepItem(`Do not allow access to other apps.`)
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

		this.get(`${basePath}/dashboard/:team`, (req) => {
			return respond([
				200,
				{ 'content-type': 'application/javascript' },
				JSON.stringify({
					team: req.params.team,
					links: [
						{
							name: 'Confluence',
							uri: 'https://confluence.shift4payments.com',
							description: `Has all high level information and documentation`
						},
						{
							name: 'JIRA',
							uri: 'https://jira.shift4payments.com/',
							description: `All tasks are here`
						},
						{
							name: 'Gitlab',
							uri: 'https://git.shift4payments.com/',
							description: `This is where our code lives`
						}
					]
				})
			])
		});

		this.get(`${basePath}/admin/user-progress`, (req) => {
			return respond([
				200,
				{ 'content-type': 'application/javascript' },
				JSON.stringify({
					wizards: [
						{
							wizardId: 1,
							user: 'Vaidotas',
							team: 'Lighthouse',
							completed: 6,
							questions: 2,
							total: 10
						},
						{
							wizardId: 2,
							user: 'Arunas',
							team: 'HT Support',
							completed: 7,
							questions: 1,
							total: 15
						},
						{
							wizardId: 3,
							user: 'Oleg',
							team: 'LMS',
							completed: 8,
							questions: 1,
							total: 12
						}
					]
				})
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

