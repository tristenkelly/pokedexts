import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, CommandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { CLICommand } from "./state.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays a list of locations",
            callback: commandMap,
            },
        mapb: {
            name: "mapb",
            description: "Displays a list of previous locations",
            callback: CommandMapb,
        },
        explore: {
            name: "explore",
            description: "Explore a location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Catch a pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "inspect a caught pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "list all caught pokemon",
            callback: commandPokedex,
        }
    };
}