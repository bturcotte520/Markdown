# Markdown Editor

A live Markdown editor with real-time preview and a health monitoring endpoint.

## Features

- **Live Preview**: See your Markdown rendered in real-time
- **Full Markdown Support**: Headings, lists, code blocks, links, images, and more
- **Clean Design**: Dark editor theme with light preview pane
- **Character Counter**: Track your document length
- **Health Endpoint**: Monitor application status via `/health` endpoint

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Start typing Markdown in the left pane
3. See the rendered output in the right pane

## Health Endpoint

The application includes a `/health` endpoint that returns JSON status information:

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-13T04:51:27.161Z",
  "uptime": 123.456,
  "service": "markdown-editor"
}
```

**Fields**:
- `status`: Current application status ("ok")
- `timestamp`: Current server time in ISO 8601 format
- `uptime`: Server uptime in seconds
- `service`: Service identifier

You can check the health endpoint at: `http://localhost:3000/health`
