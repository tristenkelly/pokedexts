import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandMap(state: State, pageURL?: string): Promise<void> {
    const jsonData = await state.pokeAPI.pokeAPI.fetchLocations(state.nextLocationsURL);
    for (const loc of jsonData.results) {
        console.log(loc.name);
    }
    state.nextLocationsURL = jsonData.next;
    state.prevLocationsURL = jsonData.previous || "";
}


export async function CommandMapb(state: State, pageURL?: string): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const jsonData = await state.pokeAPI.pokeAPI.fetchLocations(state.prevLocationsURL);
    for (const loc of jsonData.results) {
        console.log(loc.name);
    }
    state.prevLocationsURL = jsonData.previous || "";
    state.nextLocationsURL = jsonData.next;
}