
    class TaskManager {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  prioritizeTasks() {
    this.tasks.sort((a, b) => {
      if (a.urgency === b.urgency) {
        return b.importance - a.importance;
      }
      return b.urgency - a.urgency;
    });
    return this.tasks;
  }

  eatTheFrog() {
    return this.tasks.find(task => task.urgency && task.importance && !task.completed) || null;
  }

  applyPomodoro(task) {
    const pomodoroSessions = Math.ceil(task.estimatedTime / 25);
    let schedule = [];
    for (let i = 0; i < pomodoroSessions; i++) {
      schedule.push(`Pomodoro session ${i + 1}: 25 minutes`);
      if (i < pomodoroSessions - 1) schedule.push('Break: 5 minutes');
    }
    return schedule;
  }

  organizeKanban() {
    let kanbanBoard = {
      toDo: [],
      inProgress: [],
      completed: []
    };
    this.tasks.forEach(task => {
      if (task.completed) {
        kanbanBoard.completed.push(task);
      } else if (task.inProgress) {
        kanbanBoard.inProgress.push(task);
      } else {
        kanbanBoard.toDo.push(task);
      }
    });
    return kanbanBoard;
  }

  applyEisenhowerMatrix() {
    let quadrants = {
      importantUrgent: [],
      importantNotUrgent: [],
      notImportantUrgent: [],
      notImportantNotUrgent: []
    };

    this.tasks.forEach(task => {
      if (task.urgency && task.importance) {
        quadrants.importantUrgent.push(task);
      } else if (!task.urgency && task.importance) {
        quadrants.importantNotUrgent.push(task);
      } else if (task.urgency && !task.importance) {
        quadrants.notImportantUrgent.push(task);
      } else {
        quadrants.notImportantNotUrgent.push(task);
      }
    });

    return quadrants;
  }
}

// Initialize TaskManager
let taskManager = new TaskManager();

// Function to render tasks
function renderTasks() {
  const tasksOutput = document.getElementById("tasks-output");
  const prioritizedTasks = taskManager.prioritizeTasks();

  let taskHTML = "<h2>Prioritized Tasks</h2>";
  prioritizedTasks.forEach(task => {
    taskHTML += `<div class="task-item"><strong>${task.title}</strong> - Urgent: ${task.urgency}, Important: ${task.importance}, Estimated Time: ${task.estimatedTime} minutes</div>`;
  });

  const frogTask = taskManager.eatTheFrog();
  taskHTML += `<h3>Eat the Frog Task: ${frogTask ? frogTask.title : 'None'}</h3>`;

  tasksOutput.innerHTML = taskHTML;
}

// Handle form submission
document.getElementById("add-task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const urgency = document.getElementById("urgency").checked;
  const importance = document.getElementById("importance").checked;
  const estimatedTime = parseInt(document.getElementById("estimatedTime").value);

  // Create a new task object
  const newTask = {
    id: taskManager.tasks.length + 1,
    title: title,
    urgency: urgency,
    importance: importance,
    estimatedTime: estimatedTime,
    inProgress: false,
    completed: false
  };

  // Add the new task to TaskManager
  taskManager.addTask(newTask);

  // Reset the form
  document.getElementById("add-task-form").reset();

  // Render the updated task list
  renderTasks();
});

// Initial rendering of tasks (empty at first)
renderTasks();

