using Entities.Entities;
using Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IPharmacyService
    {
        Task<Pharmacy?> GetPharmacyByIdAsync(int id);
        Task<List<Pharmacy>> GetPharmacyListAsync(QueryParameters parameters);
        Task<Pharmacy> UpdatePharmacyAsync(Pharmacy pharmacy);
        Task<Pharmacy> CreatePharmacyAsync(Pharmacy pharmacy);
    }
}
