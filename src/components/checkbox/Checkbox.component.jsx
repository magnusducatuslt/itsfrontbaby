import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

export default function CheckboxLabels({ candidats, onSubmit, hasSeed }) {
  const [id, setId] = React.useState();

  const classes = useStyles();

  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>

      <Button
        variant="contained"
        color="primary"
        disabled={!id || !hasSeed}
        onClick={(e) => {
          const canditate = candidats.find(x => x.id === id)
          onSubmit(canditate)
        }}
      >
        Проголосовать
      </Button>
    <div>

      <FormControl component="fieldset">
        <RadioGroup  aria-label="gender" name="gender1" value={id} onChange={handleChange}>
          {candidats.map((c) => {
            const label = <div className={classes.root}>
              <Avatar alt="Remy Sharp" src={c.img} /> 
              <span style={{ wordBreak: 'break-word' }}>{c.name} ({c.address})</span>
            </div>
            return (
              <FormControlLabel value={c.id} control={<Radio disabled={!hasSeed} />} 
              label={label} />
             )
          })}
        </RadioGroup>
      </FormControl>
    </div>
    </div>
  );
}
