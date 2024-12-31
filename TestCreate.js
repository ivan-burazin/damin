const readline = require("readline");
const baseUrl = "http://128.199.45.83:3986";
const endpoint = "/apikey";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function createApiKey(apiKeyName) {
    const fullUrl = `${baseUrl}${endpoint}/${apiKeyName}`;
    try {
        // Step 1: Check existing keys
        const existingKeysResponse = await fetch(`${baseUrl}${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer MWUyZDBjOWUtYzZlOC00Mzg2LWFkOWYtY2VhNzM0NzY3MDJi`,
            },
        });

        if (!existingKeysResponse.ok) {
            throw new Error(`Failed to fetch existing API keys. Status: ${existingKeysResponse.status}`);
        }

        const existingKeys = await existingKeysResponse.json();
        const keyNames = existingKeys.map((key) => key.name);
        console.log("Existing Keys:", keyNames);

        // Step 2: Check for duplicate
        if (keyNames.includes(apiKeyName)) {
            console.warn(`API key with name "${apiKeyName}" already exists. Aborting creation.`);
            return;
        }

        // Step 3: Create a new API key
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer MWUyZDBjOWUtYzZlOC00Mzg2LWFkOWYtY2VhNzM0NzY3MDJi`,
            },
        });

        const rawText = await response.text();
        console.log("Raw Response:", rawText);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Try parsing JSON response
        try {
            const data = JSON.parse(rawText);
            console.log("API Key Created (Parsed JSON):", data);
        } catch (error) {
            // If response is raw text, handle it
            console.warn("Response was not valid JSON. Raw API Key:", rawText);
        }
    } catch (error) {
        console.error("Error while creating the API key:", error);
    } finally {
        rl.close();
    }
}

// Prompt the user for the API key name
rl.question("Enter a name for the API key: ", (apiKeyName) => {
    if (!apiKeyName || apiKeyName.trim() === "") {
        console.error("API key name cannot be empty. Exiting.");
        rl.close();
        return;
    }
    createApiKey(apiKeyName.trim());
});

