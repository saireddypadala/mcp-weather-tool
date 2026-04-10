const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

const MCP_SERVER_PATH = "D:\\mcp-weather-tool\\index.js";

async function getWeather(city) {
  const transport = new StdioClientTransport({
    command: "node",
    args: [MCP_SERVER_PATH],
  });

  const client = new Client({ name: "vscode-weather-client", version: "1.0.0" });
  await client.connect(transport);

  const result = await client.callTool({
    name: "get_weather",
    arguments: { city },
  });

  await client.close();
  return result.content[0].text;
}

async function compareWeather(city1, city2) {
  const transport = new StdioClientTransport({
    command: "node",
    args: [MCP_SERVER_PATH],
  });

  const client = new Client({ name: "vscode-weather-client", version: "1.0.0" });
  await client.connect(transport);

  const result = await client.callTool({
    name: "compare_weather",
    arguments: { city1, city2 },
  });

  await client.close();
  return result.content[0].text;
}
async function getForecast(city) {
  const transport = new StdioClientTransport({
    command: "node",
    args: [MCP_SERVER_PATH],
  });

  const client = new Client({ name: "vscode-weather-client", version: "1.0.0" });
  await client.connect(transport);

  const result = await client.callTool({
    name: "get_forecast",
    arguments: { city },
  });

  await client.close();
  return result.content[0].text;
}

module.exports = { getWeather, compareWeather, getForecast };
module.exports = { getWeather, compareWeather };