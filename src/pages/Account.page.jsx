import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { Form } from "../components/form";
import axios from 'axios'
import { useHistory } from "react-router-dom";

export function Page() {
  const history = useHistory();

  const [seed, setSeed] = useState("");
  function createPassport() {
    window.Telegram.Passport.auth(creeds, function (show) {
      console.log("passport auth", show);

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
    });
  }
  function submitSeed(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("submited");
  }
  function inputedSeed(e) {
    e.preventDefault();
    setSeed(e.target.value);
  }
  useEffect(() => {
    //check accountId
    //if exist ok
    //else return to login page
  }, []);

  // to Wallet if acc has wallet
  // registrate passport
  const formParams = {
    label: "Сиид фраза",
    text: "войти",
    onSubmit: submitSeed,
    onChange: inputedSeed,
    defaultValue: seed,
    classNameForm: "something new",
  };
  return (
    <div>
      Account page
      <Form {...formParams} />
      <br />
      <Button variant="contained" color="primary" onClick={createPassport}>
        создать кошелек
      </Button>
    </div>
  );
}

const creeds = {
  bot_id: process.env.REACT_APP_BOT_ID, // place id of your bot here
  scope: {
    data: [{ type: "id_document", selfie: true }, { type: "personal_details" }],
    v: 1,
  },
  public_key: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwWy51e0FR98/z1ORRH0T
Pi2RXEhYeT/+5Qit8buUsbp494jLouWNrnpblXAa73V+dKrmN+NUYf3WuAgjiE3+
n+k0twqngVDhVZq8p2laKJMCezulFc/DE69JUxSOU5sP7a/5JkK64Hw3Mp4UnlgV
2UmJ4+ohZk+EsaNlfmkQVolByZ5pTJE8lXUh6HV1w4ujuWarOXBn0Z4/GnrCz0mJ
JJm2fhDnVZY7dhCs/SaNNlbuSN3EjIdgyOUs4l1Cj8OpQgJsVyoVMsragONp/HTR
MYoD/xNYjUYNcfH0sp7NQr5phlvbubjbhKoGetFdmiQfXZabnrRVeCKZWyqekHs8
YwIDAQAB
-----END PUBLIC KEY-----`,
  nonce: "1", // place nonce here
  callback_url: process.env.REACT_APP_PASSPORT_CALLBACK, // place callback url here
};
