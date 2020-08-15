import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Button from "@material-ui/core/Button";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

export default function CheckboxLabels({ candidats, onSubmit }) {
  const signedCandidats = candidats.reduce((prev, cand) => {
    prev[cand.name] = true;

    return prev;
  }, {});

  const [state, setState] = React.useState(signedCandidats);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const checkboxs = candidats.map((cand) => (
    <FormControlLabel
      control={
        <Checkbox
          key={`${Date.now}${cand.id}`}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          onChange={handleChange}
          value={cand.id}
          name={cand.id}
        />
      }
      label={cand.name}
    />
  ));

  return (
    <div>
      <FormGroup row>{checkboxs}</FormGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(state);
          //onSubmit(state);
        }}
      >
        Проголосовать
      </Button>
    </div>
  );
}
