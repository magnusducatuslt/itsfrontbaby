import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Checkbox from "../components/checkbox";
import Blockchain from "../services";
import TextField from "@material-ui/core/TextField";
import { walletFromMnemonic } from "minterjs-wallet";

export function Page() {
  const history = useHistory();

  const [candidats, setCandidats] = useState([]);
  const COIN = process.env.REACT_APP_COIN;
  const GAS_COIN = process.env.REACT_APP_GAS;
  const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
  const TX_TYPE = process.env.REACT_APP_TX_TYPE;

  useEffect(() => {
    async function requestCandidats() {
      const fetched = await Blockchain.getCandidats();
      console.log(fetched);
      setCandidats(fetched);
    }
    requestCandidats();
  }, []);
  // /address?address=

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
      baseURL: "https://minter-node-1.testnet.minter.network/",
    });

    const SENDER_SEED = textRef.current.value;

    const id = candidat.id;

    const wallet = walletFromMnemonic(SENDER_SEED);

    minter.getNonce(wallet.getAddressString()).then((nonceForReciever) => {
      minter
        .postTx(
          {
            nonce: nonceForReciever,
            chainId: CHAIN_ID,
            type: TX_TYPE,
            data: {
              to: candidat.address,
              value: 1,
              coin: COIN,
            },
            gasCoin: GAS_COIN,
          },
          { privateKey: wallet.getPrivateKeyString() }
        )
        .then((txHash) => {
          console.log(txHash);
          axios
            .post(`${process.env.REACT_APP_CORE_HOST}/voted`, {
              address: candidat.address,
              tx: txHash.hash,
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
          // self.$toast.error("Произошла ошибка");
        });
    });
  }

  const textRef = useRef();

  return (
    <div>
      <h1> Account page</h1>

      <TextField inputRef={textRef} label="Сиид фраза" variant="outlined" />
      <Checkbox candidats={candidats} onSubmit={chooseCandidate} />
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
