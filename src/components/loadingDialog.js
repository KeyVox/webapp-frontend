import {
	Dialog,
	DialogContent,
	LinearProgress,
	withStyles,
} from '@material-ui/core';
import React, { Component } from 'react';

const styles = (theme) => ({
	dialog: {
		width: '20vw',
		padding: theme.spacing(2),
	},
});


export default withStyles(styles)(
	class LoadingDialog extends Component {
		render() {
			const { open, classes } = this.props;

			return (
				<Dialog open={open}>
					<DialogContent className={classes.dialog}>
						<LinearProgress
							color='primary'
							variant='indeterminate'
						/>
					</DialogContent>
				</Dialog>
			);
		}
	}
);
