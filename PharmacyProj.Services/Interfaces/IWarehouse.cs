using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IWarehouseService
    {
        Task<List<Warehouse>> GetWarehouseListAsync(QueryParameters parameters);
        Task<Warehouse> UpdateWarehouseAsync(Warehouse warehouse);
        Task<Warehouse> DeleteWarehouseAsync(Warehouse warehouse);
    }
}
