import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
	Typography,
	withStyles,
} from '@material-ui/core';

import React, { Component } from 'react';

import AudioRecorder from './audioRecorder';

const styles = (theme) => ({
	dialog: {
		width: '25vw',
	},
});

class HotwordForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			samples: [],
			sampleOne: null,
			sampleTwo: null,
			sampleThree: null,
			loading: false,
		};
	}

	handleData(key, e) {
		const obj = {};
		obj[key] = e.target.value;
		this.setState(obj);
	}

	render() {
		const { open, classes, onSubmit, onClose } = this.props;
		const { name } = this.state;

		return (
			<Dialog open={open} onClose={onClose}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit(Object.assign({}, this.state));
						this.setState({
							name: '',
							samples: [],
							sampleOne: null,
							sampleTwo: null,
							sampleThree: null,
							loading: false,
						});
					}}
				>
					<DialogTitle>Registrar huella de voz</DialogTitle>
					<DialogContent>
						<Grid
							container
							direction='column'
							className={classes.dialog}
							spacing={2}
						>
							<Grid item xs={12}>
								<TextField
									fullWidth
									value={name}
									onChange={(e) => this.handleData('name', e)}
									variant='outlined'
									label='Introduce la frase personal'
									helperText='Esta frase es la que tiene que decir el usuario final para generar su huella de voz'
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography color='primary' variant='overline'>
									Primer muestra
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								container
								direction='row'
								justify='center'
							>
								<AudioRecorder
									onChange={(e) =>
										this.setState({ sampleOne: e })
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography color='primary' variant='overline'>
									Segunda muestra
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								container
								direction='row'
								justify='center'
							>
								<AudioRecorder
									onChange={(e) =>
										this.setState({ sampleTwo: e })
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography color='primary' variant='overline'>
									Tercer muestra
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								container
								direction='row'
								justify='center'
							>
								<AudioRecorder
									onChange={(e) =>
										this.setState({ sampleThree: e })
									}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							variant='contained'
							color='primary'
							type='submit'
						>
							Guardar
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}

export default withStyles(styles)(HotwordForm);
