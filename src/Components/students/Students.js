import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { URL } from "../URL";
import { Loader } from "../Loader";

//list of all students
export function Students() {
  const [allStudents, setAllStudents] = useState([]);
  const history = useHistory();
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${URL}/students`)
        .then((response) => response.json())
        .then((stud) => {
          setAllStudents(stud);
          setDone(true);
        });
    }, 200);
  }, []);

  return (
    <div className="students">
      {!done ? (
        <Loader />
      ) : (
        <>
          {allStudents.map(({ name, _id, image }) => (
            <div className="studentsList" key={_id}>
              <img src={image} alt={name}></img>
              <h5>{name}</h5>
              <Button
                onClick={() => {
                  history.push(`/student/${_id}`);
                }}
              >
                Profile
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
