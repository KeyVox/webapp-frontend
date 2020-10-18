import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import React, { Component } from 'react';

export default class DeleteAccountDialog extends Component {
	render() {
		const { onConfirm, onClose, open } = this.props;

		return (
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Eliminar cuenta</DialogTitle>
				<DialogContent>
					¿Estas seguro que quieres eliminar la cuenta?
				</DialogContent>
				<DialogActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onConfirm}
					>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
