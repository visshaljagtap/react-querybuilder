import React, { Component, useState } from "react";
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
  Snackbar,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ReactJson from "react-json-view";

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
    $show_command: {
      label: "show command", //only for menu's toggler
      type: "text",
      excludeOperators: ["proximity"],
      operators: [
        "like",
        "equal",
        "greater_or_equal",
        "greater",
        "less_or_equal",
        "less",
        "starts_with",
        "ends_with",
        "regex",
        "not_equal",
      ],
      defaultOperator: "like",
    },
    $Show_cdp_neighbours: {
      label: "Show cdp neighbours", //only for menu's toggler
      type: "text",
      defaultOperator: "like",
      operators: [
        "like",
        "equal",
        "greater_or_equal",
        "greater",
        "less_or_equal",
        "not_equal",
        "less",
        "starts_with",
        "ends_with",
      ],
      excludeOperators: ["proximity"],
    },
    $show_run: {
      label: "show run", //only for menu's toggler
      type: "text",
      operators: [
        "like",
        "equal",
        "not_equal",

        // "not_like",
        "starts_with",
        "ends_with",
        "greater_or_equal",
        "greater",
        "less_or_equal",
        "less",
      ],
      defaultOperator: "like",
      excludeOperators: ["proximity"],
    },
  },
};

console.log("0---", config, InitialConfig);

config.operators.equal.label = "matches";
config.operators.equal.labelForFormat = "matches";

config.operators.like.label = "contains";
config.operators.like.labelForFormat = "contains";

const queryValue = { id: QbUtils.uuid(), type: "group" };

const uniqueId = uuidv4();
const uniqueId1 = uuidv4();
const uniqueId2 = uuidv4();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default class DemoQueryBuilder extends Component {
  state = {
    config: config,
    finalOutput: null,
    value: 0,
    conditionBlocks: [
      {
        id: uniqueId,
        ifStatement: {
          id: uniqueId1,
          queryBuilder: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          condition: "",
          actionType: "OUTPUT",
          actionMessage: "",
          cliFix: "",
          conditionBlocks: [],
        },
        elifStatement: [],
        // {
        //   condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        //   actionType: "",
        //   actionMessage: "",
        //   cliFix: "",
        //   conditionBlocks: null,
        // },
        elseStatement: {
          id: uniqueId2,
          actionType: "OUTPUT",
          actionMessage: "",
          cliFix: "",
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

      // if (
      //   newJson.elifStatement.conditionBlocks &&
      //   newJson.elifStatement.conditionBlocks.length > 0
      // ) {
      //   newJson.elifStatement.conditionBlocks = this.deleteRecursion(
      //     id,
      //     parentID,
      //     conditionType,
      //     newJson.ifStatement.conditionBlocks
      //   );
      //   return json;
      // }
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
            queryBuilder: QbUtils.checkTree(
              QbUtils.loadTree(queryValue),
              config
            ),
            condition: "",
            actionType: "OUTPUT",
            actionMessage: "",
            cliFix: "",
            conditionBlocks: [],
          },
          elifStatement: [],
          // {
          //   condition: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          //   actionType: "",
          //   actionMessage: "",
          //   cliFix: "",
          //   conditionBlocks: null,
          // },
          elseStatement: {
            actionType: "OUTPUT",
            actionMessage: "",
            cliFix: "",
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

      // if (
      //   newJson.elifStatement.conditionBlocks &&
      //   newJson.elifStatement.conditionBlocks.length > 0
      // ) {
      //   newJson.elifStatement.conditionBlocks = this.addCondition(
      //     newJson.elifStatement.conditionBlocks,
      //     name,
      //     id,
      //     newObj
      //   );
      //   return json;
      // }
    }
  };

  hanldeNesting = (name, id) => {
    console.log("----", this.state.conditionBlocks, id);
    let newObj;
    if (name === "elseIf") {
      newObj = {
        id: uuidv4(),
        queryBuilder: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
        condition: "",
        actionType: "OUTPUT",
        actionMessage: "",
        cliFix: "",
        conditionBlocks: [],
      };
    } else if (name === "ifElse") {
      newObj = {
        id: uuidv4(),
        ifStatement: {
          id: uuidv4(),
          queryBuilder: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          condition: "",
          actionType: "OUTPUT",
          actionMessage: "",
          cliFix: "",
          conditionBlocks: [],
        },

        elifStatement: [],

        elseStatement: {
          id: uuidv4(),
          actionType: "OUTPUT",
          actionMessage: "",
          cliFix: "",
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
    if (updatedObject) {
      this.setState({ conditionBlocks: updatedObject });
    }
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
          if (newJson.elifStatement[i].id === id) {
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

      // if (
      //   newJson.elifStatement.conditionBlocks &&
      //   newJson.elifStatement.conditionBlocks.length > 0
      // ) {
      //   newJson.elifStatement.conditionBlocks = this.valueChangeRecursion(
      //     newJson.elifStatement.conditionBlocks,
      //     name,
      //     value,
      //     id
      //   );
      //   return conditionBlock;
      // }
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

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render = () => (
    <div>
      <AppBar position="static">
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Rule Conditions" {...a11yProps(0)} />
          <Tab label="JSON Condition" {...a11yProps(1)} />
          <Tab label="Condition Tree" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={this.state.value} index={0}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "70%" }}>
            {this.state.conditionBlocks &&
              this.state.conditionBlocks.map((value, index) => {
                return (
                  <div>
                    <ConditionBlock
                      deleteCondition={this.deleteCondition}
                      key={value.id}
                      conditionBlock={value}
                      hanldeNesting={this.hanldeNesting}
                      renderBuilder={this.renderBuilder}
                      onValueChange={this.onValueChange}
                      onQueryBuilderChange={this.onQueryBuilderChange}
                    />
                  </div>
                );
              })}
            <div style={{ marginTop: 20 }}>
              <Button size="small" onClick={this.addMoreIf}>
                + Add IF Block
              </Button>
            </div>
            <div style={{ width: "70%", textAlign: "center", marginTop: 20 }}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={this.submitJSON}
              >
                Submit
              </Button>
            </div>
          </div>
          <div style={{ width: "30%", marginLeft: 10 }}>
            <span>OUTPUT JSON</span>
            <ReactJson
              theme="bright:inverted"
              displayDataTypes={false}
              collapsed={2}
              indentWidth={2}
              enableEdit={true}
              onEdit={(value)=>this.setState({conditionBlocks: value.updated_src})}
              src={this.state.conditionBlocks}
            />
          </div>
        </div>

        {/* <div style={{ marginTop: 20, fontSize: 12 }}>
          <p>{JSON.stringify(this.state.conditionBlocks)}</p>
        </div> */}
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <span>OUTPUT JSON</span>
        <div style={{ marginTop: 20, fontSize: 12 }}>
          <p>{JSON.stringify(this.state.conditionBlocks)}</p>
        </div>
        <ReactJson
          theme="twilight"
          displayDataTypes={false}
          collapsed={2}
          indentWidth={2}
          src={this.state.conditionBlocks}
        />
      </TabPanel>
      <TabPanel value={this.state.value} index={2}>
        Condition Tree
      </TabPanel>

      {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
    </div>
  );

  submitJSON = () => {
    console.log(this.state.conditionBlocks);
  };

  renderBuilder = (props) => (
    <div className="query-builder-container">
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  onQueryBuilderChange = (immutableTree, config, id) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    console.log(
      "----",
      QbUtils.queryString(this.state.tree, this.state.config)
    );

    let conditionString = QbUtils.queryString(
      this.state.tree,
      this.state.config
    );

    if (conditionString) {
      conditionString = conditionString.replace(/\&&/g, "and");
      conditionString = conditionString.replace(/\|\|/g, "or");

      conditionString = conditionString.replace(/[\\]/g, "");
      conditionString = conditionString.replace(/\("/g, "(");
      conditionString = conditionString.replace(/\" \)/g, ")");
      conditionString = conditionString.replace(/"/g, "'");
    }

    console.log("[[[", conditionString);
    this.onValueChange("condition", conditionString, id);

    this.setState({ tree: immutableTree, config: config });

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
  onQueryBuilderChange,
}) {
  return (
    <div style={{ padding: "5px 10px", border: "1px solid gray" }}>
      <IfStatement
        statement={conditionBlock.ifStatement}
        deleteCondition={deleteCondition}
        parentID={conditionBlock.id}
        hanldeNesting={hanldeNesting}
        renderBuilder={renderBuilder}
        onValueChange={onValueChange}
        onQueryBuilderChange={onQueryBuilderChange}
      />
      <ElIfStatement
        statements={conditionBlock.elifStatement}
        deleteCondition={deleteCondition}
        parentID={conditionBlock.id}
        hanldeNesting={hanldeNesting}
        renderBuilder={renderBuilder}
        onValueChange={onValueChange}
        onQueryBuilderChange={onQueryBuilderChange}
      />

      <ElseStatement
        statement={conditionBlock.elseStatement}
        onValueChange={onValueChange}
      />
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
  onQueryBuilderChange,
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
          onQueryBuilderChange={onQueryBuilderChange}
        />
      );
    }
  );

  const [output, setOutput] = useState();
  const [open, setOpen] = React.useState(false);

  const saveOutput = () => {
    console.log("---", output, config);
    config.fields["$" + output] = {
      label: output, //only for menu's toggler
      type: "text",
      operators: [
        "like",
        "equal",
        "not_equal",

        // "not_like",
        "starts_with",
        "ends_with",
        "greater_or_equal",
        "greater",
        "less_or_equal",
        "less",
      ],
      defaultOperator: "like",
      excludeOperators: ["proximity"],
    };
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
            marginBottom: 3,
          }}
        >
          <div> {"IF Condition"}</div>
          {/* {index !== 0 && ( */}
          <div
            onClick={() => deleteCondition(statement.id, parentID, "IfElse")}
            style={{ marginLeft: 10, color: "red" }}
          >
            X Remove
          </div>
          {/* )} */}
        </div>
        <Query
          {...config}
          value={statement.queryBuilder}
          onChange={(immutableTree, config) =>
            onQueryBuilderChange(immutableTree, config, statement.id)
          }
          renderBuilder={renderBuilder}
        />
        {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
        {statement.condition && (
          <div
            style={{ marginTop: 5, display: "flex", alignContent: "center" }}
          >
            <span>Save Expression Result into</span>
            <input
              style={{ width: 50, marginLeft: 20, marginRight: 20 }}
              onChange={
                (e) => setOutput(e.target.value)
                // onValueChange("expressionResult", e.target.value, statement.id)
              }
            />
            <button onClick={saveOutput}>Save</button>
          </div>
        )}
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
            value={statement.actionType}
            onChange={(e) =>
              onValueChange("actionType", e.target.value, statement.id)
            }
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
          {statement.actionType === "VIOLATION" && (
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
          )}
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
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <div
          style={{
            background: "#80808059",
            padding: "5px 20px",
            borderRadius: 25,
          }}
        >
          Saved successfully!
        </div>
      </Snackbar>
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
  onValueChange,
  onQueryBuilderChange,
}) {
  const [output, setOutput] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const saveOutput = () => {
    console.log("---", output, config);
    config.fields["$" + output] = {
      label: output, //only for menu's toggler
      type: "text",
      operators: [
        "like",
        "equal",
        "not_equal",

        // "not_like",
        "starts_with",
        "ends_with",
        "greater_or_equal",
        "greater",
        "less_or_equal",
        "less",
      ],
      defaultOperator: "like",
      excludeOperators: ["proximity"],
    };
    setOpen(true);
  };
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
            <div>{"Else If Condition"}</div>

            <div
              onClick={() => deleteCondition(statement.id, parentID, "elseIf")}
              style={{ marginLeft: 10, color: "red" }}
            >
              X Remove
            </div>
          </div>
          <Query
            {...config}
            value={statement.queryBuilder}
            onChange={(immutableTree, config) =>
              onQueryBuilderChange(immutableTree, config, statement.id)
            }
            renderBuilder={renderBuilder}
          />
          {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
          {statement.condition && (
            <div
              style={{ marginTop: 5, display: "flex", alignContent: "center" }}
            >
              <span>Save Expression Result into</span>
              <input
                style={{ width: 50, marginLeft: 20, marginRight: 20 }}
                onChange={
                  (e) => setOutput(e.target.value)
                  // onValueChange("expressionResult", e.target.value, statement.id)
                }
              />
              <button onClick={saveOutput}>Save</button>
            </div>
          )}
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
              value={statement.actionType}
              onChange={(e) =>
                onValueChange("actionType", e.target.value, statement.id)
              }
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

            {statement.actionType === "VIOLATION" && (
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
            )}

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

                onChange={(event) => {
                  console.log(
                    event.target.value,
                    parentID,
                    statement.id,
                    "----"
                  );
                  hanldeNesting(event.target.value, parentID);
                }}
              >
                {/* <MenuItem value={"ifElse"}>Add Nested If Else</MenuItem> */}
                <MenuItem value={"elseIf"}>Add Else If</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <div
              style={{
                background: "#80808059",
                padding: "5px 20px",
                borderRadius: 25,
              }}
            >
              Saved successfully!
            </div>
          </Snackbar>
        </div>
      );
    })
  ) : (
    <div></div>
  );
}

function ElseStatement({ statement, onValueChange }) {
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
          value={statement.actionType}
          onChange={(e) =>
            onValueChange("actionType", e.target.value, statement.id)
          }
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

        {statement.actionType === "VIOLATION" && (
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
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
}
