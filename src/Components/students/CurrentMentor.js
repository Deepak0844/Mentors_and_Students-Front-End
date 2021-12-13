import { useEffect, useState } from "react";
import * as React from "react";
import { URL } from "../URL";

//current mentor for particular students
export function CurrentMentor({ mentor_id }) {
  const [mentor, setMentor] = useState({});
  const { _id, name, image } = mentor;
  useEffect(() => {
    fetch(`${URL}/mentor/${mentor_id}`)
      .then((data) => data.json())
      .then((stud) => setMentor(stud));
  }, [mentor_id]);

  return (
    <div className="mentorList" key={_id}>
      <img src={image} alt={name}></img>
      <h4>{name}</h4>
    </div>
  );
}
