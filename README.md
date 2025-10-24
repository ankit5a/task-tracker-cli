# Command Line To-Do List Manager 📝

This is a simple, file-based **Command-Line Interface (CLI) To-Do List Manager** built with Node.js. It allows users to manage their tasks directly from the terminal, storing all data persistently in a local `tasks.json` file.

## Features ✨

  * **Add** new tasks with a description.
  * **List** all tasks or filter them by status (`todo`, `done`, `in-progress`).
  * **Update** the description of an existing task.
  * **Mark** a task as `done` or `in-progress`.
  * **Delete** tasks by their ID.
  * **Persistence**: Tasks are automatically saved to `tasks.json` between sessions.

-----

## Prerequisites 🛠️

You need to have **Node.js** installed on your machine to run this application.

## Installation and Setup 🚀

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd cli-todo-app # Replace with your project folder name
    ```
2.  **Run Commands:**
    The application runs directly using Node.js. All commands start with `node index.js`.

-----

## Usage 🧑‍💻

All commands are executed from your terminal.

### Add a Task

Use the `add` command, followed by the task description in quotes.

```bash
node index.js add "Finish the GitHub README"
```

### List Tasks

Use `list` to view all tasks, or add a filter to see specific statuses.

| Command | Description |
| :--- | :--- |
| `node index.js list` | Lists **all** tasks. |
| `node index.js list todo` | Lists only tasks with **"todo"** status. |
| `node index.js list done` | Lists only tasks with **"done"** status. |

### Update a Task

Use `update`, providing the **task ID** and the **new description** in quotes.

```bash
node index.js update 1 "Buy milk, eggs, and bread before 6 PM"
```

### Mark a Task

Use `mark-done` or `mark-in-progress`, followed by the **task ID**.

```bash
# Mark task with ID 2 as done
node index.js mark-done 2

# Mark task with ID 3 as in-progress
node index.js mark-in-progress 3
```

### Delete a Task

Use `delete`, followed by the **task ID**.

```bash
node index.js delete 4
```

-----

## Full Command Reference

| Command | Arguments | Example |
| :--- | :--- | :--- |
| `add` | `"description"` | `node index.js add "Walk the dog"` |
| `list` | `[status]` (optional) | `node index.js list in-progress` |
| `update` | `<id> "description"` | `node index.js update 1 "New description"` |
| `delete` | `<id>` | `node index.js delete 5` |
| `mark-done` | `<id>` | `node index.js mark-done 1` |
| `mark-in-progress` | `<id>` | `node index.js mark-in-progress 1` |

-----

## Data Storage

The application automatically creates a **`tasks.json`** file in the same directory to save your data. For Git best practices, this file should be included in your **`.gitignore`** to avoid committing local data.

**Example `tasks.json` structure:**

```json
[
  {
    "id": 1,
    "description": "Buy milk, eggs, and bread",
    "status": "done",
    "createdAt": "2023-10-24T18:00:00.000Z",
    "updatedAt": "2023-10-24T19:00:00.000Z"
  }
]
```
