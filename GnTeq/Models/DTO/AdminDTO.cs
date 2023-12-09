namespace GnTeq.Models.DTO
{
    public class AdminDTO
    {
        public string Id { get; set; }
        public string userName { get; set; }
        public string Token { get; set; }
        public IList<string> Roles { get; set; }
    }
}
