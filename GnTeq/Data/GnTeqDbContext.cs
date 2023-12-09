using GnTeq.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GnTeq.Data
{
    public class GnTeqDbContext : IdentityDbContext<AppUser>
    {
        public GnTeqDbContext(DbContextOptions option) : base(option)
        {
            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var hasher = new PasswordHasher<AppUser>();
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id= "administrator", Name= "Administrator", NormalizedName = "ADMINISTRATOR" ,ConcurrencyStamp=Guid.Empty.ToString()}
                );
            modelBuilder.Entity<AppUser>().HasData(
                new AppUser
                {
                    Id = "Admin@12",
                    UserName = "Admin",
                    NormalizedUserName = "ADMIN",
                    Email = "admin@example.com",
                    NormalizedEmail = "ADMIN@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = hasher.HashPassword(null, "Admin@1234")
                });
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                UserId = "Admin@12",
                RoleId = "administrator"
            });

        }
       public DbSet<Employee> Employees {  get; set; }

    }
}
