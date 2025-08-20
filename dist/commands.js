import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, CommandMapb } from "./command_map.js";
export function getCommands() {
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
    };
}
