
using Microsoft.Extensions.Options;

public class RaiderIOService
{
    private readonly HttpClient _httpClient;
    private readonly RaideRIoSettings _settings;

    public RaiderIOService(HttpClient httpClient, IOptions<RaideRIoSettings> options)
    {
        _httpClient = httpClient;
        _settings = options.Value;
    }

   

    public async Task<string> GetCharacterAsync(string region, string realm, string name)
    {
        var url = $"https://raider.io/api/v1/characters/profile?access_key={_settings.ApiKey}&region={region}&realm={realm}&name={name}&fields=%2Cgear%2Cguild%2Craid_progression%3Acurrent-tier%2Cmythic_plus_scores_by_season%3Acurrent";

        var request = new HttpRequestMessage(HttpMethod.Get, url);


        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
