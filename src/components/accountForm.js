import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	TextField,
	withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';

const styles = (theme) => ({
	dialog: {
		width: '20vw',
	},
});

class AccountForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			id: '',
			phone: '',
		};
	}

	handleData(key, e) {
		const obj = {};
		obj[key] = e.target.value;
		this.setState(obj);
	}

	render() {
		const { open, classes, onSubmit, onClose } = this.props;
		const { name, id, phone } = this.state;

		return (
			<Dialog open={open} onClose={onClose}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit(Object.assign({}, this.state));
						this.setState({ name: '', id: '', phone: '' });
					}}
				>
					<DialogTitle>Registrar nueva cuenta</DialogTitle>
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
									variant='outlined'
									label='ID'
									value={id}
									onChange={(e) => this.handleData('id', e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									variant='outlined'
									label='Nombre'
									value={name}
									onChange={(e) => this.handleData('name', e)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									variant='outlined'
									label='Telefono'
									value={phone}
									onChange={(e) =>
										this.handleData('phone', e)
									}
									helperText='Introduce el numero telefonico completo con lada. Ej: +525540266346'
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

export default withStyles(styles)(AccountForm);
