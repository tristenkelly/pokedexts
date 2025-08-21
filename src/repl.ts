import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const words = input.trim().toLowerCase().split(" ");
    let goodWords = words.filter((words) => words !== "");
    return goodWords;
};

export async function startREPL(state: State): Promise<void> {
    state.readline.prompt();
    state.readline.on("line", async (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            console.log("Please enter a command");
            state.readline.prompt();
            return;
        }
        const commandName = words[0];
        const args = words.slice(1);

        if (commandName in state.commands) {
            try {
                await state.commands[commandName].callback(state, ...args);
            } catch (err) {
                console.error("Error executing command:", err);
            }
        } else {
            console.log(`Command not found: ${commandName}`);
        }
        state.readline.prompt();
    });
}

export {};