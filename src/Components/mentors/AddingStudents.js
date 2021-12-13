import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as React from "react";
import { StudentsForMentor } from "./StudentsForMentor";
import { AddStudents } from "./AddStudents";
import { URL } from "../URL";
import { Loader } from "../Loader";

//to add students to mentor
export function AddingStudents() {
  const { id } = useParams();
  const [mentor, setMentor] = useState([]);
  const { name, age, _id, email_id, image } = mentor;
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      fetch(`${URL}/mentor/${id}`)
        .then((response) => response.json())
        .then((mntr) => {
          setMentor(mntr);
          setDone(true);
        });
    }, 200);
  }, [id]);

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
        {/* <--- list of students who has no mentor */}
        <Tab eventKey="Add Students" title="Add Students">
          <AddStudents id={id} />
        </Tab>
        {/* list of students who has no mentor ---> */}
        {/* <--- students for particular mentor */}
        <Tab eventKey="Current Students" title="Current Students">
          <StudentsForMentor id={id} />
        </Tab>
        {/* students for particular mentor --->*/}
      </Tabs>
    </div>
  );
}
