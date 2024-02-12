using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Entities.Entities;
using PharmacyProj.Services.Helpers;
using PharmacyProj.Services.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    [Route("[controller]")]
    public class PharmacySaleController : ControllerBase
    {


        private readonly ILogger<PharmacySaleController> _logger;
        private readonly IPharmacySaleService _pharmacySaleService;

        public PharmacySaleController(IPharmacySaleService pharmacyService, ILogger<PharmacySaleController> logger)
        {
            _logger = logger;
            _pharmacySaleService = pharmacyService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PharmacySale>> GetPharmacySaleList(QueryParameters getParams)
        {
            try
            {
                List<PharmacySale> result = await _pharmacySaleService.GetPharmacySaleListAsync(getParams);
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
        public async Task<ActionResult<PharmacySale>> UpdatePharmacySaleById([FromBody]PharmacySale pharmacySale)
        {
            try
            {
                var updateResult = await _pharmacySaleService.UpdatePharmacySaleAsync(pharmacySale);
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
