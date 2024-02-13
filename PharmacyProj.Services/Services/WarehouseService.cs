using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Services.Services
{
    public class WarehouseService : IWarehouseService
    {
        public Task<Warehouse> DeleteWarehouseAsync(Warehouse warehouse)
        {
            throw new NotImplementedException();
        }


    private readonly PharmacyDbContext _dbContext;

        public WarehouseService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Warehouse>> GetWarehouseListAsync(QueryParameters parameters)
        {
            if (parameters.Id == null)
            {
                return await _dbContext.Warehouse.OrderBy(p => p.WarehouseId)
                    .Skip((parameters.Page - 1) * parameters.PageSize)
                    .Take(parameters.PageSize)
                    .ToListAsync();
            }
            return await _dbContext.Warehouse.Where(p => parameters.Id.Equals(p.WarehouseId)).ToListAsync();
        }

 
        public async Task<Warehouse> UpdateWarehouseAsync(Warehouse warehouse)
        {
            var queryParams = new QueryParameters
            {
                PageSize = 1,
                Page = 1,
                Id = warehouse.WarehouseId
            };
            var existingWarehouseList = await GetWarehouseListAsync(queryParams);
            var existingWarehouse = existingWarehouseList?.FirstOrDefault();


            if (existingWarehouse != null)
            {
                existingWarehouse.City = !string.IsNullOrWhiteSpace(warehouse.City) ? warehouse.City : existingWarehouse.City;
                existingWarehouse.State = !string.IsNullOrWhiteSpace(warehouse.State) ? warehouse.State : existingWarehouse.State;
                existingWarehouse.Zip = !string.IsNullOrWhiteSpace(warehouse.Zip) ? warehouse.Zip : existingWarehouse.Zip;
                existingWarehouse.Address = !string.IsNullOrWhiteSpace(warehouse.Address) ? warehouse.Address : existingWarehouse.Address;
                existingWarehouse.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();

            return existingWarehouse ?? warehouse;
        }
    }
}
