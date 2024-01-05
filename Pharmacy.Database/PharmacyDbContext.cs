using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using PharmacyProj.Database.Models;

namespace PharmacyProj.Database
{
    public class PharmacyDbContext : DbContext
    {
        public DbSet<Pharmacy> Pharmacy { get; set; }

        public PharmacyDbContext(DbContextOptions<PharmacyDbContext> options) : base(options)
        {
        }
    }
}
