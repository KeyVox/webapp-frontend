import { deepOrange } from '@material-ui/core/colors';

export default (theme) => ({
	container: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(3, 2),
		background: 'white',
	},
	title: {
		padding: theme.spacing(3),
	},
	mainRow: {
		flexGrow: 1,
	},
	headerPaper: {
		padding: theme.spacing(1, 2),
		color: theme.palette.primary.main,
		backgroundColor: '#ffffff66',
	},
	headerGrid: {
		backgroundColor: deepOrange[100] + '55',
	},
	cellPaper: {
		padding: theme.spacing(0.5, 3),
		height: '100%',
		alignItems: 'center',
		display: 'flex',
	},
});
