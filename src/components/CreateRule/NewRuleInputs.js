import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { KeyboardDatePicker } from "@material-ui/pickers";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    width: "100%",
    marginBottom: 15,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RuleInputs = (props) => {
  const classes = useStyles();

  const [dataType, setDataType] = React.useState("string");

  const handleChangeDataType = (event) => {
    setDataType(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div style={{ padding: 20, width: 500 }}>
      <p>New Rule Input</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          label="Title"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          label="Identifier"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          rows={4}
          multiline
          label="Description"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          variant="outlined"
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          label="Scope"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            Select Data Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dataType}
            onChange={handleChangeDataType}
            variant="standard"
          >
            <MenuItem value={"string"}>String</MenuItem>
            <MenuItem value={"number"}>Number</MenuItem>
            <MenuItem value={"boolean"}>Boolean</MenuItem>
            <MenuItem value={"date"}>Date</MenuItem>
          </Select>
        </FormControl>

        {dataType === "boolean" && (
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ fontSize: 14 }}>
              Default Value
            </FormLabel>

            <RadioGroup
              aria-label="gender"
              name="gender1"
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        )}

        {dataType == "string" && (
          <>
            {" "}
            <TextField
              variant="outlined"
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Default Value"
              //   value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Max Length"
              //   value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Valid Reg Exp"
              //   value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </>
        )}

        {dataType == "number" && (
          <>
            {" "}
            <TextField
              variant="outlined"
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Default Value"
              //   value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Min"
              //   value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              style={{ marginBottom: 10 }}
              fullWidth
              id="email"
              name="email"
              label="Max"
              //   value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </>
        )}

        {dataType == "date" && (
          <>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              style={{ marginRight: 100 }}
              // value={selectedDate}
              // onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              // value={selectedDate}
              // onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Default Date"
              // value={selectedDate}
              // onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <Button ocolor="primary" variant="contained" type="submit">
            Save
          </Button>

          <Button
            onClick={() => props.setOpenDrawer(false)}
            variant="contained"
            type="submit"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RuleInputs;
