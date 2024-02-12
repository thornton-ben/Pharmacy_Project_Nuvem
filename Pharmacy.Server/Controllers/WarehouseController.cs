using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    [Route("[controller]")]
    public class WarehouseController : ControllerBase
    {


        private readonly ILogger<WarehouseController> _logger;
        private readonly IWarehouseService _warehouseService;

        public WarehouseController(IWarehouseService pharmacyService, ILogger<WarehouseController> logger)
        {
            _logger = logger;
            _warehouseService = pharmacyService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Warehouse>> GetWarehouseList(QueryParameters getParams)
        {
            try
            {
                List<Warehouse> result = await _warehouseService.GetWarehouseListAsync(getParams);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Warehouse>> UpdateWarehouseById([FromBody]Warehouse warehouse)
        {
            try
            {
                var updateResult = await _warehouseService.UpdateWarehouseAsync(warehouse);
                return Ok(updateResult);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}
