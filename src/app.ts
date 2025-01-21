import express, { Request, Response } from 'express';
import { EventEmitter } from 'events';
import { TaskService } from './services/taskService';
import { TaskQueryService } from './services/taskQueryService';

const app = express();
const port = 3000;

const eventEmitter = new EventEmitter();
const taskService = new TaskService(eventEmitter);
const taskQueryService = new TaskQueryService();

// Synchronize the Query model with the Command model (when two tasks are added)
eventEmitter.on('tasksAdded', (tasks) => {
  taskQueryService.addTasks(tasks);
  console.error("Query DB synchronized with Command DB!");
});

app.use(express.json());

// Command API: Add a new task
app.post('/tasks', (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).send({ error: 'Title is required' });
  }

  const task = taskService.addTask(title);
  res.status(201).send(task);
});

// Query API: Get all tasks
app.get('/tasks', (req: Request, res: Response) => {
  const tasks = taskQueryService.getTasks();
  res.status(200).send(tasks);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
