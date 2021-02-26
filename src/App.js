import * as React from "react";
import { SampleBase } from "./sample-base";
import  CreateRule from '../src/components/CreateRule';

// import './default.css';
export class App extends SampleBase {
  render() {
    return (
     <div><CreateRule /></div>
    );
  }
}

export default App;
