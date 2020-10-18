import {
	Button,
	Card,
	CardActions,
	CardContent,
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
import { blue, green, red } from '@material-ui/core/colors';
import React, { Component } from 'react';

const styles = (theme) => ({
	dialog: {
		width: '30vw',
	},
	name: {
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
	},
	titleKey: {
		marginBottom: theme.spacing(2),
	},
});

const themeStatusPendant = createMuiTheme({
	palette: {
		primary: {
			main: blue[500],
		},
	},
});

const themeStatusSuccess = createMuiTheme({
	palette: {
		primary: {
			main: green[700],
		},
	},
});

const themeStatusError = createMuiTheme({
	palette: {
		primary: {
			main: red[400],
		},
	},
});

class AccountDetail extends Component {
	render() {
		const {
			open,
			classes,
			onClose,
			onNewKey,
			account,
			voiceKeys,
			onDeleteKey,
		} = this.props;

		return (
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Detalles de la cuenta</DialogTitle>
				<DialogContent>
					<Grid
						container
						direction='column'
						spacing={2}
						className={classes.dialog}
					>
						<Grid item xs={12} className={classes.name}>
							<Typography color='primary' variant='h5'>
								{account.name}
							</Typography>
							<Typography color='textSecondary' gutterBottom>
								{account.phone}
							</Typography>
						</Grid>
						<Grid item xs={12} container direction='row'>
							<Grid item xs={12} className={classes.titleKey}>
								<Typography variant='h6' color='secondary'>
									Patrones de huella digital
								</Typography>
							</Grid>
							{voiceKeys.length === 0 && (
								<Grid item xs={12}>
									<Typography
										varaitn='h6'
										color='textSecondary'
									>
										Esta cuenta no tiene huellas de voz
										registradas
									</Typography>
								</Grid>
							)}
							{voiceKeys.map((key, i) => (
								<Grid item xs={12} key={i}>
									<Card elevation={0} variant='outlined'>
										<CardContent>
											<Typography variant='h6'>
												{key.name}
											</Typography>
											<ThemeProvider
												theme={
													key.status === 0
														? themeStatusPendant
														: key.status === 1
														? themeStatusError
														: themeStatusSuccess
												}
											>
												<Typography
													variant='overline'
													gutterBottom
													color='primary'
												>
													Estado:{' '}
													{key.status === 0
														? 'pendiente'
														: key.status === 1
														? 'error'
														: 'completado'}
												</Typography>
											</ThemeProvider>
										</CardContent>
										<CardActions>
											<Grid
												container
												direction='row'
												justify='flex-end'
											>
												<Button
													variant='text'
													color='secondary'
													onClick={(e) =>
														onDeleteKey(key)
													}
												>
													eliminar
												</Button>
											</Grid>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onNewKey}
					>
						Agregar huella de voz
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default withStyles(styles)(AccountDetail);
