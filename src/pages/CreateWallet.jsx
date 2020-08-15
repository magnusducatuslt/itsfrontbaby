import React, { useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

export function Page() {
 const history = useHistory();

  useEffect(() => {
  	const id = '141452391'// localStorage.getItem('account_id')

      if (!id) {
        history.push('/login')
      } else {
        axios.get(`https://core.ididntknowwhatyouheardaboutme.tk/user/${id}`)
        .then((response) => {
          const { data } = response
          if (data.message && data.message.wallet) {
            alert('wallet exist')
          }
          console.log(response.data)
        }).catch(() => {
          history.push('/login')
        })
      } 
  }, [])

  const redirectToAccount = () => {
  	history.push('/account')
  }

  return <div>create wallet<button onClick={redirectToAccount}>account</button></div>;
}
