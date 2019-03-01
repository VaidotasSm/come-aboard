'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Redirect, Route} from 'react-router';
import {BrowserRouter, Link} from 'react-router-dom';
import '../css/index.scss';

const MainPageTemplate = (props) => {
	return (
		<div>
			<section className="hero is-primary">
				<div className="hero-body">
					<div className="container">
						<h1 className="title">
							Primary title
						</h1>
						<h2 className="subtitle">
							Primary subtitle
						</h2>
					</div>
				</div>
			</section>
			<div>
				{props.children}
			</div>
			<div>Footer</div>
		</div>
	);
};

const HomePage = (props) => {
	return (
		<div>
			<h3>Home Page</h3>
		</div>
	);
};

const ExamplePage = (props) => {
	return <div>Empty Example Page</div>
};

const NotFoundPage = (props) => {
	return <div>Page not found</div>;
};

ReactDOM.render(
	<BrowserRouter>
		<MainPageTemplate>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route exact path='/example' component={ExamplePage}/>
				<Route component={NotFoundPage}/>
			</Switch>
		</MainPageTemplate>
	</BrowserRouter>,
	document.getElementById('app')
);
