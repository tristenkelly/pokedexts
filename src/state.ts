import readline from "readline";
import { getCommands } from "./commands.js";
import { startREPL } from "./repl.js";
import { PokeAPI } from "./pokeapi.js";
import { PokemonInfo } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type Pokemon = {
    name: string;
}

export type State = {
    readline: readline.Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: {pokeAPI: PokeAPI};
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string, PokemonInfo>
};
export function initState(): State {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });
    const state: State = {
        readline: rl,
        commands: getCommands(),
        pokeAPI: { pokeAPI: new PokeAPI() },
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {},
    };
    return state;
    }
export {};