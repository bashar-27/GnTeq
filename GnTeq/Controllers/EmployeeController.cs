using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GnTeq.Data;
using GnTeq.Models;
using GnTeq.Models.Interface;
using Microsoft.AspNetCore.Authorization;
using GnTeq.Models.Services;

[Route("api/[controller]")]
[ApiController]
// [Authorize(Roles = "Administrator")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployee _employee;

    // Constructor injection of IEmployee service
    public EmployeeController(IEmployee employee)
    {
        _employee = employee;
    }

    // GET: api/Employee/GetEmployees
    [HttpGet]
    [Route("GetEmployees")]
    //[Authorize(Roles = "Administrator")] // Requires Administrator role for access
    public async Task<ActionResult<IEnumerable<Employee>>> GetUsers()
    {
        return await _employee.GetAllEmployee();
    }

    // GET: api/Employee/GetActiveEmployees
    [HttpGet]
    [Route("GetActiveEmployees")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetActiveUser()
    {
        return await _employee.GetActiveEmployees();
    }

    // GET: api/Employee/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Employee>> GetUser(int id)
    {
        return await _employee.GetEmployeeById(id);
    }

    // PUT: api/Employee/{id}
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, Employee user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        return Ok(await _employee.UpdateEmployee(id, user));
    }

    // POST: api/Employee
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Employee>> PostUser(Employee user)
    {
        return await _employee.CreateEmployee(user);
    }

    // DELETE: api/Employee/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var employee = await _employee.GetEmployeeById(id);
        if (id != employee.Id)
        {
            return BadRequest();
        }
        return Ok(await _employee.DeleteEmployee(id));
    }
}
