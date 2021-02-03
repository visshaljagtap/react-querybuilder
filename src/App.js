import * as React from "react";
import { QueryBuilderComponent } from "@syncfusion/ej2-react-querybuilder";
import { employeeData } from "./data-source";
import { SampleBase } from "./sample-base";
import { Browser } from "@syncfusion/ej2-base";
// import './default.css';
export class App extends SampleBase {
  constructor() {
    super(...arguments);
    this.columnData = [
      // {
      //   field: "C1",
      //   label: "C1",
      //   type: "number",
      //   operators: [
      //     { key: "Equal", value: "equal" },
      //     { key: "Greater than", value: "greaterthan" },
      //     { key: "Less than", value: "lessthan" },
      //   ],
      // },
      { field: "C1", label: "C1", type: "string" },

      { field: "C2", label: "C2", type: "string" },
      { field: "C3", label: "C3", type: "string" },

      { field: "C4", label: "C4", type: "string" },
      {
        field: "C5",
        label: "C5",
        type: "date",
        format: "dd/MM/yyyy",
      },
      { field: "C6", label: "C6", type: "string" },
      { field: "C7", label: "C7", type: "string" },
      { field: "C8", label: "C8", type: "string" },
    ];
    this.importRules =  {
      "condition": "and",
      "rules": [
          {
              "label": "C1",
              "field": "C1",
              "operator": "startswith",
              "type": "string",
              "value": "Name"
          },
          {
              "condition": "or",
              "rules": [
                  {
                      "condition": "and",
                      "rules": [
                          {
                              "label": "C2",
                              "field": "C2",
                              "operator": "startswith",
                              "type": "string",
                              "value": "Name"
                          },
                          {
                              "label": "C3",
                              "field": "C3",
                              "operator": "startswith",
                              "type": "string",
                              "value": "name"
                          }
                      ]
                  },
                  {
                      "condition": "and",
                      "rules": [
                          {
                              "label": "C4",
                              "field": "C4",
                              "operator": "startswith",
                              "type": "string",
                              "value": "Name11"
                          }
                      ]
                  }
              ]
          }
      ]
  }
  }
  createdControl() {
    console.log(
      "--",
      JSON.stringify(this.qbObj.getValidRules(this.qbObj.rule), null, 4)
    );
    if (Browser.isDevice) {
      this.qbObj.summaryView = true;
    }
  }

  updateRule(args) {
    // this.txtAreaElem.value = this.qryBldrObj.getSqlFromRules(args.rule);
    console.log("--", JSON.stringify(args.rule, null, 4));
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="row">
            <div className="col-lg-12 control-section">
              <QueryBuilderComponent
                width="70%"
                ruleChange={this.updateRule.bind(this)}
                // dataSource={employeeData}
                columns={this.columnData}
                rule={this.importRules}
                created={this.createdControl.bind(this)}
                ref={(scope) => {
                  this.qbObj = scope;
                }}
              ></QueryBuilderComponent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
