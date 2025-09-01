import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number = 5 * 60 * 1000) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    let fullURL: string = `${PokeAPI.baseURL}/location-area/?limit=20`;
    const url = pageURL ? pageURL : fullURL;

    // Check cache
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) return cached;

    const resp = await fetch(url, {
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
    this.cache.add(url, data);
    return data as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url: string = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) return cached;

    const resp = await fetch(url, {
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
    this.cache.add(url, data);
    return data as Location;
  }

    async fetchPokemonInfo(pokemonName: string): Promise<PokemonInfo> {
      const url: string = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

      const resp = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error(`Failed to fetch pokemon: ${resp.statusText}`);
      }
      const data = await resp.json();
      return data as PokemonInfo;
    };
  };

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
  count: number;
  next: string;
  previous: string | null;
  name: string;
  url: string;
  pokemon_encounters: Array<{
    pokemon: {
      name: string;
      url: string;
      };
    }>;
};

export type PokemonInfo = {
    name: string,
    base_experience: number,
    height: number,
    weight: number,
    stats: Array<{
      stat: {
        name: string;
        url: string;
      }
    }>;
    types: Array<{
      type: {
        name: string,
        url: string,
      }
    }>;
};