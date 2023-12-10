/* eslint-disable */

// EmployeeTable.js
import React, { useState, useEffect } from "react";
import {
  Table,

} from "react-bootstrap";
import EmployeeEdit from "./EmployeeEdit.js";
import { IconButton, Switch } from "@mui/material";
import axios from 'axios';
import { MdOutlineEdit ,MdDelete} from "react-icons/md";




function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const refreshList = () => {
    fetch("https://localhost:44337/api/Employee/GetActiveEmployees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      });
  };

  const handleStatusToggle = (id) => {
    const updatedEmployees = employees.map((employee) =>
      employee?.Id === id ? { ...employee, Status: !employee.Status } : employee
    );

    setEmployees(updatedEmployees);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };



  const handleDelete = (id) => {
    console.log("Delete employee with ID:", id);
  
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
        <h2>Active Employee</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.Id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.mobile}</td>
                <td>{employee.email}</td>

               

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
      <EmployeeEdit
        employee={selectedEmployee}
        Id = {selectedEmployee.id}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onUpdate={refreshList}
      />
    </div>
  );
};

export default EmployeeTable;
