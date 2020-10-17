import { Button, Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';

import { ChevronLeft, ChevronRight } from '@material-ui/icons';

import styles from '../config/styles/pagination';

class Pagination extends Component {
	render() {
		const { classes, pages, value, onChange } = this.props;
		const page = [];

		for (let i = 0; i < pages; i++) {
			page.push(i + 1);
		}

		let start = value - 3;
        let end = value + 2;

		return (
			<Grid
				container
				direction='row'
				justify='center'
				spacing={1}
				className={classes.pagination}
			>
				<Grid item>
					<Button
						onClick={(e) => onChange(value - 1)}
						variant='contained'
						color='primary'
						style={{ width: 'auto', minWidth: 'auto' }}
						disabled={value === 1}
					>
						<ChevronLeft />
					</Button>
				</Grid>
				{page
					.slice(start > 0 ? start : 0, end > pages ? pages : end)
					.map((i) => (
						<Grid item key={i}>
							<Button
								onClick={(e) => onChange(i)}
								variant='contained'
								color='primary'
								style={{ width: 'auto', minWidth: 'auto' }}
								disabled={i === value}
							>
								{i}
							</Button>
						</Grid>
					))}
				<Grid item>
					<Button
						onClick={(e) => onChange(value + 1)}
						variant='contained'
						color='primary'
						style={{ width: 'auto', minWidth: 'auto' }}
						disabled={value === pages}
					>
						<ChevronRight />
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Pagination);
