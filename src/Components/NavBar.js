import { CreateMentors } from "./mentors/CreateMentors";
import { CreateStudents } from "./students/CreateStudents";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { Switch, Redirect } from "react-router-dom";
import { Route, useHistory } from "react-router-dom";
import * as React from "react";
import { ChangeMentor } from "./students/ChangeMentor";
import { Students } from "./students/Students";
import { AddingStudents } from "./mentors/AddingStudents";
import { Mentors } from "./mentors/Mentors";

//routing part
export function NavBar() {
  const history = useHistory();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  history.push("/students");
                }}
              >
                Students
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  history.push("/mentors");
                }}
              >
                Mentors
              </Nav.Link>
              <NavDropdown
                title="Create Mentors & Students"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  onClick={() => {
                    history.push("/creatementor");
                  }}
                >
                  Create Mentor
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    history.push("/createstudents");
                  }}
                >
                  Create Students
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Redirect to="/mentors" />
        </Route>
        <Route exact path="/createstudents">
          <CreateStudents />
        </Route>
        <Route path="/creatementor">
          <CreateMentors />
        </Route>
        <Route path="/mentors">
          <Mentors />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route path="/mentor/:id">
          <AddingStudents />
        </Route>
        <Route path="/student/:id">
          <ChangeMentor />
        </Route>
      </Switch>
    </div>
  );
}
