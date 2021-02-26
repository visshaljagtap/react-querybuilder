import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Platforms() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Available Platforms</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={gilad}
                onChange={handleChange}
                name="gilad"
              />
            }
            label="Cisco Devices"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={jason}
                onChange={handleChange}
                name="jason"
              />
            }
            label="Cisco IOS Devies"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Cisco IOS-XR Devies"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Cisco IOS-XE Devies"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="Cisco Wireless Devies"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}
