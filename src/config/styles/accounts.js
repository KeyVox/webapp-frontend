import { pink, grey } from '@material-ui/core/colors';

export default (theme) => ({
	container: {
		marginTop: theme.spacing(3),
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
		backgroundColor: pink[100] + '55', // '#ffffff66',
	},
	headerGrid: {
		// backgroundColor: pink[100] + '55',
	},
	cellPaper: {
		padding: theme.spacing(0.5, 3),
		height: '100%',
		alignItems: 'center',
		display: 'flex',
	},
	row: {
		height: '100%',
		background: grey[100] + 'DD',
		transition: 'background 137ms ease-in-out',
		'&:hover': {
			background: grey[200],
		},
	},
	mediumDialog: {
		width: '20vw',
	},
});
