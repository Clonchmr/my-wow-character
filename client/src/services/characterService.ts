const api_string = "/api/character"

export const getCharacter = async (region: string, realm: string, name: string) => {
    const response = await fetch(`${api_string}/character?region=${region}&realm=${realm}&name=${name}`)

  
    if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`)
    }

    return await response.json()
}