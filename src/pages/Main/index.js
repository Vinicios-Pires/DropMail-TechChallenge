import { Grid, TextField } from "@material-ui/core";

import useStyles from "../../styles/styles";

export default function Main() {
	const classes = useStyles();
	return (
		<>
			<div className={classes.root}>
				<div className={classes.main}>
					<Grid className={classes.top}>
						<div>
							<h1>Your temporary email address</h1>
							<TextField
								type="text"
								defaultValue="Email"
								variant="outlined"
								inputProps={{
									readOnly: true,
								}}
								size="small"
								className={classes.textArea}
							/>
						</div>
					</Grid>
				</div>
			</div>
		</>
	);
}
