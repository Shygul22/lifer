// Task structure: { id, title, urgency, importance, estimatedTime, inProgress, completed, dueDate }

class TaskManager {
    constructor(tasks) {
      this.tasks = tasks;
    }
  
    // Eisenhower Matrix sorting: Urgency and Importance
    prioritizeTasks() {
      this.tasks.sort((a, b) => {
        if (a.urgency === b.urgency) {
          return b.importance - a.importance;
        }
        return b.urgency - a.urgency;
      });
      return this.tasks;
    }
  
    // Eat the Frog: Get the hardest/most important task (highest urgency + importance)
    eatTheFrog() {
      const frogTask = this.tasks.find(task => task.urgency === true && task.importance === true && !task.completed);
      return frogTask || null;
    }
  
    // Pomodoro technique: Split tasks into 25-minute intervals with breaks
    applyPomodoro(task) {
      const pomodoroSessions = Math.ceil(task.estimatedTime / 25);
      let schedule = [];
      for (let i = 0; i < pomodoroSessions; i++) {
        schedule.push(`Pomodoro session ${i + 1}: 25 minutes`);
        if (i < pomodoroSessions - 1) {
          schedule.push(`Break: 5 minutes`);
        }
      }
      return schedule;
    }
  
    // Two-minute rule: Return tasks that can be done in under 2 minutes
    applyTwoMinuteRule() {
      return this.tasks.filter(task => task.estimatedTime <= 2 && !task.completed);
    }
  
    // Kanban board organization: To-Do, In Progress, Completed
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
  
    // Time Blocking: Assign task to specific time slots
    applyTimeBlocking(task, availableTimeSlots) {
      let assignedSlots = [];
      let timeRemaining = task.estimatedTime;
  
      availableTimeSlots.forEach(slot => {
        if (timeRemaining > 0 && slot.duration <= timeRemaining) {
          assignedSlots.push(slot);
          timeRemaining -= slot.duration;
        }
      });
  
      return {
        task: task.title,
        timeBlocks: assignedSlots
      };
    }
  
    // Break scheduling after each Pomodoro session
    scheduleBreaks(pomodoroSchedule) {
      let scheduleWithBreaks = [];
      pomodoroSchedule.forEach((session, index) => {
        scheduleWithBreaks.push(session);
        if (session.includes("Pomodoro") && (index + 1) % 4 === 0) {
          scheduleWithBreaks.push(`Long break: 15 minutes`);
        }
      });
      return scheduleWithBreaks;
    }
  
    // Apply Eisenhower Matrix logic: Categorize tasks into 4 quadrants
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
  
    // Get available tasks that can fit within the available time
    matchTaskToAvailableTime(availableTime) {
      return this.tasks.filter(task => task.estimatedTime <= availableTime && !task.completed);
    }
  }
  
  // Example tasks
  const tasks = [
    { id: 1, title: "Finish project", urgency: true, importance: true, estimatedTime: 90, inProgress: false, completed: false },
    { id: 2, title: "Email client", urgency: false, importance: true, estimatedTime: 2, inProgress: false, completed: false },
    { id: 3, title: "Clean desk", urgency: false, importance: false, estimatedTime: 10, inProgress: true, completed: false },
    { id: 4, title: "Prepare presentation", urgency: true, importance: true, estimatedTime: 120, inProgress: false, completed: false }
  ];
  
  // Initialize TaskManager
  let taskManager = new TaskManager(tasks);
  
  // Prioritize tasks based on urgency and importance
  console.log("Prioritized Tasks:", taskManager.prioritizeTasks());
  
  // Get the hardest or most important task (Eat the Frog)
  console.log("Eat the Frog Task:", taskManager.eatTheFrog());
  
  // Apply Pomodoro to the first task
  console.log("Pomodoro Sessions for Task 1:", taskManager.applyPomodoro(tasks[0]));
  
  // Apply the Two-Minute Rule
  console.log("Tasks under 2 minutes:", taskManager.applyTwoMinuteRule());
  
  // Organize tasks in Kanban
  console.log("Kanban Board:", taskManager.organizeKanban());
  
  // Time Blocking for the first task
  const availableTimeSlots = [{ start: "9:00 AM", duration: 60 }, { start: "10:00 AM", duration: 30 }];
  console.log("Time Blocking for Task 1:", taskManager.applyTimeBlocking(tasks[0], availableTimeSlots));
  
  // Schedule breaks after Pomodoro sessions
  const pomodoroSchedule = taskManager.applyPomodoro(tasks[0]);
  console.log("Pomodoro Schedule with Breaks:", taskManager.scheduleBreaks(pomodoroSchedule));
  
  // Eisenhower Matrix categorization
  console.log("Eisenhower Matrix:", taskManager.applyEisenhowerMatrix());
  
  // Match tasks to available time
  console.log("Tasks matching available time:", taskManager.matchTaskToAvailableTime(30));
  