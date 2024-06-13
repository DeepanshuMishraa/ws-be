import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (data) => {
    console.log("Message received: ", data);
    // Broadcast the message to all other clients
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("The client has disconnected");
  });

  socket.onerror = (error) => {
    console.log("An error occurred: ", error.message);
  };
});

console.log("The WebSocket server is running at port 8080");
