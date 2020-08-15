import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export function Page() {
  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      В целях регистрации в сервисе <b>“Честный голос”</b>, принимаю решение о
      предоставлении моих персональных данных сервису <b>”Честный голос”</b> и
      даю согласие на сбор, обработку и хранение следующих персональных данных:
      <ol className="pl-3">
        <li>Дата рождения</li>
        <li>Личный номер</li>
        <li>Фотография паспорта</li>
        <li>Селфи с паспортом</li>
      </ol>
      <Button variant="contained" color="primary" onClick={redirectToLogin}>
        Согласен
      </Button>
    </div>
  );
}
