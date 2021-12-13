import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { URL } from "../URL";
import { Loader } from "../Loader";

//list of all mentor
export function Mentors() {
  const [mentors, setMentors] = useState([]);
  const history = useHistory();
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${URL}/mentors`)
        .then((response) => response.json())
        .then((mntr) => {
          setMentors(mntr);
          setDone(true);
        });
    }, 200);
  }, [mentors._id]);

  return (
    <div className="mentors">
      {!done ? (
        <Loader />
      ) : (
        <>
          {mentors.map(({ name, _id, image }) => (
            <div className="mentorsList" key={_id}>
              <img src={image} alt={name}></img>
              <h4>{name}</h4>
              <Button
                style={{ fontSize: "medium" }}
                onClick={() => {
                  history.push("/mentor/" + _id);
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
