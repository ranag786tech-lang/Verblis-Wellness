import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  const PORT = 3000;

  // Store connected clients
  const clients = new Set<WebSocket>();

  wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("New client connected");

    ws.on("close", () => {
      clients.delete(ws);
      console.log("Client disconnected");
    });

    // Send a welcome notification
    ws.send(JSON.stringify({
      type: "notification",
      data: {
        id: Date.now(),
        title: "Welcome to Verblis Wellness!",
        message: "Stay tuned for appointment reminders and program updates.",
        timestamp: new Date().toISOString(),
        read: false
      }
    }));
  });

  // API to trigger a mock notification (for demo/testing)
  app.use(express.json());
  app.post("/api/notify", (req, res) => {
    const { title, message } = req.body;
    const notification = {
      type: "notification",
      data: {
        id: Date.now(),
        title: title || "New Update",
        message: message || "A new wellness program has been added!",
        timestamp: new Date().toISOString(),
        read: false
      }
    };

    const payload = JSON.stringify(notification);
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });

    res.json({ success: true, sentTo: clients.size });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
