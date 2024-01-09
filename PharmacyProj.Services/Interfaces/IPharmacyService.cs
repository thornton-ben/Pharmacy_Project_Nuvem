using Pharmacy_Proj.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyByIdAsync(int id);
        Task<List<Pharmacy>> GetPharmacyListAsync(QueryParameters parameters);
        Task<Pharmacy> UpdatePharmacyAsync(Pharmacy pharmacy);
        Task<Pharmacy> CreatePharmacyAsync(Pharmacy pharmacy);
    }
}
