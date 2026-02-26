import { IncomingMessage, ServerResponse } from "http";
import {
  fetchAllTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/todoController";

export const todoRoutes = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const { method, url } = req;
  if (!url) return;

  const cleanUrl = url.split("?")[0];
  const parts = cleanUrl.split("/");

  if (method === "GET" && cleanUrl === "/todos") {
    return fetchAllTasks(req, res);
  }

  if (method === "GET" && parts[1] === "todos" && parts[2]) {
    return fetchTask(req, res, parts[2]);
  }

  if (method === "POST" && cleanUrl === "/todos") {
    return createTask(req, res);
  }

  if (method === "PUT" && parts[1] === "todos" && parts[2]) {
    return updateTask(req, res, parts[2]);
  }

  if (method === "DELETE" && parts[1] === "todos" && parts[2]) {
    return deleteTask(req, res, parts[2]);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route Not Found" }));
};