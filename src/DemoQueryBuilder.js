import React, { Component } from "react";
import {
  Query,
  Builder,
  BasicConfig,
  Utils as QbUtils,
} from "react-awesome-query-builder";

// For AntDesign widgets only:
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import "react-awesome-query-builder/css/antd.less"; // or import "antd/dist/antd.css";
// For Material-UI widgets only:
// import MaterialConfig from 'react-awesome-query-builder/lib/config/material';
// Choose your skin (ant/material/vanilla):

import "react-awesome-query-builder/lib/css/styles.css";
import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles
import { Divider } from "antd";

const InitialConfig = AntdConfig; // or MaterialConfig or BasicConfig

// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  fields: {
    c1: {
      label2: "c1", //only for menu's toggler
      type: "text",
      excludeOperators: ["proximity"],
      mainWidgetProps: {
        valueLabel: "Name",
        valuePlaceholder: "Enter name",
      },
      fieldSettings: {
        validateValue: (val, fieldSettings) => {
          return val.length < 10;
        },
      },
    },
    c2: {
      label2: "c2", //only for menu's toggler
      type: "text",
      excludeOperators: ["proximity"],
    },
    c3: {
      label2: "c3", //only for menu's toggler
      type: "text",
    },
    c4: {
      label2: "c4", //only for menu's toggler
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
    ifAction: "VIOLATE",
    elseAction: "CONTINUE",
    finalOutput: null,
  };

  render = () => (
    <>
      <div>
        <Query
          {...config}
          value={this.state.tree}
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
        />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <select name="action" id="action">
            <option value="Violate">Violate</option>
            <option value="Continue">Continue</option>
          </select>
          <input
            placeholder="Message"
            onChange={(e) => this.setState({ ifMessage: e.target.value })}
          />
          <button onClick={() => this.setState({ else: true })}>
            Add Else Condition
          </button>
        </div>
        {/* {this.renderResult(this.state)} */}
      </div>

      {this.state.else && (
        <div>
          <Divider>ELSE</Divider>
          <Query
            {...config}
            value={this.state.elseTree}
            onChange={this.onElseChange}
            renderBuilder={this.renderBuilder}
          />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <select name="action" id="action">
              <option value="Continue">Continue</option>
              <option value="Violate">Violate</option>
            </select>
            <input
              placeholder="Message"
              onChange={(e) => this.setState({ elseMessage: e.target.value })}
            />
            <button onClick={this.generateDSL}>Submit</button>
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

    let finalDSL = "CONDITION IF (";
    finalDSL =
      finalDSL +
      ifCondtion +
      " ) BEGIN RETURN " +
      this.state.ifAction +
      " " +
      this.state.ifMessage +
      " END ";
    finalDSL =
      finalDSL +
      "ELIF (" +
      elseCondtion +
      " ) BEGIN RETURN " +
      this.state.elseAction +
      " " +
      this.state.elseMessage +
      " END ";
    finalDSL = finalDSL + "END";

    finalDSL = finalDSL.replace("&&", "and");
    finalDSL = finalDSL.replace("||", "or");
    // finalDSL  = finalDSL.replace("\"", "");
    this.setState({ finalOutput: finalDSL });
    console.log(finalDSL);
  };

  renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
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
