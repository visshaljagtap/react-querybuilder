import React from "react";
import { Widgets, Operators, BasicConfig } from "react-awesome-query-builder";
const {
  FieldSelect,
  FieldDropdown,
  FieldCascader,
  VanillaFieldSelect
} = Widgets;

const conjunctions = {
  ...BasicConfig.conjunctions
};

const operators = {
  ...BasicConfig.operators
};

const widgets = {
  ...BasicConfig.widgets,
  func: {
    ...BasicConfig.widgets.func,
    customProps: {
      showSearch: true
    }
  }
};

const types = {
  ...BasicConfig.types
};

const localeSettings = {
  removeRuleConfirmOptions: {
    title: "Are you sure delete this rule?",
    okText: "Yes",
    okType: "danger"
  },
  removeGroupConfirmOptions: {
    title: "Are you sure delete this group?",
    okText: "Yes",
    okType: "danger"
  }
};

const settings = {
  ...BasicConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {
    value: {
      label: "Value"
    },
    // field: {
    //   label: "Field",
    //   widget: "field"
    // },
    func: {
      label: "Function",
      widget: "func"
    }
  },
  // canReorder: true,
  // canRegroup: true,
  // showNot: true,
  // showLabels: true,
  maxNesting: 10,
  canLeaveEmptyGroup: true, //after deletion
  renderField: props => <FieldCascader {...props} />,
  renderOperator: props => <FieldDropdown {...props} />,
  renderFunc: props => <FieldCascader {...props} />
};

//////////////////////////////////////////////////////////////////////

const fields = {
  count: {
    type: "!struct",
    subfields: {
      OI: {
        type: "number",
        preferWidgets: ["number"],
        valueSources: ["value"],
        defaultOperator: "greater_or_equal",
        fieldSettings: {
          min: 0
        }
      },
      Close: {
        type: "number",
        preferWidgets: ["number"],
        defaultOperator: "greater_or_equal",
        valueSources: ["value"],
        fieldSettings: {
          min: 0
        }
      }
    }
  },
  OI: {
    type: "number",
    preferWidgets: ["number"],
    valueSources: ["value", "func"],
    defaultOperator: "greater_or_equal",
    fieldSettings: {
      min: 0
    }
  },
  Close: {
    type: "number",
    preferWidgets: ["number"],
    valueSources: ["value", "func"],
    defaultOperator: "greater_or_equal",
    fieldSettings: {
      min: 0
    }
  }
};

//////////////////////////////////////////////////////////////////////

const funcs = {
  TA4J: {
    type: "!struct",
    subfields: {
      EMA: {
        label: "EMA",
        returnType: "number",
        args: {
          p1: {
            label: "Param 1",
            type: "number",
            valueSources: ["value"]
          },
          p2: {
            label: "Param 2",
            type: "number",
            valueSources: ["value"]
          }
        }
      }
    }
  }
};

export default {
  conjunctions,
  operators,
  widgets,
  types,
  settings,
  fields,
  funcs
};
