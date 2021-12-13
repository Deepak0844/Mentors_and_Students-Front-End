import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as React from "react";
import { MentorsList } from "./MentorsList";
import { CurrentMentor } from "./CurrentMentor";
import { URL } from "../URL";
import { Loader } from "../Loader";

//to change or assign mentor
export function ChangeMentor() {
  const { id } = useParams();
  const [allStudent, setAllStudent] = useState([]);
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${URL}/student/${id}`)
        .then((response) => response.json())
        .then((stud) => {
          setAllStudent(stud);
          setDone(true);
        });
    }, 200);
  }, [id]);

  const { name, age, email_id, _id, mentor_id, image } = allStudent;

  return (
    <div className="profile">
      {!done ? (
        <Loader />
      ) : (
        <div className="profileList" key={_id}>
          <div>
            <img src={image} alt={name}></img>
          </div>
          <div>
            <p>
              <b>Name : </b>
              {name}
            </p>
            <p>
              <b>Age : </b>
              {age}
            </p>
            <p>
              <b>Email : </b>
              {email_id}
            </p>
          </div>
        </div>
      )}
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {/*<--- shows the current mentor for the particular students */}
        <Tab eventKey="Current Mentor" title="Current Mentor">
          {mentor_id ? (
            <CurrentMentor mentor_id={mentor_id} />
          ) : (
            <h4 className="noMentor">No Mentor Assigned</h4>
          )}
        </Tab>
        {/* shows the current mentor for the particular students --->*/}

        {/* <--- list of all mentors */}
        <Tab eventKey="Change Mentor" title="Change Mentor">
          <MentorsList id={id} />
        </Tab>
        {/* list of all mentors --->*/}
      </Tabs>
    </div>
  );
}
