import { useEffect, useState } from "react";
import * as React from "react";
import { URL } from "../URL";

//list of students assigned for particular mentor
export function StudentsForMentor({ id }) {
  const [student, setStudent] = useState([]);
  const getStudents = () => {
    fetch(`${URL}/mentors/${id}`)
      .then((data) => data.json())
      .then((stds) => setStudent(stds));
  };
  useEffect(getStudents, [id]);
  return (
    <div className="student">
      {student.length !== 0 ? (
        <>
          {student.map(({ name, image }, index) => (
            <div className="studentList" key={index}>
              <img src={image} alt={name}></img>
              <h4>{name}</h4>
            </div>
          ))}
        </>
      ) : (
        <h4 className="noStudent">No students Assigned</h4>
      )}
    </div>
  );
}
