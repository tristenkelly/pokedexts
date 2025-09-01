import { State } from "./state";


export async function commandPokedex(state: State): Promise<void> {
    const names = Object.keys(state.pokedex)
    console.log(`Your Pokedex:`)
    for (const name of names) {
        console.log(`- ${name}`)
    }
}