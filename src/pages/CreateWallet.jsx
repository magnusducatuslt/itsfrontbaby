import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

  useEffect(() => {
    const id = localStorage.getItem("account_id");

    if (!id) {
      history.push("/login");
      return;
    }

    isUserExist(id)
      .then((exist) => {
        if (exist) {
          alert("wallet exist");
        }
      })
      .catch((e) => {
        history.push("/login");
      });
  }, []);

  const redirectToAccount = () => {
    history.push("/account");
  };

  return (
    <div>
      create wallet<button onClick={redirectToAccount}>account</button>
    </div>
  );
}
