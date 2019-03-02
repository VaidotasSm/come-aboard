'use strict';

import Pretender from 'pretender';

const basePath = 'http://localhost:8080/api';

export default function mockApi() {
	return new Pretender(function() {
		this.get(`${basePath}/something`, () => {
			return [
				200,
				{ 'content-type': 'application/javascript' },
				JSON.stringify({
					entries: [
						{ id: 1, name: 'Name 1' },
						{ id: 2, name: 'Name 2' },
						{ id: 3, name: 'Name 3' }
					]
				})
			];
		});

		this.post(`${basePath}/wizard`, (req) => {
			const body = JSON.parse(req.requestBody);
			return [
				201,
				{ 'content-type': 'application/javascript' },
				JSON.stringify({
					name: body.name,
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
				})
			];
		});
	});
}

