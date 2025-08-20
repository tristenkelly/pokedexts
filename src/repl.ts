import { State } from "./state.js";

export function cleanInput(input: string): string[] {
    const words = input.trim().toLowerCase().split(" ");
    let goodWords = words.filter((words) => words !== "");
    return goodWords;
};

export async function startREPL(state: State): Promise<void> {
    state.readline.prompt();
    state.readline.on("line", async (input: string) => {
        if (input.length < 1) {
            console.log("Please enter a command");
            state.readline.prompt();
            return;
        } else {
            try {
                const word = cleanInput(input);
                if (word[0] in state.commands) {
                    await state.commands[word[0]].callback(state);
                    state.readline.prompt();
                } else {
                    console.log(`Command not found: ${word[0]}`);
            }
        } catch (err: unknown) {
                console.error("Error executing command:", err);
        }
    }
    });
}

export {};