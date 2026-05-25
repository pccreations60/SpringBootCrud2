# Contact Manager Frontend

React + Vite + TypeScript frontend for the Spring Boot CRUD Contact Manager application.

## Prerequisites

- Node.js 16+ 
- npm or yarn

## Installation

```bash
npm install
# or
yarn install
```

## Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The frontend will start on `http://localhost:5173`

Make sure the backend (Spring Boot) is running on `http://localhost:8080/api`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable React components
│   └── Contact/
│       ├── ContactList.tsx
│       ├── ContactForm.tsx
│       ├── ContactList.css
│       └── ContactForm.css
├── services/           # API communication layer
│   ├── api.ts         # Axios base configuration
│   └── contactApi.ts  # Contact API calls
├── types/             # TypeScript interfaces
│   ├── Contact.ts
│   └── index.ts
├── App.tsx            # Main app component with routing
├── App.css
├── index.css
└── main.tsx           # React app entry point
```

## Features

- 📋 View all contacts
- ➕ Create new contact
- ✏️ Edit existing contact
- 🗑️ Delete contact
- 🎨 Responsive design
- ⚡ Real-time validation

## API Integration

All API calls are centralized in `src/services/contactApi.ts`:

```typescript
- contactApi.getAll()           // GET /api/contacts
- contactApi.getById(id)        // GET /api/contacts/:id
- contactApi.create(data)       // POST /api/contacts
- contactApi.update(id, data)   // PUT /api/contacts/:id
- contactApi.delete(id)         // DELETE /api/contacts/:id
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **React Router v6** - Client-side routing

