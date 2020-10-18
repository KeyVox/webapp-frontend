import {
	Button,
	ThemeProvider,
	Toolbar,
	Typography,
	withStyles,
	AppBar,
} from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { appbarTheme, toolbarTheme } from '../config/themes';
import styles from '../config/styles/appbar';

class Appbar extends Component {
	render() {
		const { classes } = this.props;

		return (
			<ThemeProvider theme={appbarTheme}>
				<AppBar position='static' color='primary'>
					<Toolbar className={classes.appbarPadding}>
						<Link to='/' style={{ textDecoration: 'none' }}>
							<Typography variant='h6' color='textPrimary'>
								KeyVox
							</Typography>
						</Link>
						<div className={classes.spacer}></div>
					</Toolbar>
				</AppBar>
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(Appbar);
