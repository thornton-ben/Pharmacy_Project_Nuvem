using Microsoft.EntityFrameworkCore;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Services.Services
{
    public class DeliveryService : IDeliveryService
    {
        public Task<Delivery> DeleteDeliveryAsync(Delivery delivery)
        {
            throw new NotImplementedException();
        }


    private readonly PharmacyDbContext _dbContext;

        public DeliveryService(PharmacyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Delivery>> GetDeliveryListAsync(QueryParameters parameters)
        {
            //TODO: insert new parameters to get deliveries for a pharmacy or warehouse
            //insert logic to page
            if (parameters.Id == null)
            {
                return await _dbContext.Delivery.OrderBy(p => p.DeliveryId)
                    .Skip((parameters.Page - 1) * parameters.PageSize)
                    .Take(parameters.PageSize)
                    .ToListAsync();
            }
            return await _dbContext.Delivery.Where(p => parameters.Id.Equals(p.DeliveryId)).ToListAsync();
        }

 
        public async Task<Delivery> UpdateDeliveryAsync(Delivery delivery)
        {
            var queryParams = new QueryParameters
            {
                PageSize = 1,
                Page = 1,
                Id = delivery.DeliveryId
            };
            var existingDeliveryList = await GetDeliveryListAsync(queryParams);
            var existingDelivery = existingDeliveryList[0];

            if (existingDelivery != null)
            {
                existingDelivery.UnitPrice = delivery.UnitPrice is not null ? delivery.UnitPrice : existingDelivery.UnitPrice;
                existingDelivery.WarehouseId = delivery.WarehouseId is not null ? delivery.WarehouseId : existingDelivery.WarehouseId;
                existingDelivery.PharmacyId = delivery.PharmacyId is not null ? delivery.PharmacyId : existingDelivery.PharmacyId;
                existingDelivery.DrugId = delivery.DrugId is not null ? delivery.DrugId : existingDelivery.DrugId;
                existingDelivery.UnitCount = delivery.UnitCount is not null ? delivery.UnitCount : existingDelivery.UnitCount;
                existingDelivery.TotalPrice = delivery.TotalPrice is not null ? delivery.TotalPrice : existingDelivery.TotalPrice;
                existingDelivery.UpdatedDate = DateTime.UtcNow;
            }
            await _dbContext.SaveChangesAsync();
            //need to have logic if delivery doesn't exist to create a new one

            return existingDelivery ?? delivery;
        }
    }
}
