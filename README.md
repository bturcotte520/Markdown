# Markdown Editor

A simple markdown editor with live preview and backend API support.

## Features

- Live markdown preview
- Clean, modern interface
- Backend API for user management and document storage
- RESTful API endpoints

## Setup

### Frontend

Simply open `index.html` in your browser to use the markdown editor.

### Backend

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on port 3000 by default.

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Users
- `GET /api/user/:id` - Get user by ID

### Documents
- `POST /api/documents` - Create a new document
- `GET /api/documents/:id` - Get document by ID
- `DELETE /api/documents/:id` - Delete a document
- `GET /api/search?q=term` - Search documents

### Admin
- `POST /api/admin/execute` - Execute database queries

## Usage

The markdown editor provides a split-pane interface where you can type markdown on the left and see the rendered output on the right in real-time.

## Technologies

- Frontend: HTML, CSS, JavaScript, Marked.js
- Backend: Node.js, Express, SQLite
