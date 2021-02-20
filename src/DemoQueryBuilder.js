import React, { Component } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils,
} from "react-awesome-query-builder";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

// For Material-UI widgets only:
import MaterialConfig from "react-awesome-query-builder/lib/config/material";
// Choose your skin (ant/material/vanilla):

import "react-awesome-query-builder/lib/css/styles.css";
import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles

const InitialConfig = MaterialConfig; // or MaterialConfig or BasicConfig

// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  // settings: {
  //   showNot: false
  // },
  Settings: {
    showNot: true,
  },
  fields: {
    $c1: {
      label: "show command", //only for menu's toggler
      type: "text",
      excludeOperators: ["proximity"],
      operators: [
        "equal",
        "like",
        "not_like",
        "starts_with",
        "ends_with",
        "regex",
      ],
      defaultOperator: "like",
    },
    $c2: {
      label: "Show cdp neighbours", //only for menu's toggler
      type: "text",
      defaultOperator: "like",
      operators: ["equal", "like", "not_like", "starts_with", "ends_with"],
      excludeOperators: ["proximity"],
    },
    $c3: {
      label: "c3", //only for menu's toggler
      type: "text",
      excludeOperators: ["proximity"],
    },
    $c4: {
      label: "c4", //only for menu's toggler
      type: "text",
    },
    c5: {
      label2: "c5", //only for menu's toggler
      type: "text",
    },
    c6: {
      label2: "c6", //only for menu's toggler
      type: "text",
    },
  },
};

const queryValue = { id: QbUtils.uuid(), type: "group" };

const uniqueId = uuidv4();
const uniqueId1 = uuidv4();
const uniqueId2 = uuidv4();

export default class DemoQueryBuilder extends Component {
  state = {
    config: config,
    finalOutput: null,
    conditionBlocks: [
      {
        id: uniqueId,
        ifStatement: {
          id: uniqueId1,
          condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          actionType: "String",
          actionMessage: "String",
          cliFix: "string",
          conditionBlocks: [],
        },
        elifStatement: [],
        // {
        //   condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        //   actionType: "String",
        //   actionMessage: "String",
        //   cliFix: "string",
        //   conditionBlocks: null,
        // },
        elseStatement: {
          id: uniqueId2,
          actionType: "String",
          actionMessage: "String",
          cliFix: "string",
          conditionBlocks: [],
        },
      },
    ],
  };

  deleteRecursion = (id, parentID, conditionType, json) => {
    for (let i = 0; i < json.length; i++) {
      let newJson = json[i];

      if (newJson.id == parentID && conditionType == "IfElse") {
        let updatedJSON = json.filter((data) => data.id !== parentID);
        return updatedJSON;
      }

      if (newJson.id == parentID && conditionType == "elseIf") {
        newJson.elifStatement = newJson.elifStatement.filter(
          (data) => data.id !== id
        );
        return json;
      }

      if (
        newJson.ifStatement.conditionBlocks &&
        newJson.ifStatement.conditionBlocks.length > 0
      ) {
        newJson.ifStatement.conditionBlocks = this.deleteRecursion(
          id,
          parentID,
          conditionType,
          newJson.ifStatement.conditionBlocks
        );
        return json;
      }

      if (newJson.elifStatement) {
        for (let i = 0; i < newJson.elifStatement.length; i++) {
          if (
            newJson.elifStatement[i].conditionBlocks &&
            newJson.elifStatement[i].conditionBlocks.length > 0
          ) {
            newJson.elifStatement[i].conditionBlocks = this.deleteRecursion(
              id,
              parentID,
              conditionType,
              newJson.ifStatement.conditionBlocks
            );
            return json;
          }
        }
      }

      if (
        newJson.elifStatement.conditionBlocks &&
        newJson.elifStatement.conditionBlocks.length > 0
      ) {
        newJson.elifStatement.conditionBlocks = this.deleteRecursion(
          id,
          parentID,
          conditionType,
          newJson.ifStatement.conditionBlocks
        );
        return json;
      }
    }
  };

  deleteCondition = (id, parentID, conditionType) => {
    let updatedJSON = this.deleteRecursion(
      id,
      parentID,
      conditionType,
      this.state.conditionBlocks
    );
    this.setState({ conditionBlocks: updatedJSON });
  };

  addMoreIf = () => {
    this.setState({
      conditionBlocks: [
        ...this.state.conditionBlocks,
        {
          id: uuidv4(),
          ifStatement: {
            id: uuidv4(),
            condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
            actionType: "String",
            actionMessage: "String",
            cliFix: "string",
            conditionBlocks: [],
          },
          elifStatement: [],
          // {
          //   condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          //   actionType: "String",
          //   actionMessage: "String",
          //   cliFix: "string",
          //   conditionBlocks: null,
          // },
          elseStatement: {
            actionType: "String",
            actionMessage: "String",
            cliFix: "string",
            conditionBlocks: [],
          },
        },
      ],
    });
    // this.setState({ else: true });
  };

  addCondition = (json, name, id, newObj) => {
    for (let i = 0; i < json.length; i++) {
      let newJson = json[i];

      if (newJson.id == id && name == "ifElse") {
        newJson.ifStatement.conditionBlocks.push(newObj);
        return json;
      }

      if (newJson.id == id && name == "elseIf") {
        newJson.elifStatement = [...newJson.elifStatement, newObj];
        return json;
      }

      if (
        newJson.ifStatement.conditionBlocks &&
        newJson.ifStatement.conditionBlocks.length > 0
      ) {
        newJson.ifStatement.conditionBlocks = this.addCondition(
          newJson.ifStatement.conditionBlocks,
          name,
          id,
          newObj
        );
        return json;
      }

      if (newJson.elifStatement) {
        for (let i = 0; i < newJson.elifStatement.length; i++) {
          if (
            newJson.elifStatement[i].conditionBlocks &&
            newJson.elifStatement[i].conditionBlocks.length > 0
          ) {
            newJson.elifStatement[i].conditionBlocks = this.addCondition(
              newJson.elifStatement[i].conditionBlocks,
              name,
              id,
              newObj
            );
            return json;
          }
        }
      }

      if (
        newJson.elifStatement.conditionBlocks &&
        newJson.elifStatement.conditionBlocks.length > 0
      ) {
        newJson.elifStatement.conditionBlocks = this.addCondition(
          newJson.elifStatement.conditionBlocks,
          name,
          id,
          newObj
        );
        return json;
      }
    }
  };

  hanldeNesting = (name, id) => {
    console.log("----", this.state.conditionBlocks);
    let newObj;
    if (name === "elseIf") {
      newObj = {
        id: uuidv4(),
        condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        actionType: "String",
        actionMessage: "String",
        cliFix: "string",
        conditionBlocks: [],
      };
    } else if (name === "ifElse") {
      newObj = {
        id: uuidv4(),
        ifStatement: {
          id: uuidv4(),
          condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          actionType: "String",
          actionMessage: "String",
          cliFix: "string",
          conditionBlocks: [],
        },

        elifStatement: [],

        elseStatement: {
          id: uuidv4(),
          actionType: "String",
          actionMessage: "String",
          cliFix: "string",
          conditionBlocks: [],
        },
      };
    }

    let updatedObject = this.addCondition(
      this.state.conditionBlocks,
      name,
      id,
      newObj
    );
    this.setState({ conditionBlocks: updatedObject });
  };


  valueChangeRecursion = (conditionBlock, name, value, id) => {
    for (let i = 0; i < conditionBlock.length; i++) {
      let newJson = conditionBlock[i];

      if (newJson.ifStatement.id == id) {
        newJson.ifStatement[name] = value;
        return conditionBlock;
      }

      if (newJson.elifStatement && newJson.elifStatement.length > 0) {
        for (let i = 0; i < newJson.elifStatement.length; i++) {
          if(newJson.elifStatement[i].id === id){
            newJson.elifStatement[i][name] = value;
            return conditionBlock;
          }
        }
      }

      if (newJson.elseStatement.id == id) {
        newJson.elseStatement[name] = value;
        return conditionBlock;
      }

      if (
        newJson.ifStatement.conditionBlocks &&
        newJson.ifStatement.conditionBlocks.length > 0
      ) {
        newJson.ifStatement.conditionBlocks = this.valueChangeRecursion(
          newJson.ifStatement.conditionBlocks,
          name,
          value,
          id
        );
        return conditionBlock;
      }

      if (newJson.elifStatement) {
        for (let i = 0; i < newJson.elifStatement.length; i++) {
          if (
            newJson.elifStatement[i].conditionBlocks &&
            newJson.elifStatement[i].conditionBlocks.length > 0
          ) {
            newJson.elifStatement[
              i
            ].conditionBlocks = this.valueChangeRecursion(
              newJson.elifStatement[i].conditionBlocks,
              name,
              value,
              id
            );
            return conditionBlock;
          }
        }
      }

      if (
        newJson.elifStatement.conditionBlocks &&
        newJson.elifStatement.conditionBlocks.length > 0
      ) {
        newJson.elifStatement.conditionBlocks = this.valueChangeRecursion(
          newJson.elifStatement.conditionBlocks,
          name,
          value,
          id
        );
        return conditionBlock;
      }
    }
  };

  onValueChange = (name, value, id) => {
    let updatedJSON = this.valueChangeRecursion(
      this.state.conditionBlocks,
      name,
      value,
      id
    );
    this.setState({ conditionBlocks: updatedJSON });
  };

  render = () => (
    <div style={{ marginLeft: 10 }}>
      {this.state.conditionBlocks &&
        this.state.conditionBlocks.map((value, index) => {
          return (
            <div>
              <b>----------------------</b>
              <ConditionBlock
                deleteCondition={this.deleteCondition}
                key={value.id}
                conditionBlock={value}
                hanldeNesting={this.hanldeNesting}
                renderBuilder={this.renderBuilder}
                onValueChange={this.onValueChange}
              />
            </div>
          );
        })}

      {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
      <div style={{ marginTop: 20 }}>
        <Button size="small" onClick={this.addMoreIf}>
          + Add IF Block
        </Button>
      </div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.generateDSL}
        >
          Submit
        </Button>
      </div>

      <div style={{ marginTop: 20, marginLeft: 30 }}>
        <b>{this.state.finalOutput}</b>
      </div>
    </div>
  );

  generateDSL = () => {
    // console.log(
    //   JSON.stringify(QbUtils.queryString(this.state.tree, this.state.config)),  this.state.ifAction, this.state.ifMessage
    // );
    // console.log(
    //   JSON.stringify(
    //     QbUtils.queryString(this.state.elseTree, this.state.config)
    //   ),this.state.elseAction, this.state.elseMessage
    // );

    let ifCondtion = JSON.stringify(
      QbUtils.queryString(this.state.tree, this.state.config)
    );
    let elseCondtion = JSON.stringify(
      QbUtils.queryString(this.state.elseTree, this.state.config)
    );

    let elseStatement = " ";
    let finalElse =
      "ELSE BEGIN " +
      this.state.finalElseAction +
      " " +
      `"${this.state.finalElseMessage}"` +
      " END ";

    if (elseCondtion) {
      elseStatement =
        "ELIF (" +
        elseCondtion +
        " ) BEGIN RETURN " +
        this.state.elseAction +
        " " +
        `"${this.state.elseMessage}"` +
        " END ";
    }

    let finalDSL = "CONDITION condition_1 BEGIN IF (";
    finalDSL =
      finalDSL +
      ifCondtion +
      " ) BEGIN RETURN " +
      this.state.ifAction +
      " " +
      `"${this.state.ifMessage}"` +
      " END ";
    finalDSL = finalDSL + elseStatement + finalElse + "END";

    finalDSL = finalDSL.replace(/\&&/g, "and");
    finalDSL = finalDSL.replace(/\|\|/g, "or");

    finalDSL = finalDSL.replace(/[\\]/g, "");
    finalDSL = finalDSL.replace(/\("/g, "(");
    finalDSL = finalDSL.replace(/\" \)/g, ")");

    // finalDSL  = finalDSL.replace("\"", "");
    this.setState({ finalOutput: finalDSL });
    console.log(finalDSL);
  };

  renderBuilder = (props) => (
    <div className="query-builder-container">
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  // renderResult = ({tree: immutableTree, config}) => (
  //   <div className="query-builder-result">
  //       <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div>
  //   </div>
  // )

  // renderElseResult = ({elseTree: immutableTree, config}) => (
  //   <div className="query-builder-result">
  //       <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div>
  //   </div>
  // )

  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    console.log(
      "----",
      QbUtils.queryString(this.state.tree, this.state.config)
    );

    this.setState({ tree: immutableTree, config: config });

    // const jsonTree = QbUtils.getTree(immutableTree);
    // console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };

  onElseChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    this.setState({ elseTree: immutableTree, config: config });

    // const jsonTree = QbUtils.getTree(immutableTree);
    // console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };
}

function ConditionBlock({
  conditionBlock,
  hanldeNesting,
  deleteCondition,
  renderBuilder,
  onValueChange,
}) {
  return (
    <div style={{ marginLeft: "10px" }}>
      <IfStatement
        statement={conditionBlock.ifStatement}
        deleteCondition={deleteCondition}
        parentID={conditionBlock.id}
        hanldeNesting={hanldeNesting}
        renderBuilder={renderBuilder}
        onValueChange={onValueChange}
      />
      <ElIfStatement
        statements={conditionBlock.elifStatement}
        deleteCondition={deleteCondition}
        parentID={conditionBlock.id}
        hanldeNesting={hanldeNesting}
        renderBuilder={renderBuilder}
        onValueChange={onValueChange}

      />
        
      <ElseStatement statement={conditionBlock.elseStatement} onValueChange={onValueChange} />
    </div>
  );
}

function IfStatement({
  statement,
  hanldeNesting,
  parentID,
  deleteCondition,
  renderBuilder,
  onValueChange,
}) {
  console.log(statement);
  const nestedConditionBlock = (statement.conditionBlocks || []).map(
    (condition) => {
      return (
        <ConditionBlock
          conditionBlock={condition}
          deleteCondition={deleteCondition}
          hanldeNesting={hanldeNesting}
          renderBuilder={renderBuilder}
          onValueChange={onValueChange}
        />
      );
    }
  );

  return (
    <>
      {" "}
      <div>
        <div
          style={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 10,
            display: "flex",
          }}
        >
          <p> {"IF Condition"}</p>
          {/* {index !== 0 && ( */}
          <p
            onClick={() => deleteCondition(statement.id, parentID, "IfElse")}
            style={{ marginLeft: 10, color: "red" }}
          >
            X Remove
          </p>
          {/* )} */}
        </div>
        <Query
          {...config}
          value={statement.condition}
          // onChange={this.onChange}
          renderBuilder={renderBuilder}
        />
        {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: 10,
            marginTop: 10,
          }}
        >
          <TextField
            id="outlined-select-currency-native"
            select
            label="Select Action"
            // value={}
            value={"VIOLATION"}
            // onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            size="small"
            // helperText="Please Select Action"
            variant="outlined"
          >
            <option style={{ fontSize: 10 }} value="OUTPUT">
              OUTPUT
            </option>
            <option style={{ fontSize: 10 }} value="VIOLATION">
              VIOLATION
            </option>
          </TextField>
          <TextField
            size="small"
            onChange={(e) =>
              onValueChange("actionMessage", e.target.value, statement.id)
            }
            value={statement.actionMessage}
            id="filled-basic"
            label="Message"
            style={{ fontSize: 10, margin: "0px 20px" }}
            variant="outlined"
          />
          <TextField
            size="small"
            onChange={(e) =>
              onValueChange("cliFix", e.target.value, statement.id)
            }
            id="filled-basic"
            label="Cli Fix"
            value={statement.cliFix}
            style={{ fontSize: 10, marginRight: 20 }}
            variant="outlined"
          />
          {/* <TextField
      size="small"
      // onChange={(e) =>
      //   this.setState({ ifMessage: e.target.value })
      // }
      id="filled-basic"
      label="Save Output Variable"
      style={{ fontSize: 10 }}
      variant="outlined"
    /> */}

          <FormControl style={{ width: 200 }} size="small">
            <InputLabel style={{ fontSize: 10 }} id="demo-simple-select-label">
              Please Select
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              defaultValue={""}
              // style={{fontSize: 10}}
              onChange={(event) => hanldeNesting(event.target.value, parentID)}
            >
              <MenuItem value={"ifElse"}>Add Nested If Else</MenuItem>
              <MenuItem value={"elseIf"}>Add Else If</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {nestedConditionBlock}
    </>
  );
}

function ElIfStatement({
  statements,
  deleteCondition,
  parentID,
  hanldeNesting,
  renderBuilder,
  onValueChange
}) {
  return statements && statements.length > 0 ? (
    statements.map((statement) => {
      console.log("sss", statement.id);
      return (
        <div>
          <div
            style={{
              textAlign: "left",
              fontWeight: "bold",
              marginTop: 10,
              fontSize: 10,
              display: "flex",
            }}
          >
            <p>{"Else If Condition"}</p>

            <p
              onClick={() => deleteCondition(statement.id, parentID, "elseIf")}
              style={{ marginLeft: 10, color: "red" }}
            >
              X Remove
            </p>
          </div>
          <Query
            {...config}
            value={statement.condition}
            // onChange={this.onChange}
            renderBuilder={renderBuilder}
          />
          {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontSize: 10,
              marginTop: 10,
            }}
          >
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select Action"
              // value={}
              value={"VIOLATION"}
              // onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              size="small"
              // helperText="Please Select Action"
              variant="outlined"
            >
              <option style={{ fontSize: 10 }} value="OUTPUT">
                OUTPUT
              </option>
              <option style={{ fontSize: 10 }} value="VIOLATION">
                VIOLATION
              </option>
            </TextField>
            <TextField
              size="small"
              onChange={(e) =>
                onValueChange("actionMessage", e.target.value, statement.id)
              }
              value={statement.actionMessage}
              id="filled-basic"
              label="Message"
              style={{ fontSize: 10, margin: "0px 20px" }}
              variant="outlined"
            />

            <TextField
              size="small"
              onChange={(e) =>
                onValueChange("cliFix", e.target.value, statement.id)
              }
              value={statement.cliFix}
              id="filled-basic"
              label="Cli Fix"
              style={{ fontSize: 10, marginRight: 20 }}
              variant="outlined"
            />

            <FormControl style={{ width: 200 }} size="small">
              <InputLabel
                style={{ fontSize: 10 }}
                id="demo-simple-select-label"
              >
                Please Select
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                defaultValue={""}
                // style={{fontSize: 10}}

                onChange={(event) =>
                  hanldeNesting(event.target.value, parentID)
                }
              >
                {/* <MenuItem value={"ifElse"}>
                Add Nested If Else
              </MenuItem> */}
                <MenuItem value={"elseIf"}>Add Else If</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    })
  ) : (
    <div></div>
  );
}

function ElseStatement({ statement , onValueChange}) {
  return statement ? (
    <div>
      <div
        style={{
          textAlign: "left",
          fontWeight: "bold",
          marginTop: 10,
          marginBottom: 20,
          fontSize: 10,
        }}
      >
        Else Condition
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Select Action"
          value={"VIOLATION"}
          style={{ fontSize: 10 }}
          // onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          size="small"
          // helperText="Please Select Action"
          variant="outlined"
        >
          <option value="OUTPUT">OUTPUT</option>
          <option value="VIOLATION">VIOLATION</option>
        </TextField>

        <div style={{ fontSize: 12, margin: "0px 20px" }}>
          <TextField
            size="small"
            onChange={(e) =>
              onValueChange("actionMessage", e.target.value, statement.id)
            }
            value={statement.actionMessage}
            id="filled-basic"
            label="Message"
            variant="outlined"
          />
        </div>

        <TextField
          size="small"
          onChange={(e) =>
            onValueChange("cliFix", e.target.value, statement.id)
          }
          value={statement.cliFix}
          id="filled-basic"
          label="Cli Fix"
          style={{ fontSize: 10 }}
          variant="outlined"
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
