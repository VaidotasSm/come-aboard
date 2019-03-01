'use strict';

import Pretender from 'pretender';

export default function mockApi() {
	return new Pretender(function() {
		this.get('http://localhost:8080/api/something', () => {
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
	});
}

