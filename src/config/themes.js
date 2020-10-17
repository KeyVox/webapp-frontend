import { createMuiTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: deepOrange[500],
		},
	},
});

export const appbarTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff',
			contrastText: deepOrange[500],
		},
		text: {
			primary: deepOrange[500],
		},
	},
});

export const toolbarTheme = createMuiTheme({
	palette: {
		primary: {
			main: deepOrange[400],
			contrastText: '#fff',
		},
		secondary: {
			main: deepOrange[400],
			contrastText: '#fff',
		},
	},
});
