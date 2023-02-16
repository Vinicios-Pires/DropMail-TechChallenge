import { Grid } from "@material-ui/core";

import useStyles from "../../styles/styles";

export default function Main() {
	const classes = useStyles();
	return (
		<>
			<Grid className={classes.root}>
				<Grid className={classes.main}>
					<Grid className={classes.top}>
						<h1>Your temporary email address</h1>
					</Grid>
					<Grid className={classes.top}>
						<h1>Inbox</h1>
					</Grid>
					<Grid className={classes.top}>
						<h1>Texto do Email</h1>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}
