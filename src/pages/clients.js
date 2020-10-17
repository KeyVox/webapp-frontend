import {
	Button,
	Container,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	withStyles,
} from '@material-ui/core';

import { InfoOutlined, Delete } from '@material-ui/icons';

import React, { Component, Fragment } from 'react';
import Pagination from '../components/pagination';
import HeaderCell from '../components/headerCell';
import ClientRow from '../components/clientRow';
import styles from '../config/styles/clients';

class Page extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<Container className={classes.container}>
					<Grid container className={classes.title} direction='row' justify='space-between'>
						<Typography variant='h5'>Clientes</Typography>
						<Button color='primary' variant='contained'>
							Nuevo cliente
						</Button>
					</Grid>
					<Grid
						container
						direction='row'
						spacing={1}
						className={classes.headerGrid}
					>
						<HeaderCell xs={5} classes={classes}>
							ID
						</HeaderCell>
						<HeaderCell xs={5} classes={classes}>
							Nombre
						</HeaderCell>
						<HeaderCell xs={2} classes={classes}>
							Opciones
						</HeaderCell>
					</Grid>
					<ClientRow
						classes={classes}
						id='1'
						name='Prueba'
						options={
							<Grid container justify='center'>
								<Tooltip title='Ver cliente'>
									<IconButton size='small'>
										<InfoOutlined />
									</IconButton>
								</Tooltip>
								<Tooltip title='Eliminar cliente'>
									<IconButton size='small'>
										<Delete />
									</IconButton>
								</Tooltip>
							</Grid>
						}
					/>
					<ClientRow
						classes={classes}
						id='1'
						name='Prueba'
						options={
							<Grid container justify='center'>
								<Tooltip title='Ver cliente'>
									<IconButton size='small'>
										<InfoOutlined />
									</IconButton>
								</Tooltip>
								<Tooltip title='Eliminar cliente'>
									<IconButton size='small'>
										<Delete />
									</IconButton>
								</Tooltip>
							</Grid>
						}
					/>
					<Pagination
						pages={20}
						value={2}
						onChange={(page) => console.log(page)}
					/>
				</Container>
			</Fragment>
		);
	}
}

export default withStyles(styles)(Page);
