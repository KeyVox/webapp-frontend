import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Clients from './pages/clients';
import Docs from './pages/docs';
import AppBar from './components/appbar';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: deepOrange[500],
		},
	},
});

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div>
						<AppBar />
						<Switch>
							<Route path='/docs'>
								<Docs />
							</Route>
							<Route path='/'>
								<Clients />
							</Route>
						</Switch>
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}
