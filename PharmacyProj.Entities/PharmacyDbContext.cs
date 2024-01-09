using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pharmacy_Proj.Entities.Entities;

namespace Pharmacy_Proj.Entities
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
                new Pharmacy { PharmacyId = 1, Name = "Walgreens", Address = "123 Main St", City = "Dallas", State = "TX", Zip = "12345", FilledPrescriptions = 50, CreatedDate = DateTime.Now },
                new Pharmacy { PharmacyId = 2, Name = "CVS", Address = "456 Oak St", City = "Frisco", State = "TX", Zip = "23456", FilledPrescriptions = 75, CreatedDate = DateTime.Now },
                new Pharmacy { PharmacyId = 3, Name = "Walmart Pharmacy", Address = "789 Pine St", City = "Richardson", State = "TX", Zip = "34567", FilledPrescriptions = 100, CreatedDate = DateTime.Now },
                new Pharmacy { PharmacyId = 4, Name = "Kroger Pharmacy", Address = "101 Elm St", City = "McKinney", State = "TX", Zip = "45678", FilledPrescriptions = 125, CreatedDate = DateTime.Now },
                new Pharmacy { PharmacyId = 5, Name = "HEB Pharmacy", Address = "202 Birch St", City = "Frisco", State = "TX", Zip = "56789", FilledPrescriptions = 150, CreatedDate = DateTime.Now }
                );
            base.OnModelCreating(modelBuilder);
        }
    }
}
