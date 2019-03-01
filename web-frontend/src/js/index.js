'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import '../css/index.scss';
import mockApi from './utils/api-mocks';
import MainPageLayout from './ui/MainPageLayout';
import HomePage from './features/home/HomePage';
import NotFoundPage from './features/NotFoundPage';

mockApi();

function ExamplePage(props) {
	return <div>Empty Example Page</div>
}

ReactDOM.render(
	<BrowserRouter>
		<MainPageLayout>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route exact path='/example' component={ExamplePage}/>
				<Route component={NotFoundPage}/>
			</Switch>
		</MainPageLayout>
	</BrowserRouter>,
	document.getElementById('app')
);
