export async function commandHelp(state) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log("");
    for (const command in state.commands) {
        const cmd = state.commands[command];
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}
;
