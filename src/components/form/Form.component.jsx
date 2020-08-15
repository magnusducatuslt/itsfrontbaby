import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export function Form({ label, text, onSubmit, onChange, classNameForm }) {
  return (
    <form
      className={classNameForm}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField label={label} variant="outlined" onChange={onChange} />
      <Button variant="contained" color="primary" type="submit">
        {text}
      </Button>
    </form>
  );
}
