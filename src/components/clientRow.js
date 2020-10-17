import { Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';

class ClientCell extends Component {
	render() {
		const { classes, children, xs } = this.props;
		return (
			<Grid item xs={xs}>
				<Paper className={classes.cellPaper} elevation={0}>
					{children}
				</Paper>
			</Grid>
		);
	}
}

export default class ClientRow extends Component {
	render() {
		const { classes, id, name, options } = this.props;

		return (
			<Grid container direction='row' spacing={1}>
				<ClientCell xs={5} classes={classes}>
					{id}
				</ClientCell>
				<ClientCell xs={5} classes={classes}>
					{name}
				</ClientCell>
				<ClientCell xs={2} classes={classes}>
					{options}
				</ClientCell>
			</Grid>
		);
	}
}
