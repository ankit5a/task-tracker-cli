const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

// --- Helpers to read/write tasks ---
function loadTasks() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]"); // create empty JSON file
  }
  const data = fs.readFileSync(filePath, "utf8").trim();
  if (data === "") return [];
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Corrupted tasks.json. Resetting file...");
    fs.writeFileSync(filePath, "[]");
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// --- Features ---
function addTask(description) {
  if (!description) {
    console.log("Please provide a task description.");
    return;
  }

  const tasks = loadTasks();

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  console.log(`Task added successfully (ID: ${newTask.id})`);
}

function listTasks(filter) {
  const tasks = loadTasks();

  let filtered = tasks;
  if (filter) {
    filtered = tasks.filter((task) => task.status === filter);
  }

  if (filtered.length === 0) {
    console.log("No tasks found.");
    return;
  }

  filtered.forEach((task) => {
    console.log(
      `[${task.id}] ${task.description} - ${task.status} (Created: ${task.createdAt})`
    );
  });
}

function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  task.description = newDescription;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  console.log(`Task ${id} updated successfully.`);
}

function deleteTask(id) {
  const tasks = loadTasks();
  const newTasks = tasks.filter((t) => t.id !== Number(id));

  if (tasks.length === newTasks.length) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  saveTasks(newTasks);
  console.log(`Task ${id} deleted successfully.`);
}

function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    console.log(`Task with ID ${id} not found.`);
    return;
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  console.log(`Task ${id} marked as ${status}.`);
}

// --- CLI routing ---
const args = process.argv.slice(2);
const command = args[0];
const params = args.slice(1);

switch (command) {
  case "add":
    addTask(params.join(" ")); // allow multi-word descriptions
    break;
  case "list":
    listTasks(params[0]); // e.g. "done", "todo", "in-progress"
    break;
  case "update":
    updateTask(params[0], params.slice(1).join(" "));
    break;
  case "delete":
    deleteTask(params[0]);
    break;
  case "mark-done":
    markTask(params[0], "done");
    break;
  case "mark-in-progress":
    markTask(params[0], "in-progress");
    break;
  default:
    console.log(`
Unknown command.

Usage:
  node index.js add "Task description"
  node index.js update <id> "New description"
  node index.js delete <id>
  node index.js mark-done <id>
  node index.js mark-in-progress <id>
  node index.js list [todo|done|in-progress]
    `);
}
