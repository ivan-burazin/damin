# Admin Dashboard

A modern React-based admin dashboard for managing API keys and workspaces.

## Features

- 🔐 Secure login system
- 🔑 API key management (create, list, delete)
- 👥 Workspace management
- 🎨 Modern UI with Tailwind CSS
- 🚀 Built with Vite for fast development
- 📱 Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ivan-burazin/damin.git
cd damin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174
```

## Dependencies

Main dependencies:
- React 18.3.1
- React DOM 18.3.1
- Tailwind CSS 3.4.17
- Vite 6.0.5

Dev dependencies:
- @vitejs/plugin-react
- autoprefixer
- postcss
- eslint
- tailwindcss

## Environment Setup

The application is configured to work with a remote API server. No additional environment variables are needed for basic setup.

## Development

To start development:

1. Run the development server:
```bash
npm run dev
```

2. Make your changes
3. Build for production:
```bash
npm run build
```

## API Configuration

The application is configured to use:
- API Base URL: http://128.199.45.83:3986
- CORS Proxy: https://cors-anywhere.herokuapp.com/

## Authentication

The application uses a simple authentication system:
- Default credentials are managed through the login system
- API calls use Bearer token authentication

## Build and Deployment

To build for production:

```bash
npm run build
```

This will create a `dist` directory with the production build.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
damin/
├── src/
│   ├── ApiKeysDashboard.jsx    # API Keys management component
│   ├── WorkspacesDashboard.jsx # Workspaces management component
│   ├── Layout.jsx             # Main layout component
│   ├── Login.jsx             # Login component
│   ├── App.jsx              # Main application component
│   └── main.jsx            # Application entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License
