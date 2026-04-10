# 🌤️ MCP Weather Tool

> A production-grade **Model Context Protocol (MCP)** server + **VS Code Extension** that exposes real-time weather data as AI-callable tools — built with Node.js.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MCP](https://img.shields.io/badge/MCP-Anthropic-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![API](https://img.shields.io/badge/API-OpenWeatherMap-orange)

---

## 📌 What is This?

This project is a full-stack AI tooling implementation that consists of:

- **MCP Server** — exposes weather tools that any LLM (Claude, GPT-4o) can call at runtime
- **VS Code Extension** — a real UI that calls the MCP server and displays live weather data
- **Live API Integration** — connected to OpenWeatherMap for real-time data

---

## 🤔 What is MCP?

**Model Context Protocol (MCP)** is Anthropic's open standard for connecting AI models to external tools and data sources.

Instead of hardcoding tool logic inside prompts, MCP lets any LLM:
- **Discover** available tools at runtime
- **Call** tools with structured inputs
- **Chain** multiple tool calls to complete complex tasks

> Think of MCP as a **USB standard for AI tools** — write the tool once, plug it into any compatible LLM.

---

## 🏗️ Architecture

```
User Query
    ↓
LLM (Claude / GPT-4o)          ← Reasoning layer
    ↓
MCP Client                     ← Protocol layer
    ↓
MCP Server (this repo)         ← Tool execution layer
    ↓
OpenWeatherMap API             ← Live data layer
    ↓
LLM → Final Answer             ← Response synthesis
```

This clean separation means:
- The LLM focuses purely on **reasoning and decision-making**
- The MCP server focuses purely on **data fetching and execution**
- Either layer can be swapped independently without breaking the other

---

## 🛠️ Tools Exposed

| Tool | Input | Description |
|------|-------|-------------|
| `get_weather` | `city: string` | Real-time weather for any city worldwide |
| `compare_weather` | `city1, city2: string` | Compares live temperature between two cities |
| `get_forecast` | `city: string` | 5-day weather forecast for any city |

---

## 🧩 VS Code Extension

This project includes a fully working **VS Code Extension** that:
- Connects to the MCP server as a client
- Provides a command palette interface (Ctrl+Shift+P)
- Renders weather data in a beautiful dark-themed webview panel

### Commands Available

| Command | Description |
|---------|-------------|
| 🌤️ Show Weather | Get live weather for any city |
| 🌍 Compare Weather | Compare two cities side by side |

---

## 🤖 Model Selection Thinking

| Model | Best For | Reason |
|-------|----------|--------|
| **Claude 3.5 Sonnet** | Multi-step tool chaining | Strongest at following tool schemas |
| **GPT-4o** | Speed + cost balance | Faster, solid tool-use support |
| **Gemini Flash** | High-volume pipelines | Cheapest per token at scale |
| **Claude Haiku** | Simple lookups | Ultra-low cost for lightweight tasks |

---

## ⚙️ Sequential vs Reasoning Agents

**Sequential Agent (this tool):**
```
get_weather("hyderabad") → return result
```

**Reasoning Agent (extended pattern):**
```
User: "Should I travel to Mumbai or Hyderabad this weekend?"
→ Agent calls get_weather("mumbai")
→ Agent calls get_weather("hyderabad")
→ Agent reasons and recommends based on conditions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- OpenWeatherMap API key (free at openweathermap.org)

### Install and Run MCP Server
```bash
git clone https://github.com/saireddypadala/mcp-weather-tool.git
cd mcp-weather-tool
npm install
node index.js
```

### Run VS Code Extension
```bash
cd mcp-weather-tool
npm install
```
Press F5 in VS Code to launch the extension.

---

## 📁 Project Structure

```
mcp-weather-tool/
├── index.js                   # MCP Server + 3 tool definitions
├── package.json               # MCP server dependencies
├── README.md                  # This file
└── mcp-weather-tool/          # VS Code Extension
    ├── extension.js           # Extension entry point + UI
    ├── weatherClient.js       # MCP client connector
    └── package.json           # Extension manifest + commands
```

---

## 🔮 Roadmap

- [ ] Deploy as hosted MCP endpoint (Cloudflare Workers)
- [ ] Add authentication layer for multi-user support
- [ ] Integrate Claude API for natural language weather summaries
- [ ] Add unit tests for all tools
- [ ] Publish VS Code extension to marketplace

---

## 👨‍💻 Author

**Sai Baba Padala**
Built as a demonstration of MCP server authoring, agentic design patterns, real API integration, and production AI architecture thinking.

---

## 📚 References

- [Anthropic MCP Documentation](https://modelcontextprotocol.io)
- [MCP SDK on npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [OpenWeatherMap API](https://openweathermap.org/api)
