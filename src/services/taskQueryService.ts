import { Task } from "../db";

export class TaskQueryService {
    private tasks: Task[] = [];
  
    addTasks(tasks: Task[]): void {
      this.tasks.push(...tasks);  // Add all tasks in the batch to the Query DB
    }
  
    getTasks(): Task[] {
      return this.tasks;
    }
  }