'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.scss';
import MainPageLayout from './ui/MainPageLayout';
import HomePage from './features/home/HomePage';
import NotFoundPage from './features/NotFoundPage';
import { GlobalReducerProvider } from './utils/GlobalState';
import WizardPage from './features/wizard/WizardPage';
import { Router } from '@reach/router';
import mockApi from './utils/ApiMocks';
import ErrorBoundary from './features/ErrorBoundry';
import WizardStepPage from './features/wizard/WizardStepPage';
import DashboardPage from './features/dashboard/DashboardPage';
import WizardProgressPage from './features/wizard/WizardProgressPage';

mockApi();

ReactDOM.render(
	<ErrorBoundary>
		<GlobalReducerProvider>
			<MainPageLayout>
				<Router>
					<HomePage path="/"/>
					<WizardPage path="/wizard"/>
					<WizardStepPage path="/wizard/steps/:step"/>
					<WizardProgressPage path="/wizard/progress"/>
					<DashboardPage path="/dashboard" />
					<NotFoundPage default/>
				</Router>
			</MainPageLayout>
		</GlobalReducerProvider>
	</ErrorBoundary>,
	document.getElementById('app')
);
