# Todo List Application

## Overview

This is a simple **Todo List** application built with **React**, **Next.js**, and **MongoDB**. The app allows users to create, edit, delete, and mark tasks as completed. It features an interactive interface with state management, dynamic rendering, and a smooth user experience.

---

## Features

- **Create Todo**: Users can add new todo items by filling in a title, description, and deadline.
- **Edit Todo**: Users can modify existing todos, including updating the title, description, and deadline.
- **Complete Todo**: Users can mark todos as completed, which moves them to a separate list.
- **Delete Todo**: Users can delete todos from the list.
- **Dynamic Views**: The application displays all todos in different screens:
  - **Incomplete Todos**: Displayed when `isCompletedTab` is `false`.
  - **Completed Todos**: Displayed when `isCompletedTab` is `true`.
- **Toast Notifications**: Toasts are shown on successful actions (add, edit, delete) or if something goes wrong.

---

## Tech Stack

- **Frontend**:
  - React (with functional components and hooks)
  - Next.js (for server-side functionality)
  - TailwindCSS (for styling)
  - Axios (for API calls)
  - Shadcn (for UI components like Toaster)
- **Backend**:
  - Node.js (with Next.js API routes)
  - MongoDB (for storing todos)

---

## Setup Instructions

### Prerequisites

- **Node.js** installed on your machine.
- **MongoDB** (or a MongoDB Atlas cluster) for storing todos.

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/todo-app.git
```

2. **Install dependencies**:

```bash
cd todo-app
npm install
```

3. **Set up your MongoDB**:

   - If you're using **MongoDB Atlas**, create a cluster and get your connection string.
   - Add your MongoDB URI in the `.env` file:

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the application**:

```bash
npm run dev
```

5. Open your browser and go to `http://localhost:3000`.

---

## API Routes

### `POST /api/todolist`

- **Purpose**: Adds a new todo.
- **Body**:
  ```json
  {
    "title": "Todo title",
    "description": "Todo description",
    "deadline": "2025-12-31T12:00:00Z"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Todo added successfully",
    "newTodo": {
      "_id": "todo_id",
      "title": "Todo title",
      "description": "Todo description",
      "deadline": "2025-12-31T12:00:00Z",
      "completed": false
    }
  }
  ```

### `PUT /api/todolist`

- **Purpose**: Updates a todo or marks it as completed.
- **Query Params**:
  - `id`: The ID of the todo to update.
- **Body** (for editing or marking as complete):

  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "deadline": "2025-12-31T12:00:00Z",
    "completed": true // or false for editing
  }
  ```

- **Response**:
  ```json
  {
    "message": "Todo marked as completed",
    "updatedTodo": {
      "_id": "todo_id",
      "title": "Updated title",
      "description": "Updated description",
      "deadline": "2025-12-31T12:00:00Z",
      "completed": true
    }
  }
  ```

### `DELETE /api/todolist`

- **Purpose**: Deletes a todo.
- **Query Params**:

  - `id`: The ID of the todo to delete.

- **Response**:
  ```json
  {
    "message": "Todo deleted"
  }
  ```

---

## State Management

The application uses React's `useState` and `useEffect` hooks for managing state.

- **`useState`**: To manage the state of todos and other UI states such as loading and edit modes.
- **`useEffect`**: To fetch all todos when the page first loads (`getAllTodo()`).

---

## UI Components

- **TodoList**: The main component that displays the list of todos.
- **TodoItem**: Represents each todo item and handles the actions such as editing, completing, and deleting.

---

## To Do List Screens

There are two main screens based on the `isScreen` state:

1. **Incomplete Todos**: Todos that are not marked as completed.
2. **Completed Todos**: Todos that are marked as completed.

---

## Toast Notifications

Toast notifications are shown for:

- **Success**: After a todo is added, updated, or deleted.
- **Error**: If a user attempts to submit incomplete or invalid data.

---

## Customization

1. **Styling**: The application uses **TailwindCSS** for styling. You can adjust the design by modifying the classes in the components.
2. **MongoDB**: You can change the MongoDB URI in the `.env` file to connect to your own database.

---

## Future Improvements

- **User Authentication**: Add authentication to allow users to have personalized todo lists.
- **Sorting**: Allow sorting of todos by deadline or creation date.
- **Search**: Add a search feature to filter todos by title or description.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Feel free to modify this README as per your requirements!
