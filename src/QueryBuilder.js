import { QueryBuilderComponent } from "@syncfusion/ej2-react-querybuilder";
import { SampleBase } from "./sample-base";
import { Browser } from "@syncfusion/ej2-base";
import React from "react";

function QueryBuilder() {
  const [elseCondition, setElseCondition] = React.useState();
  const columnData = [
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
  const importRules = {
    // condition: "and",
    // rules: [
    //   {
    //     label: "C1",
    //     field: "C1",
    //     operator: "startswith",
    //     type: "string",
    //     value: "Name",
    //   },
    //   {
    //     condition: "or",
    //     rules: [
    //       {
    //         condition: "and",
    //         rules: [
    //           {
    //             label: "C2",
    //             field: "C2",
    //             operator: "startswith",
    //             type: "string",
    //             value: "Name",
    //           },
    //           {
    //             label: "C3",
    //             field: "C3",
    //             operator: "startswith",
    //             type: "string",
    //             value: "name",
    //           },
    //         ],
    //       },
    //       {
    //         condition: "and",
    //         rules: [
    //           {
    //             label: "C4",
    //             field: "C4",
    //             operator: "startswith",
    //             type: "string",
    //             value: "Name11",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  };

  let qbObj;

  const createdControl = () => {
    console.log(
      "--"

      // this.qbObj.getSqlFromRules(args.rule)
    );
    if (Browser.isDevice) {
      qbObj.summaryView = true;
    }
  };

  const updateRule = (args) => {
    // this.txtAreaElem.value = this.qryBldrObj.getSqlFromRules(args.rule);
    console.log("--", qbObj.getSqlFromRules(args.rule));
    console.log("--",JSON.stringify(qbObj.getValidRules(qbObj.rule)));

    // const validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
    // this.dialogInstance.content = '<pre>' + JSON.stringify(validRule, null, 4) + '</pre>';
    // this.dialogInstance.show();

  };

  const addElse = () => {
    setElseCondition(true);
  };

  return (
    <>
      <div className="control-pane">
        <b>If Condition</b>
        <QueryBuilderComponent
          width="70%"
          ruleChange={updateRule}
          // dataSource={employeeData}
          columns={columnData}
          rule={importRules}
          created={createdControl}
          ref={(scope) => {
            qbObj = scope;
          }}
        ></QueryBuilderComponent>
        <div>
          <span>Select Action</span>
          <input />
          <button onClick={addElse}>Add Else Condition</button>
        </div>
      </div>
      {elseCondition && (
        <div className="control-pane">
          <b>else Condition</b>
          <QueryBuilderComponent
            width="70%"
            ruleChange={updateRule}
            // dataSource={employeeData}
            columns={columnData}
            rule={importRules}
            created={createdControl}
            ref={(scope) => {
              qbObj = scope;
            }}
          ></QueryBuilderComponent>
          <div>
            <span>Select Action</span>
            <input />
            <button onClick={addElse}>Add Else Condition</button>
          </div>
        </div>
      )}
    </>
  );
}

export default QueryBuilder;
