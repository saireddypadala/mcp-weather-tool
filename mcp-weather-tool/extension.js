const vscode = require('vscode');
const { getWeather, compareWeather } = require('./weatherClient');

function activate(context) {

  // Command 1: Show Weather for a city
  let showWeather = vscode.commands.registerCommand('mcp-weather-tool.showWeather', async () => {

    const city = await vscode.window.showInputBox({
      prompt: 'Enter city name',
      placeHolder: 'e.g. hyderabad, mumbai, delhi, bangalore'
    });

    if (!city) return;

    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Fetching weather for ${city}...`,
    }, async () => {
      try {
        const weather = await getWeather(city);
        const panel = vscode.window.createWebviewPanel(
          'weatherPanel',
          `Weather - ${city}`,
          vscode.ViewColumn.One,
          {}
        );
        panel.webview.html = getWeatherHTML(city, weather);
      } catch (err) {
        vscode.window.showErrorMessage(`Error: ${err.message}`);
      }
    });
  });

  // Command 2: Compare two cities
  let compareWeatherCmd = vscode.commands.registerCommand('mcp-weather-tool.compareWeather', async () => {

    const city1 = await vscode.window.showInputBox({
      prompt: 'Enter first city',
      placeHolder: 'e.g. hyderabad'
    });
    if (!city1) return;

    const city2 = await vscode.window.showInputBox({
      prompt: 'Enter second city',
      placeHolder: 'e.g. mumbai'
    });
    if (!city2) return;

    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: `Comparing ${city1} vs ${city2}...`,
    }, async () => {
      try {
        const result = await compareWeather(city1, city2);
        const panel = vscode.window.createWebviewPanel(
          'comparePanel',
          `Compare - ${city1} vs ${city2}`,
          vscode.ViewColumn.One,
          {}
        );
        panel.webview.html = getCompareHTML(city1, city2, result);
      } catch (err) {
        vscode.window.showErrorMessage(`Error: ${err.message}`);
      }
    });
  });

  context.subscriptions.push(showWeather, compareWeatherCmd);
}

// Weather UI
function getWeatherHTML(city, weatherData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #1e1e1e;
          color: white;
        }
        .card {
          background: #2d2d2d;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          min-width: 320px;
        }
        .city { font-size: 32px; font-weight: bold; color: #4fc3f7; }
        .weather { font-size: 20px; margin-top: 16px; color: #e0e0e0; }
        .emoji { font-size: 70px; margin: 20px 0; }
        .footer { color: #888; margin-top: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">🌤️</div>
        <div class="city">${city.toUpperCase()}</div>
        <div class="weather">${weatherData}</div>
        <div class="footer">Powered by MCP Weather Tool</div>
      </div>
    </body>
    </html>
  `;
}

// Compare UI
function getCompareHTML(city1, city2, result) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #1e1e1e;
          color: white;
        }
        .card {
          background: #2d2d2d;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          min-width: 380px;
        }
        .title { font-size: 24px; font-weight: bold; color: #4fc3f7; }
        .vs { font-size: 28px; color: #ff7043; margin: 10px 0; }
        .result { font-size: 18px; margin-top: 20px; color: #e0e0e0; }
        .emoji { font-size: 60px; margin: 16px 0; }
        .footer { color: #888; margin-top: 20px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="emoji">🌍</div>
        <div class="title">${city1.toUpperCase()}</div>
        <div class="vs">VS</div>
        <div class="title">${city2.toUpperCase()}</div>
        <div class="result">${result}</div>
        <div class="footer">Powered by MCP Weather Tool</div>
      </div>
    </body>
    </html>
  `;
}

function deactivate() {}

module.exports = { activate, deactivate };