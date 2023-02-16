import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		padding: "30px 10px 10px 10px",
	},
	main: {
		border: "1px solid #dddddd",
		// border: "1px solid black",
		display: "flex",
		height: "95vh",
		borderRadius: 2,
	},
	top: {
		borderBottom: "1px solid #dddddd",
		// border: "1px solid black",
		gap: "3px",
		width: "100vw",
		height: "25vh",
		display: "flex",
		flexDirection: "column",
	},
	textArea: {
		width: "25%",
	},
});

export default useStyles;
