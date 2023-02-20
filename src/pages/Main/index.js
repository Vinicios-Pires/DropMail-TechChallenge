import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
	Box,
	Button,
	CircularProgress,
	Divider,
	IconButton,
	InputAdornment,
	TextareaAutosize,
	TextField,
	Typography,
} from "@material-ui/core";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";

import useStyles from "../../styles/styles";
import { GENERATE_EMAIL, useCheckEmailQuery } from "../../utils/Client_apollo";

export default function Main() {
	const classes = useStyles();
	const [emailText, setEmailText] = useState("");
	const [headerEmail, setHeaderEmail] = useState("");
	const [textEmail, setTextEmail] = useState("");
	const [welcomeHeader, setWelcomeHeader] = useState("");
	const [welcomeText, setWelcomeText] = useState("");
	const [count, setCount] = useState(15);

	function permission() {
		if (window.Notification.permission !== "granted") {
			window.Notification.requestPermission((permission) => {
				if (permission === "granted") {
					alert("Notificações habilitadas.");
				}
			});
		}
	}

	const [handleGenerateEmail] = useMutation(GENERATE_EMAIL, {
		onCompleted: (el) => {
			sessionStorage.setItem("@SESSION_ID", el.introduceSession.id);
			sessionStorage.setItem(
				"@TEMP_EMAIL",
				el.introduceSession.addresses[0].address
			);
			setEmailText(sessionStorage.getItem("@TEMP_EMAIL"));
		},
		onError: (err) => {
			console.log(err);
		},
	});

	useEffect(() => {
		if (sessionStorage.getItem("@TEMP_EMAIL")) {
			setEmailText(sessionStorage.getItem("@TEMP_EMAIL"));
		}
	}, []);

	function handleCopyEmail() {
		if (emailText.includes("@")) {
			navigator.clipboard.writeText(emailText);
			alert("Texto copiado!");
		} else {
			alert("Não há texto para copiar.");
		}
	}

	function DisplayEmails() {
		const { data, errors } = useCheckEmailQuery();

		if (errors) return console.log(errors);

		const defaultWelcomeEmail = {
			from: "Hello",
			header: "Welcome",
			text: `Hi user,
Your temp e-mail address is ready
If you need help read the information below and do not hesitate to contact us.
All the best,
DropMail`,
		};

		if (data) {
			setTimeout(() => {
				if (count > 1) {
					setCount(count - 1);
				}
			}, 1000);

			if (count === 1) {
				window.location.reload(false);
			}

			return (
				<>
					{data.session.mails.length === 0 ? (
						<Box
							className={classes.styled_boxEmail}
							style={{
								justifyContent: "center",
								minHeight: "150px",
								cursor: "pointer",
							}}
							onClick={() => {
								setWelcomeText(defaultWelcomeEmail.text);
								setWelcomeHeader(defaultWelcomeEmail.header);
							}}
						>
							<Typography style={{ fontWeight: "bold" }}>
								{defaultWelcomeEmail.from}
							</Typography>
							<Typography
								style={{ fontWeight: "bold", color: "#0078da" }}
							>
								{defaultWelcomeEmail.header}
							</Typography>
							<Typography style={{ color: "#8f949f" }}>
								{defaultWelcomeEmail.text.length <= 20
									? defaultWelcomeEmail.text
									: defaultWelcomeEmail.text.substring(
											0,
											25
									  ) + "..."}
							</Typography>
						</Box>
					) : (
						<>
							{data.session.mails.map((el, i) => (
								<Box
									key={i}
									className={classes.styled_boxEmail}
									onClick={() => {
										setHeaderEmail(el.headerSubject);
										setTextEmail(el.text);
									}}
									style={{ cursor: "pointer" }}
								>
									<Typography
										key={i + 4}
										style={{
											fontWeight: "bold",
										}}
									>
										{el.fromAddr.length <= 14
											? el.fromAddr
											: el.fromAddr.substr(0, 14) + "..."}
									</Typography>
									<Typography
										key={i + 2}
										style={{
											fontWeight: "bold",
											color: "#0078da",
										}}
									>
										{el.headerSubject.length <= 20
											? el.headerSubject
											: el.headerSubject.substr(0, 20) +
											  "..."}
									</Typography>
									<Typography key={i + 3}>
										{el.text.length <= 20
											? el.text
											: el.text.substr(0, 20) + "..."}
									</Typography>
								</Box>
							))}
						</>
					)}
				</>
			);
		}
	}

	return (
		<Box className={classes.root}>
			<Box className={classes.main}>
				<Box className={classes.top}>
					<Box className={classes.areaText}>
						<Typography>Your temporary email address</Typography>
						{emailText.includes("@") ? (
							<>
								<TextField
									id="email"
									placeholder="Email"
									value={emailText}
									variant="outlined"
									size="small"
									inputProps={{
										readOnly: true,
									}}
									fullWidth
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Divider orientation="vertical" />
												<IconButton
													aria-label="ContentCopyIcon"
													onClick={handleCopyEmail}
												>
													<ContentCopyIcon />
													<Typography>
														Copy
													</Typography>
												</IconButton>
											</InputAdornment>
										),
									}}
								>
									{emailText}
								</TextField>
								<Box
									style={{
										display: "flex",
										justifyContent: "center",
										marginTop: "10px",
									}}
								>
									<Box
										style={{
											display: "inline-flex",
											textAlign: "center",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Typography
											style={{ marginRight: "7px" }}
										>
											Autorefresh in
										</Typography>
										<Box
											style={{
												position: "relative",
												display: "inline-flex",
											}}
										>
											<CircularProgress
												variant="determinate"
												value={(count * 100) / 15}
												style={{ width: "35px" }}
											/>
											<Box
												style={{
													top: 0,
													left: 0,
													bottom: 0,
													right: 6,
													position: "absolute",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<Typography
													variant="caption"
													style={{
														fontSize: "14px",
														textAlign: "center",
													}}
												>
													{count}
												</Typography>
											</Box>
										</Box>
									</Box>
									<Box
										style={{
											display: "flex",
											gap: "2px",
											marginLeft: "8px",
											alignItems: "center",
											textAlign: "center",
										}}
									>
										<RefreshIcon
											style={{ cursor: "pointer" }}
											onClick={() =>
												window.location.reload(false)
											}
										/>
										<Typography>Refresh</Typography>
									</Box>
								</Box>
							</>
						) : (
							<>
								<TextField
									id="email"
									placeholder="Click to Generate a Temp Email"
									value={emailText}
									variant="outlined"
									size="small"
									inputProps={{
										readOnly: true,
									}}
									onClick={handleGenerateEmail}
								></TextField>
							</>
						)}
					</Box>
				</Box>
				<Box className={classes.bottom}>
					<Box className={classes.inbox_panel}>
						<Box className={classes.inbox}>
							<Typography>Inbox</Typography>
						</Box>
						<Box className={classes.emails}>
							<DisplayEmails />
						</Box>
					</Box>
					<Box className={classes.readingPane_panel}>
						<Box className={classes.notificationButtonPanel}>
							<Button
								style={{
									backgroundColor: "#727272",
									color: "#FFF",
									marginRight: "10px",
									height: "3vh",
								}}
								variant="contained"
								onClick={permission}
							>
								<Typography style={{ fontSize: "11px" }}>
									receber notificações
								</Typography>
							</Button>
							<Button
								style={{
									backgroundColor: "#727272",
									color: "#FFF",
									marginRight: "10px",
									height: "3vh",
								}}
								variant="contained"
								onClick={handleGenerateEmail}
							>
								<Typography style={{ fontSize: "11px" }}>
									generate email
								</Typography>
							</Button>
						</Box>
						<Box className={classes.readingPane_box}>
							<Typography
								style={{
									marginLeft: "8px",
									fontWeight: "bold",
								}}
							>
								{headerEmail === ""
									? welcomeHeader
									: headerEmail}
							</Typography>
							<Box className={classes.readingPane}>
								<TextareaAutosize
									value={
										textEmail === ""
											? welcomeText
											: textEmail
									}
									style={{
										width: "100%",
										height: "100%",
										resize: "none",
										fontSize: "18px",
										outline: "none",
									}}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
