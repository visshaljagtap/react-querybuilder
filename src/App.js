import * as React from "react";
import { SampleBase } from "./sample-base";
import  DemoQueryBuilder from './DemoQueryBuilder';

// import './default.css';
export class App extends SampleBase {
  render() {
    return (
     <div><DemoQueryBuilder /></div>
    );
  }
}

export default App;
