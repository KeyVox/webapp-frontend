import { Grid, Paper } from '@material-ui/core';
import React, { Component } from 'react';

export default class HeaderCell extends Component {
	render() {
		const { xs, children, classes } = this.props;
		return (
			<Grid item xs={xs}>
				<Paper className={classes.headerPaper} elevation={0}>
					{children}
				</Paper>
			</Grid>
		);
	}
}
