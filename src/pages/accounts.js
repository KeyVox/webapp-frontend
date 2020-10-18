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

import { generateToken, requestFile, requestPost } from '../lib/requests';

class Page extends Component {
	voiceKeysInterval = -1;
	accountsInterval = -1;

	constructor(props) {
		super(props);
		this.state = {
			newAccount: false,
			newVoiceKey: false,
			deleteKeyConfirm: false,
			deleteAccountConfirm: false,
			accountDetail: false,
			loading: false,
			account: {
				name: 'Alan',
				phone: '+525537000967',
				_id: '',
				idAccount: '',
			},
			voiceKey: {
				name: 'Voice key',
				id: '1',
				status: 0,
			},
			voiceKeys: [{ name: 'Prueba', _id: '1' }],
			accounts: [],
		};
	}

	componentDidMount() {
		generateToken();
		this.accountsInterval = setInterval(() => {
			requestPost('/api/account/listAccountsByClient', {})
				.then((r) => {
					this.setState({ accounts: r.value });
				})
				.catch(console.log);
		}, 1000);
	}

	handleAccountChange(key, e) {
		const account = this.state.account;
		account[key] = e.target.value;
		this.setState({ account });
	}

	async showAccountDetails(account) {
		this.setState({ account: account });

		this.voiceKeysInterval = setInterval(() => {
			requestPost('/api/activationWord/getActivationWordsByAccount', {
				idAccount: account._id,
			})
				.then((r) => {
					this.setState({
						voiceKeys: r.value,
						accountDetail: true,
					});
				})
				.catch(console.log);
		}, 1000);

		requestPost('/api/activationWord/getActivationWordsByAccount', {
			idAccount: account._id,
		})
			.then((r) => {
				this.setState({
					voiceKeys: r.value,
					accountDetail: true,
				});
			})
			.catch(console.log);
	}

	async createKey(data) {
		this.setState({ loading: true });

		const formData1 = new FormData();
		const formData2 = new FormData();
		const formData3 = new FormData();
		formData1.append('file', data.sampleOne);
		formData1.append(
			'name',
			data.name + '_sampl1_' + this.state.account._id
		);
		formData1.append(
			'desc',
			data.name + '_sampl1_' + this.state.account._id
		);
		formData2.append('file', data.sampleTwo);
		formData2.append(
			'name',
			data.name + '_sampl2_' + this.state.account._id
		);
		formData2.append(
			'desc',
			data.name + '_sampl2_' + this.state.account._id
		);
		formData3.append('file', data.sampleThree);
		formData3.append(
			'name',
			data.name + '_sampl3_' + this.state.account._id
		);
		formData3.append(
			'desc',
			data.name + '_sampl3_' + this.state.account._id
		);

		const sample1 = (await requestFile(formData1))._id;
		const sample2 = (await requestFile(formData2))._id;
		const sample3 = (await requestFile(formData3))._id;

		const r = await requestPost('/api/activationWord/addActivationWord', {
			idAccount: this.state.account._id,
			name: data.name,
			samples: [sample1, sample2, sample3],
		});

		this.setState({ loading: false, newVoiceKey: false });
	}

	async createAccount(data) {
		this.setState({ loading: true });
		const r = await requestPost('/api/account/addAccount', {
			idPhoto: null,
			accountNumber: data.id,
			phoneNumber: data.phone,
			name: data.name,
		});
		this.setState({
			loading: false,
			newAccount: false,
		});
		this.showAccountDetails(r.value);
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
					onSubmit={(e) => this.createAccount(e)}
					onClose={(e) => this.setState({ newAccount: false })}
				/>
				<AccountDetail
					open={this.state.accountDetail}
					onClose={(e) => {
						clearInterval(this.voiceKeysInterval);
						this.setState({ accountDetail: false });
					}}
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
					onSubmit={(e) => this.createKey(e)}
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
												<IconButton
													size='small'
													onClick={(e) =>
														this.showAccountDetails(
															elem
														)
													}
												>
													<InfoOutlined />
												</IconButton>
											</Tooltip>
											{/* <Tooltip title='Eliminar cliente'>
												<IconButton
													size='small'
													onClick={(e) =>
														this.setState({
															account: elem,
															deleteAccountConfirm: true,
														})
													}
												>
													<Delete />
												</IconButton>
											</Tooltip> */}
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
