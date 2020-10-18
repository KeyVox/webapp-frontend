import {
	CircularProgress,
	createMuiTheme,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	ThemeProvider,
	Typography,
	withStyles,
} from '@material-ui/core';
import { green, pink } from '@material-ui/core/colors';
import React, { Component } from 'react';

const styles = (theme) => ({
	content: {
		width: '20vw',
		padding: theme.spacing(2),
	},
	paper: {
		background: green[600],
	},
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff',
		},
	},
});

class WaitingDialog extends Component {
	render() {
		const { classes, open } = this.props;
		return (
			<ThemeProvider theme={theme}>
				<Dialog open={open} classes={{ paper: classes.paper }}>
					<DialogTitle>
						<Typography variant='h5' color='primary'>
							Cuenta verificada
						</Typography>
					</DialogTitle>
				</Dialog>
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(WaitingDialog);
