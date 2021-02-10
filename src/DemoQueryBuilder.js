import React, { Component } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils,
} from "react-awesome-query-builder";

import { TextField, Button, MenuItem } from "@material-ui/core";

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
  fields: {
    $c1: {
      label: "show command", //only for menu's toggler
      type: "text",
      excludeOperators: ["proximity"],
      operators: ['equal', "like", "not_like",
      "starts_with",
      "ends_with", "regex"],
      defaultOperator: 'like',
    },
    $c2: {
      label: "Show cdp neighbours", //only for menu's toggler
      type: "text",
      defaultOperator: 'like',
      operators: ['equal', "like", "not_like",
      "starts_with",
      "ends_with"],
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
    ifAction: "VIOLATION",
    elseAction: "VIOLATION",
    finalOutput: null,
  };

  render = () => (
    <>
      <div>
      <div style={{ textAlign: "center", fontWeight: "bold" , marginTop: 20}}>
          IF Condition
        </div>
        <Query
          {...config}
          value={this.state.tree}
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
        />
      { QbUtils.queryString(this.state.tree, this.state.config) && <div style={{ display: "flex", justifyContent: "space-around" }}>
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
            <option value="OUTPUT">OUTPUT</option>
            <option value="VIOLATION">VIOLATION</option>
          </TextField>
          <TextField
            size="small"
            onChange={(e) => this.setState({ ifMessage: e.target.value })}
            id="filled-basic"
            label="Message"
            variant="outlined"
          />

          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => this.setState({ else: true })}
          >
            Add Else Condition
          </Button>
        </div>}
        {/* {this.renderResult(this.state)} */}
      </div>

      {this.state.else && (
        <div>
          <div style={{ textAlign: "center", fontWeight: "bold" , marginTop: 20}}>
            Else Condition
          </div>
          <Query
            {...config}
            value={this.state.elseTree}
            onChange={this.onElseChange}
            renderBuilder={this.renderBuilder}
          />
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
                onChange={(e) => this.setState({ elseMessage: e.target.value })}
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
          <div style={{ marginTop: 20, marginLeft: 30 }}>
            <b>{this.state.finalOutput}</b>
          </div>
        </div>
      )}
    </>
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

    let elseStatement
    let finalElse = ""
    
    if(elseCondtion) {
      elseStatement =  "ELIF (" +
      elseCondtion +
      " ) BEGIN RETURN "

      finalElse = " ELSE BEGIN OUTPUT '' END "
    }
    else {
      elseStatement =  "ELSE BEGIN "
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
    finalDSL =
      finalDSL +
     elseStatement +
      this.state.elseAction +
      " " +
      `"${this.state.elseMessage}"` +
      " END ";
    finalDSL = finalDSL + finalElse +  "END";

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
  console.log('----', QbUtils.queryString(this.state.tree, this.state.config));

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
