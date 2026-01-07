# Real-Time Gallery Interaction App

A multi-user real-time image interaction application built with React.  
Users can browse images, react with emojis, add comments, and see all interactions update instantly across multiple browser tabs.

---

## 🔗 Live Demo
(Add your Vercel / Netlify URL here)

---

## 📦 Tech Stack

- **React** (functional components only)
- **Vite**
- **Tailwind CSS**
- **Unsplash API** – image source
- **Zustand** – UI state (modal handling)
- **BroadcastChannel API** – real-time synchronization (fallback)
- **Modern React Hooks** (`useEffect`, `useMemo`, `useState`)

---

## 🎯 Features

### Gallery
- Scrollable image grid
- Images fetched from Unsplash API
- Click to open focused image modal

### Image Interactions (Real-Time)
- Emoji reactions
- Comments per image
- Updates sync instantly across multiple browser tabs

### Global Activity Feed (Real-Time)
- Shows all reactions and comments
- Updates live as interactions happen

---

## 🔄 Real-Time Strategy

The application demonstrates real-time synchronization using the **BroadcastChannel API**.

- All interactions (emoji reactions, comments, feed updates) are published to a shared channel.
- Other open tabs receive updates instantly.
- Each component registers and cleans up its own event listeners to avoid conflicts.

### Why BroadcastChannel?

InstantDB was evaluated as the intended real-time backend.  
However, due to SDK version constraints and instability in the local Windows environment, a client-side real-time fallback was implemented to ensure:

- Stable real-time behavior
- Multi-tab synchronization
- Clean separation of UI and real-time logic

With more time, this real-time layer can be swapped back to InstantDB without changing component logic.

---

## 🧱 Project Structure

src/
├── api/ # Unsplash API
├── components/
│ ├── gallery/ # Gallery grid & modal
│ ├── interactions/ # Emoji & comments
│ └── feed/ # Global activity feed
├── realtime/ # BroadcastChannel logic
├── store/ # Zustand UI store
├── pages/
│ └── Home.jsx

yaml
Copy code

---

## ⚙️ Setup Instructions

1. Clone the repository
2. Install dependencies

```bash
npm install
Add environment variables

env
Copy code
VITE_UNSPLASH_KEY=your_unsplash_access_key
Start the app

bash
Copy code
npm run dev
🧠 Key Engineering Decisions
Used Zustand for UI-only global state to avoid prop drilling

Used addEventListener / removeEventListener for safe real-time listeners

Avoided class components completely

Focused on clarity and predictability over UI complexity

🚧 Challenges & Solutions
Challenge: InstantDB SDK version inconsistencies on Windows
Solution: Implemented a BroadcastChannel-based fallback while preserving real-time behavior

Challenge: Avoiding listener conflicts across components
Solution: Proper event listener registration and cleanup in each component

🚀 Improvements With More Time
Replace BroadcastChannel with InstantDB backend

Add user identity (username / color)

Persist interactions to a database

Improve mobile responsiveness

Add animations for new feed items
