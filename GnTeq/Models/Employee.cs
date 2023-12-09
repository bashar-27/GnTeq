namespace GnTeq.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string  Mobile {  get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractEndDate { get; set;}
        public bool Status { get; set;}

    }
}
