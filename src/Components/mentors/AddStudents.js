import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import { URL } from "../URL";

//Adding multiple student for a mentor
export function AddStudents({ id }) {
  const [students, setStudents] = useState([]);
  const getStudents = () => {
    fetch(`${URL}/students/free`)
      .then((data) => data.json())
      .then((stds) => setStudents(stds));
  };
  useEffect(getStudents, []);

  const addBtn = (_id) => {
    const adding = {
      mentor_id: id,
    };
    fetch(`${URL}/mentors/${_id}`, {
      method: "PUT",
      body: JSON.stringify(adding),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getStudents());
  };
  return (
    <div className="student">
      {students.length !== 0 ? (
        <>
          {students.map(({ name, _id, image }, index) => (
            <div className="studentList" key={index}>
              <img src={image} alt={name}></img>
              <h4>{name}</h4>
              <Button
                variant="outlined"
                color="success"
                style={{ fontSize: "medium" }}
                onClick={() => {
                  addBtn(_id);
                }}
              >
                add
              </Button>
            </div>
          ))}
        </>
      ) : (
        <h4 className="noStudent">No students Available</h4>
      )}
    </div>
  );
}
