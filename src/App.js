import * as React from "react";
import { SampleBase } from "./sample-base";
import  CreateRule from '../src/components/CreateRule';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// pick a date util library
import DateFnsUtils from '@date-io/date-fns';

export class App extends SampleBase {
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CreateRule /></MuiPickersUtilsProvider >
    );
  }
}

export default App;
