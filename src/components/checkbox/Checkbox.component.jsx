import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'


export default function CheckboxLabels({ candidats, onSubmit }) {
  const [id, setId] = React.useState();

  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={id} onChange={handleChange}>
          {candidats.map((c) => {
            return (
              <FormControlLabel value={c.id} control={<Radio />} label={c.name} />
             )
          })}
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        disabled={!id}
        onClick={(e) => {
          const canditate = candidats.find(x => x.id === id)
          console.log(' canditate ', canditate)
        }}
      >
        Проголосовать
      </Button>
    </div>
  );
}
