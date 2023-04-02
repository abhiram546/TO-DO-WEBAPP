// Define variables for DOM elements
const newTask = document.querySelector("#new-task");
const addBtn = document.querySelector("#add-btn");
const taskList = document.querySelector("#task-list");
const pendingTasks = document.querySelector("#pending-tasks");
const completedTasks = document.querySelector("#completed-tasks");

// Define an array to store the tasks
let tasks = [];
// Define a function to add a new task to the list
function addTask(e) {
  e.preventDefault();

  // Get the input value and create a new task object
  const taskName = newTask.value.trim();
  const task = {
      name: taskName,
      completed: false,
      date: new Date()
  };

  // Add the task to the tasks array
  tasks.push(task);

  // Update the UI
  updateUI();
  newTask.value = "";
}

// Define a function to update the UI
function updateUI() {
  // Clear the task list and pending tasks list
  taskList.innerHTML = "";
  pendingTasks.innerHTML = "";

  // Loop through the tasks array and add each task to the appropriate list
  tasks.forEach((task, index) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      const span = document.createElement("span");
      const deleteBtn = document.createElement("button");

      // Set the checkbox and span attributes
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
          toggleCompleted(index);
      });
      span.textContent = task.name;
      span.title = task.date.toLocaleString();

      // Set the delete button attributes
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
          deleteTask(index);
      });

      // Append the elements to the li element
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      // Append the li element to the appropriate list
      if (task.completed) {
          li.classList.add("completed");
          completedTasks.appendChild(li);
      } else {
          pendingTasks.appendChild(li);
      }
  });
}

// Define a function to toggle a task's completed status
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  updateUI();
}

// Define a function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  updateUI();
}

// Add an event listener to the add button
addBtn.addEventListener("click", addTask);

// Call the updateUI function to initialize the UI
updateUI();


