namespace GnTeq.Models.Interface
{
    public interface IEmployee
    {
        public Task<List<Employee>> GetAllEmployee();
        public Task<Employee> GetEmployeeById(int id);
        public Task<Employee> CreateEmployee(Employee employee);
        public Task<Employee> UpdateEmployee(int employeeId,Employee employee);
        public Task<Employee> DeleteEmployee(int employeeId);
        public Task<List<Employee>> GetActiveEmployees();

    }
}
