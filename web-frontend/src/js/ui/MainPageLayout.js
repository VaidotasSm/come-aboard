'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../utils/GlobalState';

export default function MainPageTemplate(props) {
	const { state } = useContext(GlobalReducerContext);
	return (
		<div>
			<section className="hero is-primary">
				<div className="hero-body">
					<div className="container">
						<h1 className="title">
							Come Aboard
						</h1>
						<h2 className="subtitle">
							{state.name ? `Welcome ${state.name}` : 'Welcome aboard!'}
						</h2>
					</div>
				</div>
			</section>
			<div className="container app-content">
				{props.children}
			</div>
			<div className="footer">
				Footer
			</div>
		</div>
	);
};
