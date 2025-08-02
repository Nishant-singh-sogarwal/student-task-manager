// Student Task Manager

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  const task = {
    text: taskText,
    priority: priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.completed) span.style.textDecoration = "line-through";

    const prioritySpan = document.createElement("span");
    prioritySpan.innerText = task.priority;
    prioritySpan.classList.add("priority-badge", task.priority.toLowerCase());

    const completeBtn = document.createElement("button");
    completeBtn.innerText = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(prioritySpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

renderTasks();
