import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		padding: "30px 15px 0px 15px",
	},
	main: {
		display: "flex",
		flexDirection: "column",
		height: "95vh",
		width: "98vw",
	},
	top: {
		border: "1px solid #000",
		borderTopLeftRadius: 2,
		borderTopRightRadius: 2,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		height: "25vh",
		minHeight: "94px",
	},
	areaText: {
		display: "flex",
		flexDirection: "column",
		width: "25vw",
	},
	bottom: {
		display: "flex",
	},
	bottom_inbox: {
		display: "flex",
		flexDirection: "column",
		borderLeft: "1px solid #000",
		borderRight: "1px solid #000",
		borderBottom: "1px solid #000",
		borderBottomLeftRadius: 2,
		borderBottomRightRadius: 2,
		width: "18.1vw",
	},
	inbox: {
		padding: "7px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		borderBottom: "1px solid #000",
		height: "4vh",
		width: "18vw",
	},
	emails: {
		padding: "7px",
		display: "flex",
		textAlign: "center",
		height: "71.9vh",
		width: "18vw",
	},
	readingPane: {
		padding: "7px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		borderBottom: "1px solid #000",
		width: "80vw",
		borderRight: "1px solid #000",
		background: "#f8f8f8",
	},
});

export default useStyles;
