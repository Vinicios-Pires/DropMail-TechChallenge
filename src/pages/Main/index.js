import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
	Box,
	Divider,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
} from "@material-ui/core";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import useStyles from "../../styles/styles";
import { GENERATE_EMAIL, useCheckEmailQuery } from "../../utils/Client_apollo";

export default function Main() {
	const classes = useStyles();
	const [emailText, setEmailText] = useState("");
	// const { data, errors, loading } = useCheckEmailQuery();

	// if (errors) return console.log(errors);

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
		const { data, errors, loading } = useCheckEmailQuery();

		if (errors) return console.log(errors);

		if (loading) {
			return <p>Carregando email's</p>;
		}

		if (data) {
			return (
				<>
					{data.session.mails.length === 0 ? (
						<Box
							className={classes.styled_boxEmail}
							style={{
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Typography>Nenhum email recebido</Typography>
						</Box>
					) : (
						<>
							{data.session.mails.map((el, i) => (
								<Box
									key={i + 3}
									className={classes.styled_boxEmail}
									onClick={() => console.log(el)}
								>
									<Typography
										key={i}
										style={{ fontWeight: "bold" }}
									>
										{el.headerSubject}
									</Typography>
									<Typography key={i + 1}>
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
												<Typography>Copy</Typography>
											</IconButton>
										</InputAdornment>
									),
								}}
							>
								{emailText}
							</TextField>
						) : (
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
							<Typography>Botao de Notificacao</Typography>
						</Box>
						<Box className={classes.readingPane_box}>
							<Typography style={{ marginLeft: "8px" }}>
								Cabeçalho
							</Typography>
							<Box className={classes.readingPane}>
								<Typography>Texto do Email</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
