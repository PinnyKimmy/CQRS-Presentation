import { Task, taskDB } from '../db';

export class GetTasksQuery {
  execute(): Task[] {
    return taskDB;
  }
}
