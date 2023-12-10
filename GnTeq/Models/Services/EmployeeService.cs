using GnTeq.Data;
using GnTeq.Models.Interface;
using Microsoft.EntityFrameworkCore;

namespace GnTeq.Models.Services
{
    public class EmployeeService : IEmployee
    {
        private readonly GnTeqDbContext _context;
        private readonly IConfiguration _configuration;
        public EmployeeService(GnTeqDbContext context, IConfiguration config) {
            _configuration = config;
            _context = context;
        }
        public async Task<Employee> CreateEmployee(Employee employee)
        {
            Employee newEmp = new()
            {
                Name = employee.Name,
                Mobile = employee.Mobile,
                Email = employee.Email,
                Country = employee.Country,
                City = employee.City,
                DateOfBirth = employee.DateOfBirth,
                ContractEndDate = employee.ContractEndDate,
                ContractStartDate = employee.ContractStartDate,
                Status = employee.Status,

            };
            _context.Entry(newEmp).State = EntityState.Added;
            await _context.SaveChangesAsync();
            if(newEmp.Id>0)
            {
                return newEmp;
            }
            return null;
        }

        public async Task<Employee> DeleteEmployee(int employeeId)
        {
           var employee = await _context.Employees.FindAsync(employeeId);
            if(employee != null)
            {
                _context.Entry(employee).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
            }
            return employee;
        }

        public async Task<List<Employee>> GetAllEmployee()
        {
           return await _context.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _context.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Employee> UpdateEmployee(int employeeId, Employee employee)
        {
            var currentEmployee = await _context.Employees.FindAsync(employeeId);
            if(currentEmployee != null)
            {
                currentEmployee.Name = employee.Name;
                currentEmployee.Email = employee.Email;
                currentEmployee.Mobile = employee.Mobile;
                currentEmployee.Country = employee.Country;
                currentEmployee.City = employee.City;
                currentEmployee.DateOfBirth = employee.DateOfBirth;
                currentEmployee.ContractStartDate = employee.ContractStartDate;
                currentEmployee.ContractEndDate = employee.ContractEndDate;
                currentEmployee.Status = employee.Status;
            _context.Entry(currentEmployee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            }
            return currentEmployee;

        }
        public async Task<List<Employee>> GetActiveEmployees()
        {
            return await _context.Employees
                .Where(e => e.Status == true)
                .ToListAsync();
        }
    }
}
