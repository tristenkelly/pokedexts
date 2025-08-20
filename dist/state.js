import readline from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const state = {
        readline: rl,
        commands: getCommands(),
        pokeAPI: { pokeAPI: new PokeAPI() },
        nextLocationsURL: "",
        prevLocationsURL: "",
    };
    return state;
}
