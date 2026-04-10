import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_KEY = "e358def9f795743581d71a799926f781"; // paste your key here
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const server = new McpServer({
  name: "weather-tool",
  version: "1.0.0",
});

// Tool 1: Get real weather
server.tool(
  "get_weather",
  "Get real current weather for any city",
  { city: z.string().describe("City name e.g. Hyderabad, Mumbai") },
  async ({ city }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        return {
          content: [{ type: "text", text: `City "${city}" not found.` }],
        };
      }

      const text = `Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}, Humidity: ${data.main.humidity}%, Wind: ${data.wind.speed} m/s`;

      return { content: [{ type: "text", text }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }] };
    }
  }
);

// Tool 2: Compare real weather
server.tool(
  "compare_weather",
  "Compare real weather between two cities",
  {
    city1: z.string().describe("First city"),
    city2: z.string().describe("Second city"),
  },
  async ({ city1, city2 }) => {
    try {
      const [res1, res2] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${city1}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/weather?q=${city2}&appid=${API_KEY}&units=metric`),
      ]);

      const [d1, d2] = await Promise.all([res1.json(), res2.json()]);

      if (d1.cod !== 200) return { content: [{ type: "text", text: `City "${city1}" not found.` }] };
      if (d2.cod !== 200) return { content: [{ type: "text", text: `City "${city2}" not found.` }] };

      const cooler = d1.main.temp < d2.main.temp ? city1 : city2;

      const text = `${d1.name}: ${d1.main.temp}°C, ${d1.weather[0].description} VS ${d2.name}: ${d2.main.temp}°C, ${d2.weather[0].description} — ${cooler} is cooler today.`;

      return { content: [{ type: "text", text }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }] };
    }
  }
);

// Tool 3: 5 day forecast (bonus!)
server.tool(
  "get_forecast",
  "Get 5 day weather forecast for any city",
  { city: z.string().describe("City name") },
  async ({ city }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=5`
      );
      const data = await res.json();

      if (data.cod !== "200") {
        return { content: [{ type: "text", text: `City "${city}" not found.` }] };
      }

      const forecast = data.list
        .map((item) => `📅 ${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}`)
        .join("\n");

      return { content: [{ type: "text", text: `5-Day Forecast for ${city}:\n${forecast}` }] };
    } catch (err) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }] };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Weather Tool running with live data...");