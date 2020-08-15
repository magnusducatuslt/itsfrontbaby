import React, { useEffect, useState, useRef } from "react";
import Checkbox from "../components/checkbox";
import Blockchain from "../services";
import TextField from "@material-ui/core/TextField";
import { walletFromMnemonic } from "minterjs-wallet";
import axios from "axios";

export function Page() {
  const wallet = Blockchain.getWallet(
    "surround tape away million into program organ tonight write prefer inform cool"
  );

  const [seed, setSeed] = useState();

  const [candidats, setCandidats] = useState([]);
  const address = Blockchain.getAddress(wallet);
  const privKey = Blockchain.getPrivateKey(wallet);

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
          // self.$toast.success("Голос учтен");
          axios.post(`${process.env.REACT_APP_CORE_HOST}/voted`, {
            address: candidat.address,
            tx: txHash.hash,
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
      <h1>Voting page</h1>
      <TextField inputRef={textRef} label="Сиид фраза" variant="outlined" />
      <Checkbox candidats={candidats} onSubmit={chooseCandidate} />
    </div>
  );
}
