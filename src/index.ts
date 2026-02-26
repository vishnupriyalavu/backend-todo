import http from "http";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db";
import { todoRoutes } from "./routes/todoRoutes";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string;

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    return res.end("Invalid Request");
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(`
      <h2>Todo API is Running </h2>
      <a href="/todos">Go to Todos</a>
    `);
  }

  if (req.url.startsWith("/todos")) {
    return todoRoutes(req, res);
  }

  res.writeHead(404);
  res.end("Route Not Found");
});

async function start() {
  await connectDatabase(MONGO_URI);
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

start();