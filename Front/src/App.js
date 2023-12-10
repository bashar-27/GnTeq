import React from "react";
import Home from "./Home";
import Employee from "./Emp/Employee";
import SignIn from "./Auth/Admin";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import EmployeePanel from "./Emp/EmployeePanel";

function App() {
  return (
    <>
      <Router>
        <div className="App container">
          <h3 className="d-flex justify-content-center m-3">Employee Info</h3>

          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <NavLink
                  className="btn btn-light btn-outline-primary"
                  to="/home">
                  Home
                </NavLink>
              </li>

              <li className="nav-item- m-1">
                <NavLink
                  className="btn btn-light btn-outline-primary"
                  to="/employee">
                  Add Employee
                </NavLink>
              </li>
              <li className="nav-item- m-1">
                <NavLink
                  className="btn btn-light btn-outline-primary"
                  to="/admin">
                  Log In{" "}
                </NavLink>
              </li>
              <li className="nav-item- m-1">
                <NavLink
                  className="btn btn-light btn-outline-primary"
                  to="/employeePanel">
                  All Emp{" "}
                </NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/admin" element={<SignIn />} />
            <Route path="/employeePanel" element={<EmployeePanel />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
