import fetch from 'node-fetch';

const baseUrl = "http://128.199.45.83:3986";
const endpoint = "/apikey";
const fullUrl = `${baseUrl}${endpoint}`;

export async function listApiKeys() {
    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer MWUyZDBjOWUtYzZlOC00Mzg2LWFkOWYtY2VhNzM0NzY3MDJi`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        return data;
    } catch (error) {
        console.error("Error while calling the API:", error);
        throw error;
    }
}

export async function createApiKey(name) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}/${name}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer MWUyZDBjOWUtYzZlOC00Mzg2LWFkOWYtY2VhNzM0NzY3MDJi`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        console.log("API Response:", data);
        return data;
    } catch (error) {
        console.error("Error while calling the API:", error);
        throw error;
    }
} 