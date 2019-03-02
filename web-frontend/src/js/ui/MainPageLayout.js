'use strict';

import React, { useContext } from 'react';
import { GlobalReducerContext } from '../utils/GlobalState';

export default function MainPageTemplate(props) {
	const { state } = useContext(GlobalReducerContext);
	return (
		<div className="main-layout">

			<section className="main-layout-item header hero is-primary">
				<div className="hero-body">
					<div className="container">
						<h1 className="title">
							Come Aboard
						</h1>
						{state.name &&
						<h2 className="subtitle">
							Welcome {state.name}
						</h2>
						}
					</div>
				</div>
			</section>
			<div className="main-layout-item header1"></div>
			<div className="main-layout-item header2"></div>


			<div className="main-layout-item content">
				{props.children}
			</div>
		</div>
	);
};
