import * as React from "react";
import { QueryBuilderComponent } from "@syncfusion/ej2-react-querybuilder";
import { employeeData } from "./data-source";
import { SampleBase } from "./sample-base";
import { Browser } from "@syncfusion/ej2-base";
import QueryBuilder from './QueryBuilder';

// import './default.css';
export class App extends SampleBase {

  render() {
    return (
     <QueryBuilder />
    );
  }
}

export default App;
