import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const isUserExist = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://core.ididntknowwhatyouheardaboutme.tk/user/${id}`)
      .then((response) => {
        const { data } = response;
        resolve(data.message && data.message.wallet);
      })
      .catch(() => {
        reject();
      });
  });
};

export function Page() {
  const history = useHistory();
  const [mnemo, setMnemo] = useState("");
  const [address, setAddress] = useState("");
  const [isSave, showSaveButton] = useState(false);
  const [account_id] = useState(localStorage.getItem("account_id"));

  useEffect(() => {
    const id = localStorage.getItem("account_id");

    if (!id) {
      history.push("/login");
      return;
    }

    isUserExist(id)
      .then((exist) => {
        if (exist) {
          alert("у вас уже существует кошелек перейдите в свой аккаунт");
        } else {
          const mnemo = window.minterWallet.generateMnemonic();
          setMnemo(mnemo);
          const wallet = window.minterWallet.walletFromMnemonic(mnemo);
          const address = wallet.getAddressString();
          setAddress(address);
          showSaveButton(true);
        }
      })
      .catch((e) => {
        history.push("/login");
      });
  }, []);

  const saveWallet = (id, address) => {
    if (!address) {
      alert("создайте адресс");
    } else {
      return new Promise((resolve, reject) => {
        axios
          .post(`https://core.ididntknowwhatyouheardaboutme.tk/registration`, {
            id,
            address,
          })
          .then((response) => {
            const {
              data: { status, message },
            } = response;
            console.log(response);
            if (status === 0 || message === "ADDRESS_REGISTRATED") {
              alert("Ваш кошелек сохранен!");
              showSaveButton(false);
              resolve();
            } else {
              showSaveButton(false);
              alert("У вас уже есть кошелек! Голосуйте с него!");
            }
          })
          .catch(() => {
            reject();
          });
      });
    }
  };
  const redirectToAccount = () => {
    history.push("/account");
  };

  return (
    <div>
      <h1>Создание кошелька</h1>
      <p>
        Сохраните кодовую фарзу! Убедитесь что она у вас сохранена где то! она
        вам понадобиться для голосвания! В случае потери кодовой фразу создать
        еще один кошелек и проголосвать с него у вас уже не получиться!
      </p>
      <div>Ваша кодовая фраза {mnemo}</div>
      <div>Ваш адресс {address}</div>
      {isSave ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveWallet(account_id, address)}
        >
          сохранить кошелек
        </Button>
      ) : (
        ""
      )}
      <button onClick={redirectToAccount}>account</button>
    </div>
  );
}
