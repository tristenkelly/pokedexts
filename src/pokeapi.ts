export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL: string = `${PokeAPI.baseURL}/location-area/?limit=20`;
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
    return data as ShallowLocations;

  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL: string = `${PokeAPI.baseURL}/location/${locationName}`;
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
    return data as Location;
  }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string | null;
    results: Array<{
        name: string;
        url: string;
    }>;
};

export type Location = {
  // add properties here
};