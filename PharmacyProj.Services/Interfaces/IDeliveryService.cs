using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;

namespace PharmacyProj.Services.Interfaces
{
    public interface IDeliveryService
    {
        Task<List<Delivery>> GetDeliveryListAsync(QueryParameters parameters);
        Task<Delivery> UpdateDeliveryAsync(Delivery delivery);
        Task<Delivery> DeleteDeliveryAsync(Delivery delivery);
    }
}
