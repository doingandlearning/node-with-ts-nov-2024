"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const ABORT_TIMEOUT = 5000; // Timeout in milliseconds
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
async function createAbortableFetch(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ABORT_TIMEOUT);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        clearTimeout(timeout);
        if (error.name === "AbortError") {
            throw new Error(`Fetch aborted for ${url}`);
        }
        throw error;
    }
}
async function fetchPersonAsync(id) {
    const personId = id ?? getRandomInt(83);
    return createAbortableFetch(`https://swapi.dev/api/people/${personId}/`);
}
async function fetchSupplementaryData(urls) {
    return Promise.all(urls.map((url) => createAbortableFetch(url)));
}
async function run() {
    try {
        // Accept ID as a command-line argument or default to random
        const personId = process.argv[2]
            ? parseInt(process.argv[2], 10)
            : undefined;
        console.log(`Fetching person with ID: ${personId || "random"}`);
        const person = await fetchPersonAsync(personId);
        console.log("Fetched Person:", person.name);
        // Fetch supplementary details: homeworld and species
        const supplementaryUrls = [person.homeworld, ...person.species];
        console.log(`Fetching supplementary details for URLs:`, supplementaryUrls);
        const [homeworld, ...species] = await fetchSupplementaryData(supplementaryUrls);
        // Enrich the person object
        const enrichedPerson = {
            name: person.name,
            height: person.height,
            mass: person.mass,
            homeworld: homeworld?.name ?? "Unknown",
            species: species.length > 0 ? species.map((s) => s.name).join(", ") : "Unknown",
        };
        console.log("Enriched Data:", enrichedPerson);
        // Save to file
        const fileName = `person_${personId || "random"}.json`;
        (0, node_fs_1.writeFileSync)(fileName, JSON.stringify(enrichedPerson, null, 2));
        console.log(`Data saved to ${fileName}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error occurred:", error.message);
        }
    }
}
run();
//# sourceMappingURL=fetchById.js.map