# [DKPUCS - College Coding Club Community Platform](https://github.com/gaureshpai/dkpucs)

## Project Description

DKPUCS is a college coding club community platform built for learning and competitive programming. This robust application integrates various cutting-edge technologies, including AI, to foster a dynamic environment for students to collaborate, learn, and engage in coding activities.

## Features

-   **Community Hub:** A central platform for coding club members.
-   **AI Integrations:** Leverages Google Generative AI and Groq for intelligent features, possibly for code generation, problem-solving assistance, or learning resources.
-   **Authentication:** Secure user authentication and management with NextAuth.js.
-   **Competitive Programming Tools:** Features to support competitive programming (e.g., problem tracking, scoreboards, data visualization with Recharts).
-   **Rich User Interface:** Built with Radix UI components for an accessible and visually appealing experience.
-   **Dynamic Animations:** Utilizes GSAP for smooth and engaging animations.
-   **Theming:** Supports theme switching (e.g., dark/light mode) with `next-themes`.

## Tech Stack

This project is built with the following modern web technologies:

- **Framework:**
  - [Next.js](https://nextjs.org/) (v15) - React framework for building fast and scalable web applications.
  - [React](https://reactjs.org/) (v19) - A JavaScript library for building user interfaces.
- **Backend/Database:**
  - [Prisma](https://www.prisma.io/) (v6) - Next-generation ORM for Node.js and TypeScript, used for database access.
- **Artificial Intelligence:**
  - [`@ai-sdk/google`](https://ai.google.dev/): SDK for Google Generative AI models.
  - [`@ai-sdk/groq`](https://groq.com/): SDK for Groq AI models.
  - `@google/generative-ai`, `ai`: Core libraries for AI integration.
- **Authentication:**
  - [NextAuth.js](https://next-auth.js.org/) (v4) - Flexible authentication for Next.js applications.
- **UI/Styling:**
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
  - [Radix UI](https://www.radix-ui.com/) - High-quality, accessible UI components.
  - [Lucide React](https://lucide.dev/) - A collection of beautiful open-source icons.
  - `react-icons`: Popular icon sets as React components.
- **Animation:**
  - [GSAP](https://gsap.com/) (GreenSock Animation Platform) - A robust JavaScript animation library.
- **Charting:**
  - [Recharts](http://recharts.org/en-US/) - Composed charting library built with React and D3.
- **Other Key Libraries:**
  - `react-syntax-highlighter`: For code highlighting.
  - `react-use`: Collection of essential React Hooks.
  - `uuid`: For generating unique IDs.

## Scripts Overview

-   `build`: Builds the Next.js application for production and runs `prisma generate`.
-   `dev`: Starts the Next.js development server.
-   `start`: Starts the Next.js production server.
-   `type-check`: Runs TypeScript type checks.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Database (e.g., PostgreSQL, MySQL compatible with Prisma)
- API Keys for Google Generative AI and/or Groq (if using these features).

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/gaureshpai/dkpucs.git
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Set up your environment variables:
    Create a `.env` file in the root directory and populate it with your database connection string, NextAuth secret, and any necessary AI API keys. Refer to `.env.example` if available.

### Database Setup

-   Ensure your database is running and accessible.
-   Run Prisma migrations to set up the database schema:
    ```sh
    npx prisma migrate dev
    ```
-   Generate the Prisma client:
    ```sh
    npm run build # The build script includes prisma generate
    # or
    npx prisma generate
    ```

### Running the Application

-   To run the development server:
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.
