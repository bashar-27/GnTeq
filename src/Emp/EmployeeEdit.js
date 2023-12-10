/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function EmployeeEdit({ employee, show, onHide, onUpdate, Id }) {
  const [dataEdited, setDataEdited] = useState({ ...employee });
  const [reRender, setReRender] = useState(false);
  const [isStatusEditable, setIsStatusEditable] = useState(false);

  const containerStyle = {
    maxWidth: "95%",
    margin: "auto",
    padding: "5px",
  };

  const getEmployeeById = async (empId) => {
    try {
      const response = await fetch(
        `https://localhost:44337/api/Employee/${empId}`
      );

      if (!response.ok) {
        console.error("Error getting employee by ID:");
      }

      const employeeData = await response?.json();

      setDataEdited(employeeData);
      return employeeData;
    } catch (error) {
      console.error("Error getting employee by ID:", error);
      throw error;
    }
  };

  const handleUpdate = async (id, updateConfigObj) => {
    try {
      const response = await fetch(
        `https://localhost:44337/api/Employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateConfigObj),
        }
      );

      if (!response.ok) {
        console.log("Something went wrong");
      } else {
        console.log("Update successful", "success");
        onHide();
        setReRender(true);
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      console.log("An error occurred while updating", "error");
    }
  };
  const handleCheckboxChange = (e) => {
    if (isStatusEditable) {
      setDataEdited({
        ...dataEdited,
        status: e.target.checked,
      });
    }
  };

  const handleCheckboxClick = () => {
    setIsStatusEditable(!isStatusEditable);
  };

  useEffect(() => {
    getEmployeeById(Id);
  }, [Id]);

  useEffect(() => {
    setReRender(false);
  }, [reRender]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dataEdited?.id && (
          <Form style={containerStyle} onSubmit={(e) => e.preventDefault()}>
            <Row className="gap-2 mt-4 mb-4 ">
              <Col>
                <Form.Label> Name</Form.Label>
                <Form.Control
                  type="text"
                  value={dataEdited?.name}
                  onChange={(e) =>
                    setDataEdited({
                      ...dataEdited,
                      name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </Col>
            </Row>
            <Row className="gap-2 mt-4 mb-4">
              <Col>
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                  selected={
                    dataEdited.dateOfBirth
                      ? new Date(dataEdited.dateOfBirth)
                      : null
                  }
                  onChange={(date) =>
                    setDataEdited({
                      ...dataEdited,
                      dateOfBirth: date,
                    })
                  }
                  disabled
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </Col>
              <Col>
                <Form.Label>Status</Form.Label>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  onClick={handleCheckboxClick}
                  checked={dataEdited?.status}
                  readOnly={!isStatusEditable}
                />
              </Col>
            </Row>
            <Row className="gap-2 mt-4 mb-4">
              <Col>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  value={dataEdited?.mobile}
                  onChange={(e) =>
                    setDataEdited({
                      ...dataEdited,
                      mobile: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={dataEdited?.email}
                  onChange={(e) =>
                    setDataEdited({
                      ...dataEdited,
                      email: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="gap-2 mt-4 mb-4">
              <Col>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  value={dataEdited?.country}
                  onChange={(e) =>
                    setDataEdited({
                      ...dataEdited,
                      country: e.target.value,
                    })
                  }
                />
              </Col>
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={dataEdited?.city}
                  onChange={(e) =>
                    setDataEdited({
                      ...dataEdited,
                      city: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="gap-2 mt-4 mb-4">
              <Col>
                <Form.Label>Contract Start Date</Form.Label>
                <DatePicker
                  selected={
                    dataEdited.contractStartDate
                      ? new Date(dataEdited.contractStartDate)
                      : null
                  }
                  onChange={(date) =>
                    setDataEdited({
                      ...dataEdited,
                      contractStartDate: date,
                    })
                  }
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </Col>
              <Col>
                <Form.Label>Contract End Date</Form.Label>
                <DatePicker
                  selected={
                    dataEdited.contractEndDate
                      ? new Date(dataEdited.contractEndDate)
                      : null
                  }
                  onChange={(date) =>
                    setDataEdited({
                      ...dataEdited,
                      contractEndDate: date,
                    })
                  }
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </Col>
            </Row>
            <button
              className="btn bg-main-hover w-100"
              style={{ backgroundColor: "#527853" }}
              onClick={() => handleUpdate(Id, dataEdited)}>
              Edit
            </button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
export default EmployeeEdit;
