import { v4 as uuidv4 } from 'uuid';
import { Task, taskDB } from '../db';

export class AddTaskCommand {
  constructor(public title: string) {}

  execute(): Task {
    const newTask: Task = {
      id: uuidv4(),
      title: this.title,
      completed: false,
    };
    taskDB.push(newTask);
    return newTask;
  }
}
