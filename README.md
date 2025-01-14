# 📝  Overview
Memory Lane is a web application designed to allow users to create, store, and share their cherished memories with friends and family. Users can organize these memories in a "Memory Lane," a chronological collection of events with titles, descriptions, timestamps, and images. The application addresses the common user pain point of managing memories across multiple platforms by providing a single, seamless solution.

# 📹 Demo Video
Watch the demo video to see it in action!

![Demo Video](src/assets/video.mp4)

# 🌟 Features
- **Create Memory Lanes**: Organize memories chronologically with titles, descriptions, timestamps, and images.
- **Shareable Links**: Easily share Memory Lanes with others via a unique URL.
- **User-Friendly UI**: A responsive and visually appealing interface built with React and Tailwind CSS. It is optimized for desktop use as the mobile responsiveness is still in progress.
- **Image Uploads**: Drag-and-drop functionality for uploading images to events.
- **Custom Design System**: The app comes with its own design system to ensure a consistent and cohesive user experience across all components and pages.
- **Anonymous User Creation**: Users are automatically signed in as anonymous users by default, with no need to create an account or log in.
- **UUIDv7 for Unique Identifiers**: The app uses *UUIDv7 to generate unique identifiers to ensure that each entity has a globally unique ID, which can be timestamped and sorted chronologically.


# 🛠️ Tech Stack
## Frontend
- **React**
- **React Router DOM**
- **Tailwind CSS**
- **React Hook Form + Zod**
- **Keen Slider** (Adds touch-enabled sliders for better image browsing)

## Backend
- **Express**
- **SQLite**
- **Multer** (Handles image uploads)

## Development Tools
- **Vite**
- **TypeScript**
- **ESLint**
- **Storybook** (Isolated development environment for UI components)

# 🚀 Running the Application
## Prerequisites
- Node.js: Ensure you have Node.js installed.
- Package Manager: Use npm or yarn.

## Steps
1. Clone the repository:

```bash
git clone <repository-url>
cd memory-lane
```

2. Install dependencies:

```bash
npm install
```

3. Start the API server:

```bash
npm run serve:api
```

4. Run the development server:

```bash
npm run dev
```

5. Run Storybook (optional):

```bash
npm storybook
```

## 📊 API Endpoints
# Users
- **POST** `/users`: Create a new user (anonymous by default).
- **GET** `/users`: Get a list of users.

# Memory Lanes
- **POST** `/memory-lanes`: Create a new memory lane.
- **GET** `/memory-lanes`: Get a list of all memory lanes.
- **GET** `/memory-lanes/:id`: Get a specific memory lane by ID.
- **PUT** `/memory-lanes/:id`: Update a memory lane by ID.

# Memories
- **POST** `/memories`: Create a new memory (with images).
- **GET** `/memories`: Get a list of all memories.
- **GET** `/memories/:id`: Get a specific memory by ID.
- **PUT** `/memories/:id`: Update a memory by ID (with images).
- **DELETE** `/memories/:id`: Delete a specific memory by ID.

Access the application:
- Frontend: http://localhost:5173
- API: http://localhost:4001
- Storybook (optional): http://localhost:6006

## 🌱 Future Improvements
- Mobile responsiveness is currently in progress and will be added to improve the user experience on smaller devices.
- Authentication and Authorization
