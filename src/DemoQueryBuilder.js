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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// config.settings({
//   showNot: true
// })

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };

export default class DemoQueryBuilder extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    elseTree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
    else: false,
    ifString: null,
    elseString: null,
    ifMessage: null,
    elseMessage: null,
    finalElseMessage: null,
    ifAction: "VIOLATION",
    elseAction: "VIOLATION",
    finalElseAction: "OUTPUT",
    finalOutput: null,
    elseIfBlocks: [
      {
        elseTree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
      },
    ],
  };

  handleChange = (event) => {
    let value = event.target.value;
    if (value == "elseIf") {
      this.setState({
        elseIfBlocks: [
          ...this.state.elseIfBlocks,
          {
            elseTree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
          },
        ],
      });
    }
    // this.setState({ else: true });
  };

  render = () => (
    <div style={{ marginLeft: 20 }}>
      {this.state.elseIfBlocks &&
        this.state.elseIfBlocks.map((value, index) => {
          let title = index === 0 ? "If Condition" : "Else If Condition";
          return (
            <div key={index}>
              <div
                style={{ textAlign: "left", fontWeight: "bold", marginTop: 20, fontSize: 10 }}
              >
                {title}
              </div>
              <Query
                {...config}
                value={value.elseTree}
                onChange={this.onChange}
                renderBuilder={this.renderBuilder}
              />
              {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: 10
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
                    <option style={{fontSize: 10}} value="OUTPUT">OUTPUT</option>
                    <option style={{fontSize: 10}} value="VIOLATION">VIOLATION</option>
                  </TextField>
                  <TextField
                    size="small"
                    onChange={(e) =>
                      this.setState({ ifMessage: e.target.value })
                    }
                    id="filled-basic"
                    label="Message"
                    style={{fontSize: 10}}
                    variant="outlined"
                  />

                  {/* {!this.state.else &&  <Button
              size="small"
              variant="contained"
              // color="primary"
              onClick={() => this.setState({ else: true })}
            >
              + Add Else If Condition
            </Button>} */}

                  <FormControl style={{ width: 200 }} size="small">
              
                    <InputLabel style={{fontSize: 10}} id="demo-simple-select-label">
                      Please Select
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      defaultValue={""}
              // style={{fontSize: 10}}
              

                      onChange={this.handleChange}
                    >
                      <MenuItem value={"ifElse"}>Add Nested If Else</MenuItem>
                      <MenuItem value={"elseIf"}>Add Else If</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              {/* )} */}
              {/* {this.renderResult(this.state)} */}
            </div>
          );
        })}

      {/* {this.state.else && (
        <div>
          <div style={{ textAlign: "left", fontWeight: "bold", marginTop: 20 }}>
            Else If Condition
          </div>
          <Query
            {...config}
            value={this.state.elseTree}
            onChange={this.onElseChange}
            renderBuilder={this.renderBuilder}
          />
          {QbUtils.queryString(this.state.elseTree, this.state.config) && (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Select Action"
                value={"VIOLATION"}
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

              <div style={{ fontSize: 12 }}>
                <TextField
                  size="small"
                  onChange={(e) =>
                    this.setState({ elseMessage: e.target.value })
                  }
                  id="filled-basic"
                  label="Message"
                  variant="outlined"
                />
              </div>
            </div>
          )}
        </div>
      )} */}

      {/* {QbUtils.queryString(this.state.tree, this.state.config) && ( */}
      {true && (
        <div>
          <div
            style={{
              textAlign: "left",
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 20,
              fontSize: 10
            }}
          >
            Else Condition
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select Action"
              value={"VIOLATION"}
              style={{fontSize: 10}}
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

            <div style={{ fontSize: 12 }}>
              <TextField
                size="small"
                onChange={(e) =>
                  this.setState({ finalElseMessage: e.target.value })
                }
                id="filled-basic"
                label="Message"
                variant="outlined"
              />
            </div>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.generateDSL}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

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
