import { useMutation } from "@apollo/client";
import { TextField, IconButton, Button } from "@material-ui/core";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useEffect, useState } from "react";
import { GENERATE_EMAIL } from "../../utils/Client_apollo";
import { useCheckEmailQuery } from "../../utils/Client_apollo";

export default function Email() {
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
			alert("Texto não copiado");
		}
	}

	function DisplayEmails() {
		const { data, errors, loading } = useCheckEmailQuery();
		// const { defaultWelcomeEmail, setDefaultWelcomeEmail } = useState({});

		if (loading) return <p>Loading...</p>;
		if (errors) return console.log(errors);

		if (data) {
			console.log(data);

			// const defaultWelcomeEmail = {
			// 	header: "Hello",
			// 	header2: "Welcome",
			// 	text: `Hi ${sessionStorage.getItem("@TEMP_EMAIL")},\n
			// 				 Your temp e-mail address is ready\n
			// 				 if you need help read the information below and do not hesitate to contact us.\n

			// 				 All the best,\n
			// 				 DropMail`,
			// };

			return (
				// <>
				// 	<p>Cabeçalho: {defaultWelcomeEmail.header}</p>
				// 	<p>Cabeçalho2: {defaultWelcomeEmail.header2}</p>
				// 	<p>Texto: {defaultWelcomeEmail.text}</p>
				// </>
				<>
					<div>
						{data.session.mails.map((el, i) => (
							<>
								<h1 key={i}>{el.headerSubject}</h1>
								<p key={i + 1}>{el.text}</p>
							</>
						))}
					</div>
				</>
			);
		}
	}

	return (
		<>
			<h1>Pagina do Email</h1>

			<TextField
				id="email"
				placeholder="Email"
				value={emailText}
				variant="outlined"
				size="small"
				inputProps={{
					readOnly: true,
				}}
			>
				{emailText}
			</TextField>

			<Button variant="contained" onClick={handleGenerateEmail}>
				Gerar Email
			</Button>

			<IconButton aria-label="ContentCopyIcon" onClick={handleCopyEmail}>
				<ContentCopyIcon />
			</IconButton>

			<div>
				<h1>INBOX</h1>
				<DisplayEmails />
			</div>
		</>
	);
}
