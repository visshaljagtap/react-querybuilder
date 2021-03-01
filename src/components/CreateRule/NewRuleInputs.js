import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

const RuleInputs = (props) => {
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

        <TextField
          variant="outlined"
          style={{ marginBottom: 10 }}
          fullWidth
          id="email"
          name="email"
          label="Data Type"
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

        <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button ocolor="primary" variant="contained" type="submit">
          Save
        </Button>

        <Button onClick={()=>props.setOpenDrawer(false)} variant="contained" type="submit">
          Cancel
        </Button>
        </div>

       
      </form>
    </div>
  );
};

export default RuleInputs;
