import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import { URL } from "../URL";

//to create mentor
export function CreateMentors() {
  const history = useHistory();

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        image: "",
        email_id: "",
        age: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newMentor) => {
        addBtn(newMentor);
      },
    });

  const addBtn = async (newMentor) => {
    fetch(`${URL}/mentors`, {
      method: "POST",
      body: JSON.stringify(newMentor),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.push("/mentors");
    });
  };
  return (
    <form className="inputs" onSubmit={handleSubmit}>
      <h4 style={{ textAlign: "center" }}>Create Mentor</h4>
      <TextField
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        id="name"
        name="name"
        label="Enter Mentor Name"
        variant="standard"
        error={errors.name && touched.name}
        helperText={errors.name && touched.name && errors.name}
      />
      <TextField
        value={values.image}
        onChange={handleChange}
        onBlur={handleBlur}
        id="image"
        name="image"
        label="Enter Avatar URL"
        variant="standard"
        error={errors.image && touched.image}
        helperText={errors.image && touched.image && errors.image}
      />
      <TextField
        value={values.email_id}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email_id"
        name="email_id"
        label="Enter Mentor email_id"
        variant="standard"
        error={errors.email_id && touched.email_id}
        helperText={errors.email_id && touched.email_id && errors.email_id}
      />
      <TextField
        value={values.age}
        onChange={handleChange}
        onBlur={handleBlur}
        id="age"
        name="age"
        label="Enter Mentor age"
        variant="standard"
        error={errors.age && touched.age}
        helperText={errors.age && touched.age && errors.age}
      />
      <div className="addBtn">
        <Button
          className="button"
          type="submit"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add Mentor
        </Button>
      </div>
      <div>
        <Button
          variant="text"
          onClick={() => history.goBack()}
          startIcon={<KeyboardBackspaceIcon />}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
//validation
const formValidationSchema = yup.object({
  name: yup
    .string()
    .min(5, "Need longer name")
    .required("Please Fill the name"),
  image: yup.string().required("Please Attach URL"),
  email_id: yup
    .string()
    .min(8, "require longer email id")
    .required("Please Fill the email id"),
  age: yup
    .number("enter mentor age")
    .min(0, "invalid input")
    .required("Please Fill the age"),
});
