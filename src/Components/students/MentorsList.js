import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { URL } from "../URL";

//list of all mentor
export function MentorsList({ id }) {
  const history = useHistory();
  const [mentors, setMentors] = useState([]);
  const getMentors = () => {
    fetch(`${URL}/mentors`)
      .then((data) => data.json())
      .then((mnt) => setMentors(mnt));
  };
  useEffect(getMentors, []);

  const changeBtn = (_id) => {
    const changes = { mentor_id: _id };
    fetch(`${URL}/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(changes),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      history.push(`/students`);
    });
  };
  return (
    <div className="mentor">
      {mentors.map(({ name, _id, image }) => (
        <div className="mentorList" key={_id}>
          <img src={image} alt={name}></img>

          <h5>{name}</h5>

          <Button
            onClick={() => {
              changeBtn(_id);
            }}
          >
            Change
          </Button>
        </div>
      ))}
    </div>
  );
}
