import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    try {
        const pokemonName = args[0]
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemonInfo = await state.pokeAPI.pokeAPI.fetchPokemonInfo(pokemonName)
        let chanceToCatch = pokemonInfo.base_experience * 50
        let probability = Math.min(chanceToCatch / 1000, 1);
        let roll = Math.random()

        if (roll < probability) {
            console.log("Caught!");
        } else {
            console.log("It escaped!")
        }

        state.pokedex[pokemonInfo.name] = pokemonInfo
    } catch (error) {
        console.log(`Error catching pokemon ${error}`)
    }
};