import { useMutation } from "@apollo/client";
import { TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { GENERATE_EMAIL } from "../../utils/Client_apollo";

export default function Email(){
  const [emailText, setEmailText] = useState('');

  const [handleGenerateEmail] = useMutation(GENERATE_EMAIL, {
    onCompleted: (el) => {
      sessionStorage.setItem('@SESSION_ID', el.introduceSession.id)
      sessionStorage.setItem('@TEMP_EMAIL', el.introduceSession.addresses[0].address)
      setEmailText(sessionStorage.getItem('@TEMP_EMAIL'))

      console.log(emailText)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  useEffect(() => {
    if (sessionStorage.getItem('@TEMP_EMAIL')){
      setEmailText(sessionStorage.getItem('@TEMP_EMAIL'))
    }
  }, [ ])

  return (
    <>
      <h1>Pagina do Email</h1>
      <form>
        <TextField
		    	id="email"
		    	placeholder="Email"
          value={emailText}
		    	variant="outlined"
          size="small"
		    	inputProps={{
		    		readOnly: true,
		    	}}
          onClick={handleGenerateEmail}
		    >
          {emailText}
        </TextField>
        {/* <button>Geral Email</button> */}
      </form>
    </>
  )
}