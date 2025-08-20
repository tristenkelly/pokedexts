export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
        let fullURL = `${PokeAPI.baseURL}/location-area/?limit=20`;
        const resp = await fetch(pageURL ? pageURL : fullURL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!resp.ok) {
            throw new Error(`Failed to fetch locations: ${resp.statusText}`);
        }
        const data = await resp.json();
        return data;
    }
    async fetchLocation(locationName) {
        const fullURL = `${PokeAPI.baseURL}/location/${locationName}`;
        const resp = await fetch(fullURL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!resp.ok) {
            throw new Error(`Failed to fetch location: ${resp.statusText}`);
        }
        const data = await resp.json();
        return data;
    }
}
