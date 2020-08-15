import React, { useEffect, useState } from "react";
import Checkbox from "../components/checkbox";
import Blockchain from "../services";
export function Page() {
  const wallet = Blockchain.getWallet(
    "surround tape away million into program organ tonight write prefer inform cool"
  );

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

  function chooseCandidate(state) {
    let choosedCandidate = null;
  }
  console.log(candidats);
  return (
    <div>
      <h1>Voting page</h1>
      <h2>Address {address}</h2>
      <h3>Coin</h3>
      <h4>Gas</h4>
      <Checkbox candidats={candidats} />
    </div>
  );
}
