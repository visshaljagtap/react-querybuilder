import * as React from "react";
import { SampleBase } from "./sample-base";
import  DemoQueryBuilder from './DemoQueryBuilder';
import "antd/dist/antd.css";

// import './default.css';
export class App extends SampleBase {
  render() {
    return (
     <div style={{width:"50%"}}><DemoQueryBuilder /></div>
    );
  }
}

export default App;
