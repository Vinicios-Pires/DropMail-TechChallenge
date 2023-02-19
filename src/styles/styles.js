import { makeStyles } from "@material-ui/core/styles";

const borderStyled = "1px solid #dddddd";

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
		border: `${borderStyled}`,
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
	inbox_panel: {
		display: "flex",
		flexDirection: "column",
		borderLeft: `${borderStyled}`,
		borderRight: `${borderStyled}`,
		borderBottom: `${borderStyled}`,
		borderBottomLeftRadius: 2,
		borderBottomRightRadius: 2,
		width: "18.1vw",
	},
	inbox: {
		padding: "7px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		borderBottom: `${borderStyled}`,
		height: "4vh",
		width: "100%",
	},
	emails: {
		display: "flex",
		flexDirection: "column",
		height: "71.9vh",
		width: "100%",
	},
	readingPane_panel: {
		display: "flex",
		flexDirection: "column",
		borderBottom: `${borderStyled}`,
		width: "80vw",
		borderRight: `${borderStyled}`,
		background: "#f8f8f8",
	},
	notificationButtonPanel: {
		padding: "7px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		borderBottom: `${borderStyled}`,
		height: "4vh",
		width: "100%",
	},
	readingPane_box: {
		padding: "7px",
		gap: "5px",
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	readingPane: {
		padding: "3px",
		display: "flex",
		width: "100%",
		height: "68vh",
		border: `${borderStyled}`,
		borderRadius: 2,
		background: "#fff",
	},
	styled_boxEmail: {
		padding: "3.7px",
		display: "flex",
		flexDirection: "column",
		borderBottom: `${borderStyled}`,
		height: "6vh",
		minHeight: "62px",
		width: "100%",
	},
});

export default useStyles;
