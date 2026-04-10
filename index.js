import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP Server
const server = new McpServer({
  name: "weather-tool",
  version: "1.0.0",
});

// Mock weather data (no API key needed)
const weatherData = {
  hyderabad: { temp: 38, condition: "Sunny", humidity: 45 },
  mumbai: { temp: 32, condition: "Humid", humidity: 80 },
  bangalore: { temp: 26, condition: "Cloudy", humidity: 65 },
  delhi: { temp: 35, condition: "Hazy", humidity: 50 },
};

// Tool 1: Get Weather
server.tool(
  "get_weather",
  "Get current weather for an Indian city",
  { city: z.string().describe("City name e.g. hyderabad, mumbai") },
  async ({ city }) => {
    const data = weatherData[city.toLowerCase()];
    if (!data) {
      return {
        content: [{ type: "text", text: `Weather data not available for ${city}` }],
      };
    }
    return {
      content: [{
        type: "text",
        text: `Weather in ${city}: ${data.temp}°C, ${data.condition}, Humidity: ${data.humidity}%`,
      }],
    };
  }
);

// Tool 2: Compare Cities
server.tool(
  "compare_weather",
  "Compare weather between two Indian cities",
  {
    city1: z.string().describe("First city"),
    city2: z.string().describe("Second city"),
  },
  async ({ city1, city2 }) => {
    const d1 = weatherData[city1.toLowerCase()];
    const d2 = weatherData[city2.toLowerCase()];
    if (!d1 || !d2) {
      return { content: [{ type: "text", text: "One or both cities not found" }] };
    }
    const cooler = d1.temp < d2.temp ? city1 : city2;
    return {
      content: [{
        type: "text",
        text: `${city1}: ${d1.temp}°C vs ${city2}: ${d2.temp}°C — ${cooler} is cooler today.`,
      }],
    };
  }
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Weather Tool running...");