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
import { GENERATE_EMAIL } from "../../utils/Client_apollo";

export default function Main() {
	const classes = useStyles();
	const [emailText, setEmailText] = useState("");

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

	return (
		<>
			<Box className={classes.root}>
				<Box className={classes.main}>
					<Box className={classes.top}>
						<Box className={classes.areaText}>
							<Typography>
								Your temporary email address
							</Typography>
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
						<Box className={classes.bottom_inbox}>
							<Box className={classes.inbox}>
								<Typography>Inbox</Typography>
							</Box>
							<Box className={classes.emails}>
								<Typography>Emails</Typography>
							</Box>
						</Box>
						<Box className={classes.readingPane}>
							<h1>teste 2</h1>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}
