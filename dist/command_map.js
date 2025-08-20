export async function commandMap(state, pageURL) {
    const jsonData = await state.pokeAPI.pokeAPI.fetchLocations(state.nextLocationsURL);
    for (const loc of jsonData.results) {
        console.log(loc.name);
    }
    state.nextLocationsURL = jsonData.next;
    state.prevLocationsURL = jsonData.previous || "";
}
export async function CommandMapb(state, pageURL) {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const jsonData = await state.pokeAPI.pokeAPI.fetchLocations(state.prevLocationsURL);
    for (const loc of jsonData.results) {
        console.log(loc.name);
    }
    state.prevLocationsURL = jsonData.previous || "";
    state.nextLocationsURL = jsonData.next;
}
