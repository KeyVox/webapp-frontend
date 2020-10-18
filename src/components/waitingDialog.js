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
import { pink } from '@material-ui/core/colors';
import React, { Component } from 'react';

const styles = (theme) => ({
	content: {
		width: '20vw',
		padding: theme.spacing(2),
	},
	paper: {
		background: pink[400],
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
							Esperando verificacion
						</Typography>
					</DialogTitle>
					<DialogContent>
						<Grid
							container
							direction='row'
							justify='center'
							className={classes.content}
						>
							<CircularProgress size={80} />
						</Grid>
					</DialogContent>
					<DialogActions></DialogActions>
				</Dialog>
			</ThemeProvider>
		);
	}
}

export default withStyles(styles)(WaitingDialog);
