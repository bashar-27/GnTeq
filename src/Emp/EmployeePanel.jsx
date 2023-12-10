/* eslint-disable */

//All Employess is Here
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import EmployeeEdit from "./EmployeeEdit.js";
import { IconButton, Switch } from "@mui/material";
import axios from 'axios';

import { MdOutlineEdit, MdDelete } from "react-icons/md";

function EmployeePanel() {
  // State to store the list of employees and manage modal visibility
  const [employees, setEmployees] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  // Function to fetch and update the list of employees
  const refreshList = () => {
    fetch("https://localhost:44337/api/Employee/GetEmployees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  };

  // Function to toggle the status of an employee
  const handleStatusToggle = (id) => {
    const updatedEmployees = employees.map((employee) =>
      employee?.Id === id ? { ...employee, Status: !employee.Status } : employee
    );
    setEmployees(updatedEmployees);
  };

  // Fetch the list of employees when the component mounts
  useEffect(() => {
    refreshList();
  }, []);

  // Function to handle the edit action
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  // Function to handle the delete action
  const handleDelete = (id) => {
    axios.delete(`https://localhost:44337/api/Employee/${id}`)
      .then((response) => {
        const updatedEmployees = employees.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div className="w-100 p-2">
      <h2>All Employee</h2>
      <Table striped bordered hover>
        {/* Table headers */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contract Satart</th>
              <th>Contract End</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Mapping over employees to create table rows */}
          {employees.map((employee) => (
           <tr key={employee.Id}>
           <td>{employee.id}</td>
           <td>{employee.name}</td>
           <td>{employee.mobile}</td>
           <td>{employee.email}</td>

           <td>
             {employee.country} / {employee.city}
           </td>
           <td>
             {new Date(employee.contractStartDate).toLocaleDateString()}
           </td>
           <td>
             {new Date(employee.contractEndDate).toLocaleDateString()}
           </td>

           <td>
           <Switch
               onChange={() => handleStatusToggle(employee.id)}
               checked={employee.status}
             />
           </td>
           <td>
             <IconButton
               variant="info"
               onClick={() => handleEdit(employee)}>
               <MdOutlineEdit className="h3 mb-0 bg-gray" />
             </IconButton>{" "}
             <IconButton
               variant="danger"
               onClick={() => handleDelete(employee.id)}>
               <MdDelete className=" background-red"/>
             </IconButton>
           </td>
         </tr>
          ))}
        </tbody>
      </Table>
      {/* EmployeeEdit modal component Here*/}
      <EmployeeEdit
        employee={selectedEmployee}
        Id={selectedEmployee.id}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onUpdate={refreshList}
      />
    </div>
  );
}

export default EmployeePanel;
