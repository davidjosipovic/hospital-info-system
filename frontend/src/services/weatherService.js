const API_URL = "http://localhost:5214/api/weather"; // Adjust if needed

export async function fetchWeather() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        return [];
    }
}
