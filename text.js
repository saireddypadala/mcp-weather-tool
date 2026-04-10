import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["index.js"],
});

const client = new Client({ name: "test-client", version: "1.0.0" });
await client.connect(transport);

// Test 1: Get weather for Hyderabad
console.log("🌤️ Testing get_weather for Hyderabad...");
const weather = await client.callTool({
  name: "get_weather",
  arguments: { city: "hyderabad" },
});
console.log("Result:", weather.content[0].text);

// Test 2: Compare two cities
console.log("\n🔄 Testing compare_weather Mumbai vs Delhi...");
const compare = await client.callTool({
  name: "compare_weather",
  arguments: { city1: "mumbai", city2: "delhi" },
});
console.log("Result:", compare.content[0].text);

await client.close();