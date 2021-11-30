import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TableForm from "./TableForm";
import { useMutation, useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import {
  getRequest,
  postRequest,
  updateRequest,
  deleteRequest,
} from "../query";
const inputForm = {
  Name: "",
  Ph_number: "",
  Gender: "",
  Age: "",
};

function Form() {
  const { data } = useQuery(getRequest);

  const [Post, postInfo] = useMutation(postRequest, {
    refetchQueries: [
      {
        query: getRequest,
      },
    ],
  });
  const [Update, updateInto] = useMutation(updateRequest, {
    refetchQueries: [
      {
        query: getRequest,
      },
    ],
  });
  const [Delete, deletedInfo] = useMutation(deleteRequest, {
    refetchQueries: [
      {
        query: getRequest,
      },
    ],
  });

  const [flag, setFlag] = useState(false);
  const [id, setId] = useState(null);
  const [forms, setForms] = useState(inputForm);
  const [info, setInfo] = useState([]);
  const submitForm = async (e) => {
    e.preventDefault();
    const uui = uuidv4();
    console.log(forms);
    Post({
      variables: {
        id: uui,
        Name: forms.Name.toString(),
        Ph_number: forms.Ph_number,
        Gender: forms.Gender,
        Age: forms.Age,
      },
    });

    setForms(inputForm);
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      setInfo(data?.getData);
    }
  }, [data]);

  const handleChange = ({ target: { name, value } }) => {
    setForms({ ...forms, [name]: isNaN(value) ? value : parseInt(value) });
  };
  const handleSelect = (e) => {
    console.log(e.target.value);
    setForms({ ...forms, [e.target.name]: e.target.value });
  };
  const edit = (row) => {
    setForms(row);
    setId(row.id);
    setFlag(true);
  };
  const saveChanges = async () => {
    Update({
      variables: {
        id,
        Name: forms.Name,
        Ph_number: forms.Ph_number,
        Gender: forms.Gender,
        Age: forms.Age,
      },
    });
    setForms(inputForm);
    setFlag(!flag);
  };
  const deleteInfo = async (id) => {
    Delete({ variables: { id } });
    setInfo(deletedInfo?.data);
  };

  return (
    <div>
      <form
        onSubmit={submitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "50%",
        }}
      >
        <TextField
          style={{ marginTop: "1rem" }}
          required={true}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="Name"
          value={forms.Name}
          type="text"
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "1rem" }}
          required
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          name="Ph_number"
          value={forms.Ph_number}
          type="number"
          onChange={handleChange}
        />
        <Box sx={{ minWidth: 120 }} style={{ marginTop: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={forms.Gender}
              label="Age"
              onChange={handleSelect}
              name="Gender"
              required
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          style={{ marginTop: "1rem" }}
          required
          id="outlined-basic"
          label="Age"
          variant="outlined"
          name="Age"
          value={forms.Age}
          type="number"
          onChange={handleChange}
        />
        {!flag ? (
          <Button
            type="submit"
            color="primary"
            style={{ marginTop: "1rem" }}
            variant="contained"
          >
            SUBMIT
          </Button>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              // type="submit"
              color="primary"
              variant="contained"
              style={{
                marginTop: "1rem",
                width: "100%",
                marginRight: ".2rem ",
              }}
              onClick={saveChanges}
            >
              SAVE
            </Button>
            <Button
              // type="submit"
              color="secondary"
              variant="contained"
              style={{
                marginTop: "1rem",
                width: "100%",
                marginLeft: ".2rem ",
              }}
              onClick={() => {
                setFlag(false);
                setForms(inputForm);
              }}
            >
              CANCEL
            </Button>
          </div>
        )}
      </form>

      {info?.length ? (
        <TableForm info={info} deleteInfo={deleteInfo} edit={edit} />
      ) : null}
    </div>
  );
}

export default Form;
