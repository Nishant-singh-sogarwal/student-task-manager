let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";
    li.innerHTML = `
      ${task.text}
      <span>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </span>
    `;
    ul.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const task = {
    text: input.value,
    completed: false
  };
  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  taskList[index].completed = !taskList[index].completed;
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTasks();
}

renderTasks();
