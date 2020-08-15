import { walletFromMnemonic, generateWallet } from "minterjs-wallet";

export function createWallet() {
  return generateWallet();
}
export function getWallet(mnemonic) {
  return walletFromMnemonic(mnemonic);
}
export function getAddress(wallet) {
  return wallet.getAddressString();
}

export function getPrivateKey(wallet) {
  return wallet.getPrivateKeyString();
}
