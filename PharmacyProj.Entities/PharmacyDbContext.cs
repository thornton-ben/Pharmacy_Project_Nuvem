using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;

namespace PharmacyProj.Services
{
    public class PharmacyDbContext : DbContext
    {
        public DbSet<Pharmacy> Pharmacy { get; set; }

        public PharmacyDbContext() : base() { }

        public PharmacyDbContext(DbContextOptions<PharmacyDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pharmacy>().HasData(
                new Pharmacy { Id=1, PharmacyId = 1, Name = "Walgreens", Address = "123 Main St", City = "Dallas", State = "TX", Zip = "12345", FilledPrescriptions = 50, CreatedDate = DateTime.Now, CreatedBy = "ben@test.com" },
                new Pharmacy { Id=2, PharmacyId = 2, Name = "CVS", Address = "456 Oak St", City = "Frisco", State = "TX", Zip = "23456", FilledPrescriptions = 75, CreatedDate = DateTime.Now, CreatedBy = "ben@test.com" },
                new Pharmacy {Id = 3, PharmacyId = 3, Name = "Walmart Pharmacy", Address = "789 Pine St", City = "Richardson", State = "TX", Zip = "34567", FilledPrescriptions = 100, CreatedDate = DateTime.Now, CreatedBy = "ben@test.com" },
                new Pharmacy {Id = 4, PharmacyId = 4, Name = "Kroger Pharmacy", Address = "101 Elm St", City = "McKinney", State = "TX", Zip = "45678", FilledPrescriptions = 125, CreatedDate = DateTime.Now, CreatedBy = "ben@test.com" },
                new Pharmacy {Id = 5, PharmacyId = 5, Name = "HEB Pharmacy", Address = "202 Birch St", City = "Frisco", State = "TX", Zip = "56789", FilledPrescriptions = 150, CreatedDate = DateTime.Now, CreatedBy = "ben@test.com" }
                );
            base.OnModelCreating(modelBuilder);
        }
    }
}
