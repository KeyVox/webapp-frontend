import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import React, { Component } from 'react';

export default class DeleteKeyDialog extends Component {
	render() {
		const { open, onClose, onConfirm } = this.props;

		return (
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Eliminar huella de voz</DialogTitle>
				<DialogContent>
					¿Estas seguro que quieres eliminar la huella de voz?
				</DialogContent>
				<DialogActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onConfirm}
					>
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
