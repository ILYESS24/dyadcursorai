# Bolt Web

A web-based AI assistant with an integrated development environment, built with React, Vite, and WebContainer.

## Features

- 🤖 **AI Chat**: Powered by Anthropic's Claude
- 💻 **Code Editor**: Full-featured editor with syntax highlighting
- 🖥️ **Terminal**: Integrated terminal for running commands
- 📁 **File Management**: File tree and project management
- 👁️ **Live Preview**: Real-time preview of your applications
- 🌙 **Dark/Light Theme**: Toggle between themes
- 📱 **Responsive Design**: Works on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bolt-web
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript checks

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: UnoCSS, CSS Variables
- **AI**: Anthropic Claude API
- **Editor**: CodeMirror 6
- **Terminal**: xterm.js
- **Runtime**: WebContainer API
- **State Management**: Nanostores
- **Animations**: Framer Motion

## Architecture

The application is structured as follows:

- `src/components/` - React components
- `src/lib/stores/` - State management with Nanostores
- `src/lib/webcontainer/` - WebContainer integration
- `src/components/chat/` - Chat interface
- `src/components/workbench/` - Development environment
- `src/components/editor/` - Code editor
- `src/api/` - API routes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.