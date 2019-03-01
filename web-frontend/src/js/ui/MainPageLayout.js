'use strict';

import React from 'react';

export default function MainPageTemplate(props) {
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
			<div className="container app-content">
				{props.children}
			</div>
			<div className="footer">
				Footer
			</div>
		</div>
	);
};
