# Markdown Editor

A real-time markdown editor built with Next.js 16, React 19, and TypeScript.

## Features

- **Live Preview**: See your Markdown rendered in real-time
- **Full Markdown Support**: Headings, lists, code blocks, links, images, and more
- **Clean Design**: Dark editor theme with light preview pane
- **Character Counter**: Track your document length
- **Health Endpoint**: Monitor application status via `/health` endpoint

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19.2
- **Language**: TypeScript
- **Bundler**: Turbopack
- **Markdown Parser**: marked

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

## Next.js 16 Features

This project uses Next.js 16 features:
- **App Router**: Modern routing with layouts, loading states, and error handling
- **React Compiler**: Automatic memoization and performance optimization
- **Turbopack**: Fast bundling and hot module replacement

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
