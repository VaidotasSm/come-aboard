'use strict';

import React from 'react';

export default class ErrorBoundary extends React.Component {
	componentDidCatch(err) {
		console.log('~~~ err-global', err);
	}

	render() {
		return this.props.children;
	}
}
