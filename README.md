# MCP Weather Tool 🌤️

A Model Context Protocol (MCP) server that exposes weather data 
as AI-callable tools — built to demonstrate agentic tool design.

## Why MCP?
MCP (Model Context Protocol) is Anthropic's standard for connecting 
AI models to external tools. Instead of hardcoding tool logic inside 
a prompt, MCP lets any LLM dynamically discover and call tools at runtime.

I chose this pattern because:
- It decouples the AI reasoning layer from the tool execution layer
- Tools become reusable across different LLM providers (Claude, GPT-4o, etc.)
- It mirrors how production agentic systems are architected at scale

## Tools Exposed
| Tool | Description |
|------|-------------|
| `get_weather` | Returns weather for a given Indian city |
| `compare_weather` | Compares temperature between two cities |

## Model Selection Thinking
For a tool like this in production, I'd choose:
- **Claude 3.5 Sonnet** for multi-step reasoning tasks (better tool chaining)
- **GPT-4o** when speed and cost matter more than depth
- **Gemini Flash** for high-volume, low-latency pipelines

## How to Run
npm install
node index.js

## Architecture
User Query → LLM (Claude/GPT) → MCP Client → MCP Server (this repo) → Tool Response → LLM → Final Answer
