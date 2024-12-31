const baseUrl = "http://128.199.45.83:3986";
const endpoint = "/apikey"; // The endpoint for listing API keys
const fullUrl = `${baseUrl}${endpoint}`;

async function testApi() {
    try {
        const response = await fetch(fullUrl, {
            method: "GET", // GET request for listing API keys
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer MWUyZDBjOWUtYzZlOC00Mzg2LWFkOWYtY2VhNzM0NzY3MDJi`, // Replace with your actual API key
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error while calling the API:", error);
    }
}

testApi();
