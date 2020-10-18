import {
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	withStyles,
} from '@material-ui/core';

import { InfoOutlined, Delete } from '@material-ui/icons';

import React, { Component, Fragment } from 'react';
import HeaderCell from '../components/headerCell';
import ClientRow from '../components/clientRow';
import styles from '../config/styles/accounts';
import AccountForm from '../components/accountForm';
import HotwordForm from '../components/hotwordForm';
import LoadingDialog from '../components/loadingDialog';
import AccountDetail from '../components/accountDetail';
import DeleteAccountDialog from '../components/deleteAccountDialog';
import DeleteKeyDialog from '../components/deleteKeyDialog';

import { requestPost } from '../lib/requests';

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newAccount: false,
			newVoiceKey: false,
			deleteKeyConfirm: false,
			deleteAccountConfirm: false,
			accountDetail: true,
			loading: false,
			account: {
				name: 'Alan',
				phone: '+525537000967',
			},
			voiceKey: {
				name: 'Voice key',
				id: '1',
			},
			voiceKeys: [{ name: 'Prueba', id: '1' }],
			accounts: [],
		};
	}

	componentDidMount() {
		requestPost('/api/validation/login', {
			publicKey: 'hola',
		})
			.then((r) => console.log(r))
			.catch(console.log);
	}

	handleAccountChange(key, e) {
		const account = this.state.account;
		account[key] = e.target.value;
		this.setState({ account });
	}

	render() {
		const { classes } = this.props;

		return (
			<Fragment>
				<DeleteAccountDialog
					open={this.state.deleteAccountConfirm}
					onClose={(e) =>
						this.setState({ deleteAccountConfirm: false })
					}
					onConfirm={(e) => console('Eliminar cuenta')}
				/>
				<AccountForm
					open={this.state.newAccount}
					onSubmit={(e) => console.log(e)}
					onClose={(e) => this.setState({ newAccount: false })}
				/>
				<AccountDetail
					open={this.state.accountDetail}
					onClose={(e) => this.setState({ accountDetail: false })}
					account={this.state.account}
					voiceKeys={this.state.voiceKeys}
					onNewKey={(e) => this.setState({ newVoiceKey: true })}
					onDeleteKey={(e) => {
						console.log(e);
						this.setState({ deleteKeyConfirm: true });
					}}
				/>
				<DeleteKeyDialog
					open={this.state.deleteKeyConfirm}
					onClose={(e) => this.setState({ deleteKeyConfirm: false })}
					onConfirm={(e) => console.log('Eliminar huella de voz')}
				/>
				<HotwordForm
					open={this.state.newVoiceKey}
					onClose={(e) => this.setState({ newVoiceKey: false })}
					onSubmit={(e) => console.log(e)}
				/>
				<Container className={classes.container}>
					<Card>
						<CardContent>
							<Grid
								container
								className={classes.title}
								direction='row'
								justify='space-between'
							>
								<Typography variant='h5'>Cuentas</Typography>
								<Button
									color='primary'
									variant='contained'
									onClick={(e) =>
										this.setState({ newAccount: true })
									}
								>
									Nueva cuenta
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
							{this.state.accounts.map((elem, i) => (
								<ClientRow
									key={i}
									classes={classes}
									id={elem.accountNumber}
									name={elem.name}
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
							))}
						</CardContent>
					</Card>
				</Container>
				<LoadingDialog open={this.state.loading} />
			</Fragment>
		);
	}
}

export default withStyles(styles)(Page);
