import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employees when the component mounts
        axios.get('https://localhost:5001/api/Employee/GetEmployees')
            .then(response => {
                // Set the retrieved employees to the state
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []); // Empty dependency array ensures it only runs once on mount

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.name} - {employee.jobTitle}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
