using Microsoft.AspNetCore.Mvc;
using PharmacyProj.Database.Models;
using PharmacyProj.Server.Interfaces;

namespace PharmacyProj.Server.Controllers
{
    [ApiController]
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

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacy>> GetPharmacyList()
        {
            try
            {
                List<Pharmacy> result = await _pharmacyService.GetPharmacyListAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{pharmacyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Pharmacy>> GetPharmacyById(int id)
        {
            try
            {
                Pharmacy? result = await _pharmacyService.GetPharmacyByIdAsync(id);
                return result == null ? NotFound() : Ok(result);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Pharmacy>> UpdatePharmacy(Pharmacy pharmacy)
        {
            try
            {
                Pharmacy result = await _pharmacyService.UpdatePharmacyAsync(pharmacy);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

    }
}
