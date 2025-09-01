import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    try { 
    const pokemonInfo = state.pokedex[pokemonName];
    console.log(`Name: ${pokemonInfo.name}`);
    console.log(`Height: ${pokemonInfo.height}`);
    console.log(`Weight: ${pokemonInfo.weight}`);
    console.log(`Stats:`);
    for (const stat of pokemonInfo.stats) {
        console.log(`-${stat.stat.name}`)
    }
    console.log(`Types:`);
    for (const type of pokemonInfo.types) {
        console.log(`- ${type.type.name}`)
    }
    } catch (error) {
        console.log("pokemon has not been caught");
    }
}