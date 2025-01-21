import { EventEmitter } from 'events';

interface Task {
  id: number;
  title: string;
}

export class TaskService {
  private tasks: Task[] = [];  // All tasks stored here
  private batch: Task[] = [];  // Temporary batch to hold new tasks before sending to Query DB
  private eventEmitter: EventEmitter;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
  }

  addTask(title: string): Task {
    const task: Task = { id: this.tasks.length + 1, title };
    this.tasks.push(task);
    this.batch.push(task);

    // Once 2 tasks are added, emit both to Query DB
    if (this.batch.length === 2) {
      this.eventEmitter.emit('tasksAdded', this.batch);
      this.batch = [];  // Clear the batch after emitting
    }

    return task;
  }

  // Command model does not need to provide read operations
}
