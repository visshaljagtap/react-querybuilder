import * as React from "react";
import { QueryBuilderComponent } from "@syncfusion/ej2-react-querybuilder";
import { employeeData } from "./data-source";
import { SampleBase } from "./sample-base";
import { Browser } from "@syncfusion/ej2-base";
import  DemoQueryBuilder from './DemoQueryBuilder';
import "antd/dist/antd.css";

// import './default.css';
export class App extends SampleBase {

  render() {
    return (
     <div style={{width: "50%"}}><DemoQueryBuilder /></div>
    );
  }
}

export default App;
