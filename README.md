# ⌨️ Command Central

A premium, theme-aware terminal command reference dashboard built with React 19 and Vite. Designed for speed, aesthetics, and developer efficiency.

![Command Central Preview](https://github.com/senthilcaesar/commands/raw/main/public/preview.png) *(Note: Placeholder for actual preview image)*

## ✨ Features

- **🌓 Dual Theme Support**: Seamless transition between a sleek Dark mode and a high-contrast "Parchment" Light mode.
- **📱 Responsive Layouts**: Toggle between a visual **Grid View** (card-based) and a scan-friendly **List View** (horizontal rows).
- **🔍 Smart Search**: Real-time filtering with `Cmd+K` keyboard accessibility and quick-clear functionality.
- **🛠️ Interactive Tech Stack**: A dynamic modal displaying the project architecture directly from `package.json`.
- **🚀 Automated Deployment**: Pre-configured CI/CD via GitHub Actions for seamless hosting on GitHub Pages.
- **💎 Premium Aesthetics**: Glassmorphic UI components, smooth micro-animations, and high-quality iconography via Lucide-React.

## ⌨️ Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Cmd + K` | Focus Search Bar |
| `ESC` | Close Modals / Clear Search |

## 🛠️ Built With

- **React 19** - UI Component Architecture
- **Vite 8** - Ultra-fast Build Tool
- **Lucide-React** - Premium SVG Icons
- **Vanilla CSS** - Custom design system with modern CSS variables

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/senthilcaesar/commands.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📦 Deployment

This project is configured for **GitHub Pages**.

1. Pushing to the `main` branch automatically triggers the `.github/workflows/deploy.yml` workflow.
2. Ensure your GitHub Repository Settings for Pages is set to use **GitHub Actions**.

---
*Created with ❤️ for Command Line enthusiasts.*
