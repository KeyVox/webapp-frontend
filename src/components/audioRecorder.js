import {
	createMuiTheme,
	Grid,
	IconButton,
	LinearProgress,
	ThemeProvider,
	withStyles,
} from '@material-ui/core';
import { blue, blueGrey } from '@material-ui/core/colors';
import {
	MicRounded as MicActiveIcon,
	MicNoneRounded as MicInactiveIcon,
	PlayArrowRounded as PlayIcon,
	PauseRounded as PauseIcon,
} from '@material-ui/icons';

import React, { Component } from 'react';

const styles = (theme) => ({
	progress: {
		flexGrow: 1,
	},
	audioProgress: {
		position: 'relative',
		top: '50%',
		transform: 'translateY(-50%)',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
	},
});

const themeRecord = createMuiTheme({
	palette: {
		primary: {
			main: blueGrey[500],
		},
		secondary: {
			main: blue[700],
		},
	},
});

const themePlay = createMuiTheme({
	palette: {
		primary: {
			main: blueGrey[700],
		},
		secondary: {
			main: blueGrey[500],
		},
	},
});

class AudioRecorder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			audioProgress: 0,
			audio: null,
			playing: false,
			recording: false,
		};
	}

	startRecord() {
		this.setState({ recording: true, audio: null, audioProgress: 0 });
		navigator.mediaDevices
			.getUserMedia({ audio: true, video: false })
			.then((r) => {
				const options = { mimeType: 'audio/webm' };
				const recordedChunks = [];
				const recorder = new MediaRecorder(r, options);

				recorder.addEventListener('dataavailable', function (e) {
					if (e.data.size > 0) {
						recordedChunks.push(e.data);
					}
				});

				recorder.addEventListener('stop', () => {
					const blob = new Blob(recordedChunks);
					const url = URL.createObjectURL(blob);
					const audio = new Audio(url);
					audio.volume = 0;
					audio.play();
					this.setState({ recording: false });
					setTimeout(() => {
						this.setState({ audio, recording: false });
						if (this.props.onChange) {
							this.props.onChange(audio);
						}
					}, 5000);
				});

				recorder.start();

				const interval = setInterval(() => {
					const actual = this.state.audioProgress;

					this.setState({
						audioProgress: actual + (100 / 500) * 10,
					});
				}, 100);

				setTimeout(() => {
					recorder.stop();
					clearInterval(interval);
				}, 5000);
			});
	}

	playAudio() {
		const { audio } = this.state;
		if (audio) {
			audio.volume = 1;
			audio.currentTime = 0;
			this.setState({ playing: true, audioProgress: 0 });

			audio.addEventListener(
				'timeupdate',
				() => {
					if (audio.currentTime === audio.duration) {
						this.setState({ playing: false, audioProgress: 0 });
					}
					this.setState({
						audioProgress:
							(audio.currentTime / audio.duration) * 100,
					});
				},
				false
			);

			audio.play();
		}
	}

	render() {
		const { classes } = this.props;
		const { audioProgress, recording, audio, playing } = this.state;

		return (
			<Grid container direction='row'>
				<ThemeProvider theme={themeRecord}>
					<Grid item>
						<IconButton
							color={recording ? 'secondary' : 'primary'}
							onClick={(e) => this.startRecord()}
						>
							{recording ? (
								<MicActiveIcon />
							) : (
								<MicInactiveIcon />
							)}
						</IconButton>
					</Grid>
				</ThemeProvider>
				<ThemeProvider theme={themePlay}>
					<Grid item>
						<IconButton
							color={playing ? 'primary' : 'secondary'}
							disabled={!audio}
							onClick={(e) => this.playAudio()}
						>
							{playing ? <PauseIcon /> : <PlayIcon />}
						</IconButton>
					</Grid>
					<Grid item className={classes.progress}>
						<div className={classes.audioProgress}>
							<LinearProgress
								value={audioProgress}
								variant='determinate'
								color='primary'
							/>
						</div>
					</Grid>
				</ThemeProvider>
			</Grid>
		);
	}
}

export default withStyles(styles)(AudioRecorder);
