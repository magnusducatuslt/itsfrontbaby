import React from "react";
import Blockchain from "../services";
export function Page() {
  const wallet = Blockchain.getWallet(
    "surround tape away million into program organ tonight write prefer inform cool"
  );
  const address = Blockchain.getAddress(wallet);
  const privKey = Blockchain.getPrivateKey(wallet);

  return (
    <div>
      <h1>Voting page</h1>
      <h2>Address {address}</h2>
      <h3>Coin</h3>
      <h4>Gas</h4>
    </div>
  );
}
