import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
import { useHistory } from "react-router-dom";

import Checkbox from "../components/checkbox";
import Blockchain from "../services";
import TextField from "@material-ui/core/TextField";
import { walletFromMnemonic } from "minterjs-wallet";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Page() {
  const history = useHistory();

  const [candidats, setCandidats] = useState([]);

  const [fromAddress, setFromAddress] = useState("");

  const {
    REACT_APP_TX_TYPE,
    REACT_APP_CHAIN_ID,
    REACT_APP_GAS,
    REACT_APP_COIN,
    REACT_APP_NODE_URL,
    REACT_APP_CORE_HOST,
  } = process.env;
  console.log(
    REACT_APP_TX_TYPE,
    REACT_APP_CHAIN_ID,
    REACT_APP_GAS,
    REACT_APP_COIN,
    REACT_APP_NODE_URL,
    REACT_APP_CORE_HOST
  );
  useEffect(() => {
    async function requestCandidats() {
      const fetched = await Blockchain.getCandidats();
      console.log(fetched);
      setCandidats(fetched);
    }
    requestCandidats();
  }, []);
  // https://minter-node-1.testnet.minter.network/address?address=

  function createPassport() {
    window.Telegram.Passport.auth(creeds, function (show) {
      console.log("passport auth", show);
    });
  }

  function chooseCandidate(candidat) {
    // let choosedCandidate = null;
    console.log(" selectedCanditate ", candidat);
    console.log(textRef.current.value);

    const minter = new window.minterSDK.Minter({
      apiType: "node",
      baseURL: REACT_APP_NODE_URL,
    });

    const SENDER_SEED = textRef.current.value;

    const id = candidat.id;

    console.log(" process.env ", process.env);
    try {
      const wallet = walletFromMnemonic(SENDER_SEED);
      setFromAddress(wallet.getAddressString());
      minter.getNonce(wallet.getAddressString()).then((nonceForReciever) => {
        minter
          .postTx(
            {
              nonce: nonceForReciever,
              chainId: REACT_APP_CHAIN_ID,
              type: REACT_APP_TX_TYPE,
              data: {
                to: candidat.address,
                value: 1,
                coin: REACT_APP_COIN,
              },
              gasCoin: REACT_APP_GAS,
            },
            { privateKey: wallet.getPrivateKeyString() }
          )
          .then((txHash) => {
            setSuccessMsg("Ваш голос учтен!");
            console.log(txHash);
            // self.$toast.success("Голос учтен");
            axios
              .post(`${REACT_APP_CORE_HOST}/voted`, {
                address: candidat.address,
                tx: txHash.hash,
              })
              .catch((e) => {
                console.log("deep 3", 3);
                setError("Не удалось сохранить, но голос учтен");
              });
          })
          .catch((e) => {
            console.log("deep 2", e);
            setError("Недостаточно средств/либоо нет доступа к ноде");
            // self.$toast.error("Произошла ошибка");
          });
      });
    } catch (e) {
      console.log("deep 1", e);
      setError("Некоректная кодовая фраза");
    }
  }

  const textRef = useRef();

  const [hasSeed, setHasSeed] = useState(false);

  const changeSeed = (e) => {
    const seed = e.target.value;

    setHasSeed(!!e.target.value);

    try {
      const wallet = walletFromMnemonic(seed);
      setFromAddress(wallet.getAddressString());
    } catch (e) {
      setFromAddress("");
    }
  };

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleClose = () => {
    setError("");
    setSuccessMsg("");
  };

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMsg}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {successMsg}
        </Alert>
      </Snackbar>
      <h1> Account page</h1>
      {fromAddress && <h4>from:{fromAddress}</h4>}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            inputRef={textRef}
            label="Сиид фраза"
            variant="outlined"
            onChange={changeSeed}
            style={{ width: "100%", paddingBottom: "20px" }}
          />
        </Grid>
      </Grid>
      <Checkbox
        hasSeed={hasSeed}
        candidats={candidats}
        onSubmit={chooseCandidate}
      />
      <br />
      <p>
        Для создание кошелька вы должны быть: 1) старше 09.08.2002 2)
        гражданином РБ
      </p>
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
