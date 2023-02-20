import { makeStyles } from "@material-ui/core/styles";

const borderStyled = "1px solid #dddddd";

const useStyles = makeStyles({
	root: {
		boxSizing: "border-box",
	},
	main: {
		display: "flex",
		flexDirection: "column",
		height: "100vh",
		width: "100vw",
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
		minHeight: "190px",
	},
	areaText: {
		display: "flex",
		flexDirection: "column",
		width: "50vw",
	},
	bottom: {
		display: "flex",
		width: "100%",
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
		minWidth: "110px",
	},
	inbox: {
		padding: "7px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		borderBottom: `${borderStyled}`,
		height: "4vh",
		minHeight: "34px",
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
		width: "100vw",
		borderRight: `${borderStyled}`,
		background: "#f8f8f8",
	},
	notificationButtonPanel: {
		padding: "7px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		justifyContent: "space-between",
		borderBottom: `${borderStyled}`,
		height: "4vh",
		minHeight: "34px",
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
		padding: "7px",
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
		justifyContent: "center",
		borderBottom: `${borderStyled}`,
		height: "6vh",
		minHeight: "130px",
		width: "100%",
		"&:hover": {
			backgroundColor: "#f8f8f8",
		},
	},
});

export default useStyles;
