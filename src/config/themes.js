import { createMuiTheme } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: pink[500],
		},
	},
});

export const appbarTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff',
			contrastText: pink[500],
		},
		text: {
			primary: pink[500],
		},
	},
});

export const toolbarTheme = createMuiTheme({
	palette: {
		primary: {
			main: pink[400],
			contrastText: '#fff',
		},
		secondary: {
			main: pink[400],
			contrastText: '#fff',
		},
	},
});
