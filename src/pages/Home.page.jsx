import React from "react";
import Button from "@material-ui/core/Button";

export function Page() {
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
      <Button variant="contained" color="primary">
        Подтвердить личность
      </Button>
    </div>
  );
}
