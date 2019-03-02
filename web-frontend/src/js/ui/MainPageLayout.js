'use strict';

import React, { useContext } from 'react';

import Logo from '../../assets/Come-Aboard.png'

export default function MainPageTemplate(props) {
	return (
		<div className="main-layout">
			<section className="main-layout-item header hero is-primary">
				<img src={Logo} height="150px" width={"150px"} />
			</section>
			<div className="main-layout-item header1"></div>
			<div className="main-layout-item header2"></div>

			<div className="main-layout-item content">
				{props.children}
			</div>
		</div>
	);
};
