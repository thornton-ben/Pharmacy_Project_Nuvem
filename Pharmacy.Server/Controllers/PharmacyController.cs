using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    [Route("[controller]")]
    public class PharmacyController : ControllerBase
    {


        private readonly ILogger<PharmacyController> _logger;
        private readonly IPharmacyService _pharmacyService;

        public PharmacyController(IPharmacyService pharmacyService, ILogger<PharmacyController> logger)
        {
            _logger = logger;
            _pharmacyService = pharmacyService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacy>> GetPharmacyList(QueryParameters getParams)
        {
            try
            {
                List<Pharmacy> result = await _pharmacyService.GetPharmacyListAsync(getParams);
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
        public async Task<ActionResult<Pharmacy>> UpdatePharmacyById([FromBody]Pharmacy pharmacy)
        {
            try
            {
                var updateResult = await _pharmacyService.UpdatePharmacyAsync(pharmacy);
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
