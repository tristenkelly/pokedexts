import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    try {
        const locationName = args[0];
        if (!locationName) {
            console.log("Please provide a location name to explore.");
            return;
        }
        const jsonData = await state.pokeAPI.pokeAPI.fetchLocation(locationName);
        console.log(`Exploring ${locationName}...`);
        for (const encounter of jsonData.pokemon_encounters) {
            console.log(`- ${encounter.pokemon.name}`);
        }
    } catch (error) {
        console.error(`Failed to explore location:`, error);
    }
}