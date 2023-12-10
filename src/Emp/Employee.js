import React, { useState } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import Switch from "react-switch";
// import EmployeePanel from "./EmployeePanel";

function NewEmployeeForm() {
  const [employee, setEmployee] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "",
    city: "",
    dateOfBirth: new Date().toISOString().split("T")[0], // Get current date as YYYY-MM-DD
    contractStartDate: new Date().toISOString().split("T")[0],
    contractEndDate: new Date().toISOString().split("T")[0],
    status: false,
  });

  const [validation, setValidation] = useState({
    name: false,
    mobile: false,
    email: false,
    country: false,
    city: false,
    contractStartDate: false,
    contractEndDate: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(employee);
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setValidation(validationErrors);
      return;
    }

    try {
      const response = await fetch("https://localhost:44337/api/Employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Optionally, you can reset the form or perform other actions after a successful submission.
      setEmployee({
        name: "",
        mobile: "",
        email: "",
        country: "",
        city: "",
        dateOfBirth: new Date().toISOString().split("T")[0],
        contractStartDate: new Date().toISOString().split("T")[0],
        contractEndDate: new Date().toISOString().split("T")[0],
        status: false,
      });

      // Clear validation errors
      setValidation({
        name: false,
        mobile: false,
        email: false,
        country: false,
        city: false,
        contractStartDate: false,
        contractEndDate: false,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });

    // Validate the specific field
    const validationError = validateField(name, value);
    setValidation({ ...validation, [name]: validationError });
  };

  const handleSwitchChange = (checked) => {
    setEmployee({
      ...employee,
      status: checked,
    });
  };

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "name":
        if (value.trim() === "") {
          error = "Name is required";
        }
        break;
      case "mobile":
        const numericValue = value.replace(/[^\d+]/g, "").slice(0, 13);
        if (!numericValue.startsWith("+962") || numericValue.length !== 13) {
          error = "Mobile must start with +962 and have 9 digits";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "contractStartDate":
      case "contractEndDate":
        if (!value) {
          error = "Date is required";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = (formData) => {
    const errors = {};
    Object.keys(formData).forEach((fieldName) => {
      errors[fieldName] = validateField(fieldName, formData[fieldName]);
    });
    return errors;
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                className={validation.name ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="+962"
                name="mobile"
                value={employee.mobile}
                onChange={handleChange}
                className={validation.mobile ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.mobile}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                className={validation.email ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <div className="ms-2 mt-2">
                <Switch
                  onChange={handleSwitchChange}
                  checked={employee.status}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={employee.city}
                onChange={handleChange}
                className={validation.city ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.city}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="country"
                value={employee.country}
                onChange={handleChange}
                className={validation.country ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.country}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formContractStart">
              <Form.Label>Contract Start Date</Form.Label>
              <Form.Control
                type="date"
                name="contractStartDate"
                value={employee.contractStartDate}
                onChange={handleChange}
                className={validation.contractStartDate ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.contractStartDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formContractEnd">
              <Form.Label>Contract End Date</Form.Label>
              <Form.Control
                type="date"
                name="contractEndDate"
                value={employee.contractEndDate}
                onChange={handleChange}
                className={validation.contractEndDate ? "is-invalid" : ""}
              />
              <Form.Control.Feedback type="invalid">
                {validation.contractEndDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" style={{ backgroundColor: "#527853" }}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default NewEmployeeForm;
