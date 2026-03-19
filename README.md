# Finance Tracker UI

A modern, responsive Finance Tracker application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of financial summary with charts and statistics
- **Expense Management**: Add, view, and manage expenses with categories
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory:

   ```bash
   cd finance-tracker-ui
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── api/           # API configuration and axios instance
├── auth/          # Authentication context and protected routes
├── components/   # Reusable UI components
├── pages/        # Page components (Dashboard, Expenses, Login, Register)
├── assets/       # Static assets
├── App.tsx       # Main application component
├── main.tsx      # Application entry point
└── index.css     # Global styles
```

## API Configuration

The application is configured to communicate with a backend API. Update the axios configuration in [`src/api/axios.ts`](src/api/axios.ts) to point to your backend server.

## License

MIT
