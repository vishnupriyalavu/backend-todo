import { IncomingMessage, ServerResponse } from "http";
import {
  retrieveTasks,
  retrieveTaskById,
  insertTask,
  modifyTask,
  eraseTask
} from "../service/todos";
import {
  createItemSchema,
  updateItemSchema,
  idCheckSchema
} from "../validators/todoValidators";
import { parseBody } from "../utils/parseBody";

export const fetchAllTasks = async (_req: IncomingMessage, res: ServerResponse) => {
  try {
    const tasks = await retrieveTasks();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(tasks));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

export const fetchTask = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  const parsedId = idCheckSchema.safeParse({ id });
  if (!parsedId.success) {
    res.writeHead(400);
    return res.end(JSON.stringify(parsedId.error.flatten()));
  }

  const task = await retrieveTaskById(id);
  if (!task) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(task));
};

export const createTask = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await parseBody(req);
    const parsed = createItemSchema.safeParse(body);

    if (!parsed.success) {
      res.writeHead(400);
      return res.end(JSON.stringify(parsed.error.flatten()));
    }

    const created = await insertTask(parsed.data.title, parsed.data.dueDate);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(created));
  } catch {
    res.writeHead(500);
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

export const updateTask = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  const parsedId = idCheckSchema.safeParse({ id });
  if (!parsedId.success) {
    res.writeHead(400);
    return res.end(JSON.stringify(parsedId.error.flatten()));
  }

  const body = await parseBody(req);
  const parsedBody = updateItemSchema.safeParse(body);

  if (!parsedBody.success) {
    res.writeHead(400);
    return res.end(JSON.stringify(parsedBody.error.flatten()));
  }

  const updated = await modifyTask(id, parsedBody.data);

  if (!updated) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(updated));
};

export const deleteTask = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  const parsedId = idCheckSchema.safeParse({ id });
  if (!parsedId.success) {
    res.writeHead(400);
    return res.end(JSON.stringify(parsedId.error.flatten()));
  }

  const deleted = await eraseTask(id);

  if (!deleted) {
    res.writeHead(404);
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  res.writeHead(200);
  res.end(JSON.stringify({ message: "Deleted successfully" }));
};