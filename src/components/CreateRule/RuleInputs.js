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

const RuleInputs = () => {
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
    <div style={{margin: '0 auto', width: '90%'}}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
        variant="outlined"
          style={{ marginBottom: 20 }}
          fullWidth
          id="email"
          name="email"
          label="Rule Title"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
        variant="outlined"

          style={{ marginBottom: 20 }}
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

          style={{ marginBottom: 20 }}
          fullWidth
          id="email"
          name="email"
          label="Impact"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
        variant="outlined"

          style={{ marginBottom: 20 }}
          fullWidth
          id="email"
          name="email"
          label="Suggested Fix"
          //   value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button> */}
      </form>
    </div>
  );
};

export default RuleInputs;
