# Modern Todo App (React + Redux Toolkit + TypeScript + Vite)

A clean, modern Todo application featuring a glassmorphism UI, responsive layout, and global state management using Redux Toolkit with async thunks.

Live locally at: `http://localhost:5173`

## Features

- **User name input** stored globally in Redux
- **Todos** with `id`, `name`, `completed`
- **CRUD operations** via Redux Toolkit `createAsyncThunk` (simulated API with timeouts)
- **Modern UI/UX** using React Bootstrap, glassmorphism, gradient background, and icons
- **Responsive layout** with a sidebar for profile/add and a scrollable todo panel

## Tech Stack

- React 19 + TypeScript + Vite 7
- Redux Toolkit + React Redux
- React Bootstrap + Bootstrap 5
- react-icons

## Project Structure

```
src/
  App.tsx              # Layout (Navbar, sidebar, todo panel)
  main.tsx             # App entrypoint with Redux <Provider/>
  store.ts             # Configure Redux store
  hooks.ts             # Typed hooks: useAppDispatch/useAppSelector
  todosSlice.ts        # Todos slice + thunks (add/toggle/update/remove)
  userSlice.ts         # User slice (name)
  TodoInput.tsx        # Add todo input
  TodoItem.tsx         # Single todo row (edit/delete/toggle)
  TodoList.tsx         # List of todos
  index.css            # Global styles, gradient, glass, scrollbars
```

## State Shape

```ts
// src/todosSlice.ts
interface Todo { id: string; name: string; completed: boolean }
interface TodosState { items: Todo[] }

// src/userSlice.ts
interface UserState { name: string }
```

## Async Thunks (simulated API)

- `addTodo(name: string)` -> creates a todo after a short delay
- `toggleTodo(id: string)` -> toggles completed
- `removeTodo(id: string)` -> removes by id
- `updateTodo({ id, name })` -> updates the todo name

These simulate API behavior using `setTimeout`, but store data in Redux only (no real API calls).

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the dev server
   ```bash
   npm run dev
   ```

3. Open the app
   - Local: http://localhost:5173

## Available Scripts

- `npm run dev` – Start Vite dev server
- `npm run build` – Type-check + production build
- `npm run preview` – Preview production build
- `npm run lint` – Lint the project

## UI/UX Notes

- Full-height fluid layout with a top Navbar
- Glassmorphism cards (`.glass` utility in `src/index.css`)
- Subtle gradient background and modern scrollbars
- Icons via `react-icons` for edit/save/cancel/delete/add/user

## Contributing

Feel free to fork and open PRs. Follow standard TypeScript and ESLint best practices.

## Push to GitHub

If this folder is not yet a Git repo:

```bash
git init
git add .
git commit -m "feat: modern todo app with redux toolkit & bootstrap"
```

Add your remote (replace with your repo URL):

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
```

Push the main branch:

```bash
git branch -M main
git push -u origin main
```

## License

MIT
