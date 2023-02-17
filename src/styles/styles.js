import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		padding: "30px 10px 10px 10px",
	},
	main: {
		// border: "1px solid #dddddd",
		border: "1px solid #000",
		display: "flex",
		justifyContent: "center",
		height: "95vh",
		borderRadius: 2,
	},
	top: {
		display: "flex",
		// flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		height: "25vh",
		width: "100vw",
		borderBottom: "1px solid #000",
	},
	areaText: {
		display: "flex",
		flexDirection: "column",
		width: "25vw",
	},
});

export default useStyles;
