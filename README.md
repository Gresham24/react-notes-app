# React Notes App

A modern, full-stack notes application built with React, TypeScript, and Supabase.

## Features

- Create, read, update, and delete notes
- Real-time synchronization with Supabase
- Modern UI with Tailwind CSS
- TypeScript for type safety
- RESTful API backend

## Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code linting

### Backend
- **Node.js** - Server runtime
- **Supabase** - Backend-as-a-Service (Database, Auth, Storage)
- **Nodemon** - Development server with auto-reload

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-notes-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your Supabase credentials.

4. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
npm run server
```

## Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run server` - Start backend server with nodemon

## Project Structure

```
react-notes-app/
├── src/              # Frontend source code
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Utility functions
│   └── assets/       # Static assets
├── server/           # Backend server code
│   └── lib/          # Server utilities
├── public/           # Public assets
└── designs/          # Design files
```

## Hosted at:

