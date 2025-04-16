using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/[controller]")]
public class CharacterController : ControllerBase
{
  private readonly RaiderIOService _raiderIoService;

  public CharacterController(RaiderIOService raiderIoService)
  {
    _raiderIoService = raiderIoService;
  }

  [HttpGet("character")]
  public async Task<IActionResult> GetCharacter([FromQuery] string region, [FromQuery] string realm, [FromQuery] string name)
  {
    try
    {
        var data = await _raiderIoService.GetCharacterAsync(region, realm, name);
        return Ok(data);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error fetching Character data: {ex.Message}");
        return StatusCode(500, "An error occurred fetching that character");
    }
    
  }
}